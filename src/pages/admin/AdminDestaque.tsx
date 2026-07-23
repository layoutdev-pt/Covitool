import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

// NOVA FUNÇÃO: Extrai o caminho do ficheiro a partir do URL público para o podermos apagar do bucket 'folhetos'
const extrairCaminhoStorage = (url: string) => {
  if (!url) return null;
  const parts = url.split('/public/folhetos/');
  if (parts.length === 2) {
    return parts[1]; // Retorna a pasta e o ficheiro (ex: destaques/capas/123-file.jpg)
  }
  return null;
};

export default function AdminDestaque() {
  const [destaques, setDestaques] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [etiqueta, setEtiqueta] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  
  // Estado para Edição
  const [editId, setEditId] = useState<string | null>(null);

  // Ficheiros físicos
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const capaInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const fetchDestaques = async () => {
    const { data, error } = await supabase.from('destaque_mensal').select('*').order('created_at', { ascending: false });
    if (!error) setDestaques(data || []);
  };

  useEffect(() => {
    fetchDestaques();
  }, []);

  const uploadFicheiro = async (file: File, subpasta: string) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const caminho = `destaques/${subpasta}/${nomeFicheiro}`;

    // Usamos o bucket 'folhetos' que já tem permissões abertas
    const { error } = await supabase.storage.from('folhetos').upload(caminho, file);
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from('folhetos').getPublicUrl(caminho);
    return publicUrlData.publicUrl;
  };

  const resetForm = () => {
    setEtiqueta('');
    setTitulo('');
    setDescricao('');
    setEditId(null);
    setCapaFile(null);
    setPdfFile(null);
    if (capaInputRef.current) capaInputRef.current.value = '';
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editId && (!capaFile || !pdfFile)) {
      alert('Selecione a imagem da capa e o PDF.');
      return;
    }

    setLoading(true);

    try {
      let urlCapa = undefined;
      let urlPdf = undefined;
      const pathsParaApagar: string[] = [];

      const destaqueAntigo = editId ? destaques.find(d => d.id === editId) : null;

      // 1. Upload da Nova Capa (Se existir)
      if (capaFile) {
        urlCapa = await uploadFicheiro(capaFile, 'capas');
        if (editId && destaqueAntigo?.capa_url) {
          const pathAntigo = extrairCaminhoStorage(destaqueAntigo.capa_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      // 2. Upload do Novo PDF (Se existir)
      if (pdfFile) {
        urlPdf = await uploadFicheiro(pdfFile, 'pdfs');
        if (editId && destaqueAntigo?.pdf_url) {
          const pathAntigo = extrairCaminhoStorage(destaqueAntigo.pdf_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      // 3. Apagar os ficheiros antigos do servidor
      if (pathsParaApagar.length > 0) {
        await supabase.storage.from('folhetos').remove(pathsParaApagar);
      }

      if (editId) {
        // MODO ATUALIZAÇÃO
        const updateData: any = { etiqueta, titulo, descricao };
        if (urlCapa) updateData.capa_url = urlCapa;
        if (urlPdf) updateData.pdf_url = urlPdf;

        const { error } = await supabase.from('destaque_mensal').update(updateData).eq('id', editId);
        if (error) throw error;
        
        alert("Destaque atualizado com sucesso na Home!");
      } else {
        // MODO INSERÇÃO
        const { error } = await supabase.from('destaque_mensal').insert([{
          etiqueta, titulo, descricao, capa_url: urlCapa, pdf_url: urlPdf
        }]);
        if (error) throw error;
        
        alert("Destaque publicado com sucesso na Home!");
      }

      resetForm();
      fetchDestaques();

    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (destaque: any) => {
    setEtiqueta(destaque.etiqueta || '');
    setTitulo(destaque.titulo || '');
    setDescricao(destaque.descricao || '');
    setEditId(destaque.id);
    
    setCapaFile(null);
    setPdfFile(null);
    if (capaInputRef.current) capaInputRef.current.value = '';
    if (pdfInputRef.current) pdfInputRef.current.value = '';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if(window.confirm("Apagar este destaque? A Capa e o PDF serão eliminados do servidor. O destaque anterior passará a ser o principal caso exista.")) {
      
      // 1. Procurar o destaque para apagar os ficheiros
      const destaque = destaques.find(d => d.id === id);
      if (destaque) {
        const pathsParaApagar: string[] = [];
        const pathCapa = extrairCaminhoStorage(destaque.capa_url);
        const pathPdf = extrairCaminhoStorage(destaque.pdf_url);
        
        if (pathCapa) pathsParaApagar.push(pathCapa);
        if (pathPdf) pathsParaApagar.push(pathPdf);
        
        if (pathsParaApagar.length > 0) {
          await supabase.storage.from('folhetos').remove(pathsParaApagar);
        }
      }

      // 2. Apagar da Base de Dados
      await supabase.from('destaque_mensal').delete().eq('id', id);
      fetchDestaques();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative">
        {editId && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 rounded-t-2xl"></div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#153A81]">
            {editId ? 'Editar Destaque' : 'Atualizar Destaque Mensal (Home)'}
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
              <label className="text-sm font-semibold text-gray-700">Etiqueta</label>
              <input type="text" value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-[#B5D318] outline-none" placeholder="Ex: Oportunidades" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Título</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-[#B5D318] outline-none" placeholder="Ex: Folheto Mensal" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Capa do Folheto {editId && <span className="text-gray-400 font-normal">(Opcional)</span>}
              </label>
              <input type="file" accept="image/*" ref={capaInputRef} onChange={(e) => setCapaFile(e.target.files ? e.target.files[0] : null)} required={!editId} className="p-2 border border-gray-300 rounded-xl text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Documento PDF {editId && <span className="text-gray-400 font-normal">(Opcional)</span>}
              </label>
              <input type="file" accept=".pdf" ref={pdfInputRef} onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} required={!editId} className="p-2 border border-gray-300 rounded-xl text-sm" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required rows={3} className="p-3 border border-gray-300 rounded-xl focus:ring-[#B5D318] outline-none" placeholder="Descubra as promoções exclusivas deste mês..."></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            {editId && (
              <button type="button" onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm">
                Cancelar Edição
              </button>
            )}
            <button type="submit" disabled={loading} className={`${editId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318]'} px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}>
              {loading ? (
                <><span className="material-symbols-outlined animate-spin">refresh</span> A processar...</>
              ) : (
                <>
                  <span className="material-symbols-outlined">{editId ? 'save' : 'publish'}</span> 
                  {editId ? 'Atualizar Destaque' : 'Publicar Destaque'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Histórico de Destaques</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="pb-4">Capa</th>
                <th className="pb-4">Título</th>
                <th className="pb-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {destaques.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">
                    <img src={item.capa_url} className="w-12 h-16 object-cover rounded shadow" alt="capa" />
                  </td>
                  <td className="py-4 font-bold text-[#153A81]">
                    {item.titulo} 
                    {index === 0 && <span className="ml-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Destaque Ativo</span>}
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2" title="Editar">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Apagar">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {destaques.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg">Sem destaques no histórico.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}