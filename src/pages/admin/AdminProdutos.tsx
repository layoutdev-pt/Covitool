import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  
  // Estado para a imagem física
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const imagemInputRef = useRef<HTMLInputElement>(null);

  // Carregar produtos existentes
  const fetchProdutos = async () => {
    const { data, error } = await supabase.from('produtos_destaque').select('*').order('created_at', { ascending: false });
    if (error) console.error("Erro ao buscar produtos:", error);
    else setProdutos(data || []);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Upload da imagem para o bucket 'produtos'
  const uploadImagem = async (file: File) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const caminho = `imagens/${nomeFicheiro}`;

    const { error } = await supabase.storage.from('produtos').upload(caminho, file);
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from('produtos').getPublicUrl(caminho);
    return publicUrlData.publicUrl;
  };

  // Guardar novo produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagemFile) {
      alert('Por favor, selecione a imagem do produto.');
      return;
    }

    setLoading(true);

    try {
      const urlImagem = await uploadImagem(imagemFile);

      const { error } = await supabase.from('produtos_destaque').insert([
        {
          titulo,
          descricao,
          preco,
          imagem_url: urlImagem
        }
      ]);

      if (error) throw error;

      alert("Produto em destaque adicionado com sucesso!");
      
      // Limpar formulário
      setTitulo(''); setDescricao(''); setPreco('');
      setImagemFile(null);
      if (imagemInputRef.current) imagemInputRef.current.value = '';
      
      fetchProdutos();

    } catch (error: any) {
      alert(`Erro: ${error.message || 'Falha ao guardar produto.'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Apagar produto
  const handleDelete = async (id: string) => {
    if(window.confirm("Tem a certeza que deseja apagar este produto?")) {
      const { error } = await supabase.from('produtos_destaque').delete().eq('id', id);
      if (!error) fetchProdutos();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Secção do Formulário */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#153A81] mb-6">Adicionar Produto à Home</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Título do Produto</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] focus:border-[#153A81] outline-none transition-all" placeholder="Ex: Discos de Travão Cerâmicos" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Preço (com símbolo)</label>
            <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none transition-all" placeholder="Ex: 489,00 € (Opcional)" />            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Imagem de Destaque</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={imagemInputRef}
                onChange={(e) => setImagemFile(e.target.files ? e.target.files[0] : null)} 
                required 
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B5D318]/20 file:text-[#153A81] hover:file:bg-[#B5D318]/30 transition-all cursor-pointer" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Descrição Curta</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={2} className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none resize-none" placeholder="Breve descrição (Opcional)"></textarea>          </div>

          <div className="flex justify-end mt-2">
            <button type="submit" disabled={loading} className="bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
              {loading ? (
                <><span className="material-symbols-outlined animate-spin">refresh</span> A processar...</>
              ) : (
                <><span className="material-symbols-outlined">add_circle</span> Publicar Produto</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Produtos Existentes */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Produtos Atuais na Home</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-4 font-medium pl-2">Imagem</th>
                <th className="pb-4 font-medium">Título</th>
                <th className="pb-4 font-medium">Preço</th>
                <th className="pb-4 font-medium text-right pr-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-2">
                    <img src={produto.imagem_url} alt="Produto" className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm mix-blend-multiply" />
                  </td>
                  <td className="py-4 font-bold text-[#153A81]">{produto.titulo}</td>
                  <td className="py-4 font-semibold text-gray-700">{produto.preco}</td>
                  <td className="py-4 text-right pr-2">
                    <button onClick={() => handleDelete(produto.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Apagar">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {produtos.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 font-medium bg-gray-50 rounded-lg">Nenhum produto adicionado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}