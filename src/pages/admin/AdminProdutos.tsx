import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../services/supabase";

// NOVA FUNÇÃO: Extrai o caminho do ficheiro a partir do URL público para o podermos apagar do bucket 'produtos'
const extrairCaminhoStorage = (url: string) => {
  if (!url) return null;
  const parts = url.split("/public/produtos/");
  if (parts.length === 2) {
    return parts[1]; // Retorna a pasta e o ficheiro (ex: imagens/123-foto.jpg)
  }
  return null;
};

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [titulo, setTitulo] = useState("");
  const [marca, setMarca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  // Estado para Edição
  const [editId, setEditId] = useState<string | null>(null);

  // Estado para a imagem física
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const imagemInputRef = useRef<HTMLInputElement>(null);

  // Carregar produtos existentes
  const fetchProdutos = async () => {
    const { data, error } = await supabase
      .from("produtos_destaque")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Erro ao buscar produtos:", error);
    else setProdutos(data || []);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Upload da imagem para o bucket 'produtos'
  const uploadImagem = async (file: File) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const caminho = `imagens/${nomeFicheiro}`;

    const { error } = await supabase.storage
      .from("produtos")
      .upload(caminho, file);
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("produtos")
      .getPublicUrl(caminho);
    return publicUrlData.publicUrl;
  };

  // Limpar Formulário e sair do modo edição
  const resetForm = () => {
    setTitulo("");
    setMarca("");
    setDescricao("");
    setPreco("");
    setEditId(null);
    setImagemFile(null);
    if (imagemInputRef.current) imagemInputRef.current.value = "";
  };

  // Guardar ou Atualizar produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editId && !imagemFile) {
      alert("Por favor, selecione a imagem do produto.");
      return;
    }

    setLoading(true);

    try {
      let urlImagem = undefined;

      // Só faz upload se o utilizador escolheu uma nova imagem
      if (imagemFile) {
        urlImagem = await uploadImagem(imagemFile);

        // Se estivermos a editar e houver uma imagem NOVA, apagamos a ANTIGA do Storage
        if (editId) {
          const produtoAntigo = produtos.find((p) => p.id === editId);
          if (produtoAntigo && produtoAntigo.imagem_url) {
            const pathAntigo = extrairCaminhoStorage(produtoAntigo.imagem_url);
            if (pathAntigo) {
              await supabase.storage.from("produtos").remove([pathAntigo]);
            }
          }
        }
      }

      if (editId) {
        // MODO ATUALIZAÇÃO
        const updateData: any = { titulo, marca, descricao, preco };
        if (urlImagem) updateData.imagem_url = urlImagem; // Atualiza a URL só se houver uma nova

        const { error } = await supabase
          .from("produtos_destaque")
          .update(updateData)
          .eq("id", editId);
        if (error) throw error;

        alert("Produto atualizado com sucesso!");
      } else {
        // MODO INSERÇÃO (NOVO PRODUTO)
        const { error } = await supabase
          .from("produtos_destaque")
          .insert([{ titulo, marca, descricao, preco, imagem_url: urlImagem }]);
        if (error) throw error;

        alert("Produto em destaque adicionado com sucesso!");
      }

      resetForm();
      fetchProdutos();
    } catch (error: any) {
      alert(`Erro: ${error.message || "Falha ao guardar produto."}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Iniciar Modo de Edição
  const handleEdit = (produto: any) => {
    setTitulo(produto.titulo || "");
    setMarca(produto.marca || "");
    setDescricao(produto.descricao || "");
    setPreco(produto.preco || "");
    setEditId(produto.id);

    // Limpar o input de imagem, pois a imagem antiga já existe na base de dados
    setImagemFile(null);
    if (imagemInputRef.current) imagemInputRef.current.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Apagar produto
  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Tem a certeza que deseja apagar este produto? A imagem também será eliminada do servidor.",
      )
    ) {
      // 1. Procurar o produto para podermos apagar o ficheiro físico
      const produto = produtos.find((p) => p.id === id);
      if (produto && produto.imagem_url) {
        const pathImagem = extrairCaminhoStorage(produto.imagem_url);
        if (pathImagem) {
          await supabase.storage.from("produtos").remove([pathImagem]);
        }
      }

      // 2. Apagar o registo da Base de Dados
      const { error } = await supabase
        .from("produtos_destaque")
        .delete()
        .eq("id", id);
      if (!error) fetchProdutos();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Secção do Formulário */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative">
        {/* Indicador visual de modo de edição */}
        {editId && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 rounded-t-2xl"></div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-blue">
            {editId ? "Editar Produto" : "Adicionar Produto à Home"}
          </h2>
          {editId && (
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Modo de Edição
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Título do Produto
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-blue outline-none transition-all"
                placeholder="Ex: Discos de Travão Cerâmicos"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Marca da Peça
              </label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-lime focus:border-brand-blue outline-none transition-all"
                placeholder="Ex: BOSCH, BREMBO, etc."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Preço (com símbolo)
              </label>
              <input
                type="text"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none transition-all"
                placeholder="Ex: 489,00 € (Opcional)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Imagem de Destaque{" "}
                {editId && (
                  <span className="text-gray-400 font-normal">(Opcional)</span>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                ref={imagemInputRef}
                onChange={(e) =>
                  setImagemFile(e.target.files ? e.target.files[0] : null)
                }
                required={!editId}
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-lime/20 file:text-brand-blue hover:file:bg-brand-lime/30 transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Descrição Curta
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={2}
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none resize-none"
              placeholder="Breve descrição (Opcional)"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm"
              >
                Cancelar Edição
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`${editId ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-brand-blue hover:bg-[#0d2657] text-brand-lime"} px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    refresh
                  </span>{" "}
                  A processar...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">
                    {editId ? "save" : "add_circle"}
                  </span>
                  {editId ? "Atualizar Produto" : "Publicar Produto"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Produtos Existentes */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Produtos Atuais na Home
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-4 font-medium pl-2 w-20">Imagem</th>
                <th className="pb-4 font-medium">Título</th>
                <th className="pb-4 font-medium">Marca</th>
                <th className="pb-4 font-medium">Preço</th>
                <th className="pb-4 font-medium text-right pr-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr
                  key={produto.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-2">
                    <img
                      src={produto.imagem_url}
                      alt="Produto"
                      className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm mix-blend-multiply"
                    />
                  </td>
                  <td className="py-4 font-bold text-brand-blue">
                    {produto.titulo}
                  </td>
                  <td className="py-4 font-semibold text-gray-500">
                    {produto.marca || "-"}
                  </td>
                  <td className="py-4 font-semibold text-gray-700">
                    {produto.preco || "-"}
                  </td>
                  <td className="py-4 text-right pr-2 whitespace-nowrap">
                    {/* BOTÃO EDITAR */}
                    <button
                      onClick={() => handleEdit(produto)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 mr-2"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    {/* BOTÃO APAGAR */}
                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      title="Apagar"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
              {produtos.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-500 font-medium bg-gray-50 rounded-lg"
                  >
                    Nenhum produto adicionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
