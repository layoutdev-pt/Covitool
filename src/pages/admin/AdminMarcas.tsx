import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../services/supabase";

const gerarGradiente = (hex: string, opacidadePercentual: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const op = opacidadePercentual / 100;
  return `linear-gradient(to top, rgba(${r},${g},${b},${op}), rgba(${r},${g},${b},${op * 0.7}), rgba(${r},${g},${b},0.1))`;
};

// NOVA FUNÇÃO: Extrai o caminho do ficheiro a partir do URL público para o podermos apagar
const extrairCaminhoStorage = (url: string) => {
  if (!url) return null;
  // Procura onde começa a string '/public/folhetos/' (o nome do teu bucket)
  const parts = url.split("/public/folhetos/");
  if (parts.length === 2) {
    return parts[1]; // Retorna apenas o caminho (ex: marcas/grelha/123-imagem.png)
  }
  return null;
};

export default function AdminMarcas() {
  const [marcas, setMarcas] = useState<any[]>([]);
  const [marcaMes, setMarcaMes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Estados - Marca do Mês
  const [tituloMes, setTituloMes] = useState("");
  const [descricaoMes, setDescricaoMes] = useState("");
  const [imagemMesFile, setImagemMesFile] = useState<File | null>(null);
  const imagemMesRef = useRef<HTMLInputElement>(null);

  // Estados de Edição da Grelha
  const [editId, setEditId] = useState<string | null>(null);

  // Estados - Grelha de Marcas
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoFundo, setTipoFundo] = useState("cor");
  const [corFundo, setCorFundo] = useState("#ffffff");
  const [corTexto, setCorTexto] = useState("#153A81");
  const [sombreado, setSombreado] = useState(40);

  // Estados do Logótipo Central
  const [exibirLogo, setExibirLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [previewLogoUrl, setPreviewLogoUrl] = useState("");

  // Estados do Overlay Hover
  const [corOverlay, setCorOverlay] = useState("#153A81");
  const [opacidadeOverlay, setOpacidadeOverlay] = useState(80);
  const [corTextoHover, setCorTextoHover] = useState("#ffffff");
  const [imagemGridFile, setImagemGridFile] = useState<File | null>(null);
  const imagemGridRef = useRef<HTMLInputElement>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  const fetchData = async () => {
    const { data: gridData } = await supabase
      .from("marcas_grelha")
      .select("*")
      .order("created_at", { ascending: true });
    if (gridData) setMarcas(gridData);

    const { data: mesData } = await supabase
      .from("marca_mes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    if (mesData && mesData.length > 0) setMarcaMes(mesData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (imagemGridFile) {
      const objectUrl = URL.createObjectURL(imagemGridFile);
      setPreviewImgUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (!editId) {
      setPreviewImgUrl("");
    }
  }, [imagemGridFile, editId]);

  useEffect(() => {
    if (logoFile) {
      const objectUrl = URL.createObjectURL(logoFile);
      setPreviewLogoUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (!editId) {
      setPreviewLogoUrl("");
    }
  }, [logoFile, editId]);

  const uploadFicheiro = async (file: File, pasta: string) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const caminho = `marcas/${pasta}/${nomeFicheiro}`;
    const { error } = await supabase.storage
      .from("folhetos")
      .upload(caminho, file);
    if (error) throw error;
    const { data } = supabase.storage.from("folhetos").getPublicUrl(caminho);
    return data.publicUrl;
  };

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setImagemGridFile(null);
    setLogoFile(null);
    setPreviewImgUrl("");
    setPreviewLogoUrl("");
    setCorFundo("#ffffff");
    setCorTexto("#153A81");
    setSombreado(40);
    setCorOverlay("#153A81");
    setOpacidadeOverlay(80);
    setCorTextoHover("#ffffff");
    setExibirLogo(false);
    setEditId(null);
    if (imagemGridRef.current) imagemGridRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleEdit = (marca: any) => {
    setEditId(marca.id);
    setNome(marca.nome || "");
    setDescricao(marca.descricao || "");
    setTipoFundo(marca.tipo_fundo || "cor");
    setCorFundo(marca.cor_fundo || "#ffffff");
    setCorTexto(marca.cor_texto || "#153A81");
    setSombreado(marca.sombreado !== undefined ? marca.sombreado : 40);
    setExibirLogo(marca.exibir_logo || false);
    setCorOverlay(marca.cor_overlay || "#153A81");
    setOpacidadeOverlay(
      marca.opacidade_overlay !== undefined ? marca.opacidade_overlay : 80,
    );
    setCorTextoHover(marca.cor_texto_hover || "#ffffff");

    setPreviewImgUrl(marca.imagem_url || "");
    setPreviewLogoUrl(marca.logo_url || "");

    setImagemGridFile(null);
    setLogoFile(null);
    if (imagemGridRef.current) imagemGridRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGridSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId && !imagemGridFile)
      return alert("Selecione a Imagem do Card (Fundo/Hover).");
    if (!editId && exibirLogo && !logoFile)
      return alert("Selecione a imagem do Logótipo Central.");

    setLoading(true);
    try {
      let urlCard = previewImgUrl;
      let urlLogo = previewLogoUrl;
      const pathsParaApagar: string[] = [];

      // Identificar a marca antiga para sabermos que ficheiros existiam
      const marcaAntiga = marcas.find((m) => m.id === editId);

      // Upload de nova imagem de card (Fundo/Hover)
      if (imagemGridFile) {
        urlCard = await uploadFicheiro(imagemGridFile, "grelha");
        if (editId && marcaAntiga?.imagem_url) {
          const pathAntigo = extrairCaminhoStorage(marcaAntiga.imagem_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      // Upload de novo logótipo
      if (exibirLogo && logoFile) {
        urlLogo = await uploadFicheiro(logoFile, "grelha");
        if (editId && marcaAntiga?.logo_url) {
          const pathAntigo = extrairCaminhoStorage(marcaAntiga.logo_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      // Apagar as imagens antigas do bucket (se houver novas)
      if (pathsParaApagar.length > 0) {
        await supabase.storage.from("folhetos").remove(pathsParaApagar);
      }

      const payload = {
        nome,
        descricao,
        tipo_fundo: tipoFundo,
        cor_fundo: corFundo,
        cor_texto: corTexto,
        sombreado,
        cor_overlay: corOverlay,
        opacidade_overlay: opacidadeOverlay,
        cor_texto_hover: corTextoHover,
        imagem_url: urlCard,
        logo_url: urlLogo,
        exibir_logo: exibirLogo,
      };

      if (editId) {
        await supabase.from("marcas_grelha").update(payload).eq("id", editId);
        alert("Marca atualizada com sucesso!");
      } else {
        await supabase.from("marcas_grelha").insert([payload]);
        alert("Marca adicionada à grelha!");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const apagarMarcaGrelha = async (id: string) => {
    if (
      window.confirm(
        "Tem a certeza que quer apagar esta marca? A imagem também será eliminada do servidor.",
      )
    ) {
      // 1. Encontrar a marca para apagar os ficheiros
      const marca = marcas.find((m) => m.id === id);
      if (marca) {
        const pathsParaApagar: string[] = [];
        const pathImagem = extrairCaminhoStorage(marca.imagem_url);
        const pathLogo = extrairCaminhoStorage(marca.logo_url);

        if (pathImagem) pathsParaApagar.push(pathImagem);
        if (pathLogo) pathsParaApagar.push(pathLogo);

        if (pathsParaApagar.length > 0) {
          await supabase.storage.from("folhetos").remove(pathsParaApagar);
        }
      }

      // 2. Apagar da Base de Dados
      await supabase.from("marcas_grelha").delete().eq("id", id);
      fetchData();
    }
  };

  const handleMesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagemMesFile) return alert("Selecione a imagem da Marca do Mês.");
    setLoading(true);
    try {
      const url = await uploadFicheiro(imagemMesFile, "mes");

      // 1. Procurar as marcas do mês antigas e apagar a imagem do storage
      const { data: marcasAntigas } = await supabase
        .from("marca_mes")
        .select("imagem_url");
      if (marcasAntigas && marcasAntigas.length > 0) {
        const pathsParaApagar = marcasAntigas
          .map((m) => extrairCaminhoStorage(m.imagem_url))
          .filter(Boolean) as string[];

        if (pathsParaApagar.length > 0) {
          await supabase.storage.from("folhetos").remove(pathsParaApagar);
        }
      }

      // 2. Apagar da base de dados e inserir a nova
      await supabase
        .from("marca_mes")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase
        .from("marca_mes")
        .insert([
          { titulo: tituloMes, descricao: descricaoMes, imagem_url: url },
        ]);

      alert("Marca do Mês substituída com sucesso!");
      setTituloMes("");
      setDescricaoMes("");
      setImagemMesFile(null);
      if (imagemMesRef.current) imagemMesRef.current.value = "";
      fetchData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* FORMULÁRIO 1: MARCA DO MÊS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-brand-blue mb-6">
          Atualizar Marca do Mês (Substitui a anterior)
        </h2>
        <form onSubmit={handleMesSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Título da Marca</label>
              <input
                type="text"
                value={tituloMes}
                onChange={(e) => setTituloMes(e.target.value)}
                required
                className="p-3 border rounded-xl outline-none focus:border-brand-lime"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Imagem de Destaque
              </label>
              <input
                type="file"
                accept="image/*"
                ref={imagemMesRef}
                onChange={(e) =>
                  setImagemMesFile(e.target.files ? e.target.files[0] : null)
                }
                required
                className="p-2 border rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Descrição</label>
            <textarea
              value={descricaoMes}
              onChange={(e) => setDescricaoMes(e.target.value)}
              required
              rows={3}
              className="p-3 border rounded-xl outline-none focus:border-brand-lime"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-blue hover:bg-[#0d2657] text-brand-lime px-8 py-3 rounded-xl font-bold transition-all"
            >
              Publicar Marca do Mês
            </button>
          </div>
        </form>
      </div>

      {/* FORMULÁRIO 2: GRELHA DE MARCAS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative transition-all duration-300">
        {editId && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 rounded-t-2xl"></div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-blue">
            {editId ? "Editar Marca" : "Adicionar Card à Grelha"}
          </h2>
          {editId && (
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Modo de Edição
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LADO ESQUERDO: FORMULÁRIO */}
          <form onSubmit={handleGridSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Centro do Cartão
                  </label>
                  <div className="flex gap-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={!exibirLogo}
                        onChange={() => setExibirLogo(false)}
                        className="accent-brand-lime"
                      />
                      Texto
                    </label>
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={exibirLogo}
                        onChange={() => setExibirLogo(true)}
                        className="accent-brand-lime"
                      />
                      Imagem
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl outline-none focus:border-brand-lime"
                  placeholder="Nome da Marca (Opcional)"
                />

                {exibirLogo && (
                  <div className="flex flex-col gap-1 mt-2">
                    <label className="text-xs font-semibold text-brand-blue">
                      Fazer upload do Logótipo (S/ fundo):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={logoInputRef}
                      onChange={(e) =>
                        setLogoFile(e.target.files ? e.target.files[0] : null)
                      }
                      required={!editId && exibirLogo}
                      className="p-2 border border-gray-300 rounded-xl text-sm bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Imagem do Card (Hover / Fundo)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={imagemGridRef}
                  onChange={(e) =>
                    setImagemGridFile(e.target.files ? e.target.files[0] : null)
                  }
                  required={!editId}
                  className="p-2 border rounded-xl"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Esta imagem cobrirá o cartão inteiro ao passar o rato.
                </p>
              </div>
            </div>

            {/* SEÇÃO 1: REPOUSO (FUNDO) */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
              <h3 className="font-bold text-brand-blue">
                Fundo do Cartão em Repouso
              </h3>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="radio"
                    checked={tipoFundo === "cor"}
                    onChange={() => setTipoFundo("cor")}
                    className="w-5 h-5 text-brand-lime"
                  />{" "}
                  Cor Sólida
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="radio"
                    checked={tipoFundo === "imagem"}
                    onChange={() => setTipoFundo("imagem")}
                    className="w-5 h-5 text-brand-lime"
                  />{" "}
                  Usar Imagem do Card
                </label>
              </div>

              <div className="flex flex-wrap gap-6 mt-2">
                {!exibirLogo && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Cor do Título
                    </label>
                    <input
                      type="color"
                      value={corTexto}
                      onChange={(e) => setCorTexto(e.target.value)}
                      className="w-16 h-10 cursor-pointer rounded border"
                    />
                  </div>
                )}
                {tipoFundo === "cor" && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Cor Fundo
                    </label>
                    <input
                      type="color"
                      value={corFundo}
                      onChange={(e) => setCorFundo(e.target.value)}
                      className="w-16 h-10 cursor-pointer rounded border"
                    />
                  </div>
                )}
                {tipoFundo === "imagem" && (
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                      <span>Sombrear Fundo</span>
                      <span>{sombreado}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sombreado}
                      onChange={(e) => setSombreado(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 2: EFEITO HOVER */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col gap-4">
              <h3 className="font-bold text-brand-blue">
                Efeito ao Passar o Rato (Overlay)
              </h3>

              <div className="flex flex-wrap gap-6 mt-2 border-b border-blue-200 pb-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Cor Base
                  </label>
                  <input
                    type="color"
                    value={corOverlay}
                    onChange={(e) => setCorOverlay(e.target.value)}
                    className="w-16 h-10 cursor-pointer rounded border"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                    <span>Opacidade da Cor</span>
                    <span>{opacidadeOverlay}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacidadeOverlay}
                    onChange={(e) =>
                      setOpacidadeOverlay(Number(e.target.value))
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              {/* OPÇÃO DE COR DO TEXTO NO HOVER */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Cor do Texto (Hover)
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                    <input
                      type="radio"
                      checked={corTextoHover === "#ffffff"}
                      onChange={() => setCorTextoHover("#ffffff")}
                      className="accent-brand-lime"
                    />
                    Branco
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                    <input
                      type="radio"
                      checked={corTextoHover === "#000000"}
                      onChange={() => setCorTextoHover("#000000")}
                      className="accent-brand-lime"
                    />
                    Preto
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Descrição (Hover)</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={2}
                className="p-3 border rounded-xl outline-none focus:border-brand-lime"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                  Cancelar Edição
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editId ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-brand-lime hover:bg-[#a1bc12] text-brand-blue"} px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2`}
              >
                <span className="material-symbols-outlined">
                  {editId ? "save" : "add_circle"}
                </span>
                {editId ? "Atualizar Marca" : "Adicionar à Grelha"}
              </button>
            </div>
          </form>

          {/* LADO DIREITO: LIVE PREVIEW */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
              Exemplo Visual (Passa o rato)
            </span>

            <div className="w-full max-w-50 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden h-32 hover:h-64">
              {/* ESTADO DE REPOUSO */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center`}
                style={tipoFundo === "cor" ? { backgroundColor: corFundo } : {}}
              >
                {tipoFundo === "imagem" && previewImgUrl && (
                  <>
                    <img
                      src={previewImgUrl}
                      alt="Preview Background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        backgroundColor: `rgba(0,0,0, ${sombreado / 100})`,
                      }}
                    ></div>
                  </>
                )}

                {exibirLogo && previewLogoUrl ? (
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    <img
                      src={previewLogoUrl}
                      alt="Logo"
                      className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md"
                    />
                  </div>
                ) : (
                  nome && (
                    <span
                      className="font-black text-xl tracking-widest relative z-10 px-2 text-center w-full block drop-shadow-sm flex items-center justify-center h-full"
                      style={{ color: corTexto }}
                    >
                      {nome}
                    </span>
                  )
                )}
              </div>

              {/* ESTADO AO PASSAR O RATO */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col justify-end p-5">
                {previewImgUrl && (
                  <img
                    src={previewImgUrl}
                    className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    alt="Hover Background"
                  />
                )}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: gerarGradiente(corOverlay, opacidadeOverlay),
                  }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center mt-auto transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {nome && (
                    <>
                      <h4
                        className="font-black tracking-widest text-base mb-2 uppercase drop-shadow-md"
                        style={{ color: corTextoHover }}
                      >
                        {nome}
                      </h4>
                      <div className="w-6 h-1 bg-brand-lime rounded-full mb-3 shadow-sm"></div>
                    </>
                  )}
                  {descricao && (
                    <p
                      className="text-xs leading-relaxed line-clamp-4 font-medium drop-shadow"
                      style={{ color: corTextoHover }}
                    >
                      {descricao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Marcas Atuais na Grelha</h2>
        <div className="flex flex-wrap gap-4">
          {marcas.map((m) => (
            <div
              key={m.id}
              className="w-32 border p-4 rounded-xl flex flex-col items-center gap-2 text-center relative hover:border-brand-lime transition-colors bg-gray-50"
            >
              <div className="absolute top-1 right-1 flex gap-1">
                <button
                  onClick={() => handleEdit(m)}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full p-1 transition-colors"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => apagarMarcaGrelha(m.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1 transition-colors"
                  title="Apagar"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    close
                  </span>
                </button>
              </div>
              <img
                src={m.logo_url || m.imagem_url}
                className="h-10 object-contain rounded mt-2"
                alt="logo"
              />
              <span className="font-bold text-xs text-brand-blue truncate w-full mt-auto">
                {m.nome || "Sem nome"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
