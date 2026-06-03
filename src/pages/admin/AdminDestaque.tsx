import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

export default function AdminDestaque() {
  const [destaques, setDestaques] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [etiqueta, setEtiqueta] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capaFile || !pdfFile) return alert('Selecione a imagem da capa e o PDF.');

    setLoading(true);

    try {
      const urlCapa = await uploadFicheiro(capaFile, 'capas');
      const urlPdf = await uploadFicheiro(pdfFile, 'pdfs');

      const { error } = await supabase.from('destaque_mensal').insert([{
        etiqueta, titulo, descricao, capa_url: urlCapa, pdf_url: urlPdf
      }]);

      if (error) throw error;

      alert("Destaque atualizado com sucesso na Home!");
      
      setEtiqueta(''); setTitulo(''); setDescricao('');
      setCapaFile(null); setPdfFile(null);
      if (capaInputRef.current) capaInputRef.current.value = '';
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      
      fetchDestaques();
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm("Apagar este destaque? O destaque anterior passará a ser o principal caso exista.")) {
      await supabase.from('destaque_mensal').delete().eq('id', id);
      fetchDestaques();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#153A81] mb-6">Atualizar Destaque Mensal (Home)</h2>
        
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
              <label className="text-sm font-semibold text-gray-700">Capa do Folheto</label>
              <input type="file" accept="image/*" ref={capaInputRef} onChange={(e) => setCapaFile(e.target.files ? e.target.files[0] : null)} required className="p-2 border border-gray-300 rounded-xl text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Documento PDF</label>
              <input type="file" accept=".pdf" ref={pdfInputRef} onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} required className="p-2 border border-gray-300 rounded-xl text-sm" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required rows={3} className="p-3 border border-gray-300 rounded-xl focus:ring-[#B5D318] outline-none" placeholder="Descubra as promoções exclusivas deste mês..."></textarea>
          </div>

          <div className="flex justify-end mt-2">
            <button type="submit" disabled={loading} className="bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] px-8 py-3.5 rounded-xl font-bold flex items-center gap-2">
              {loading ? 'A Enviar...' : 'Publicar Destaque'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Histórico de Destaques</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm"><th className="pb-4">Capa</th><th className="pb-4">Título</th><th className="pb-4 text-right">Ações</th></tr>
            </thead>
            <tbody>
              {destaques.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-4"><img src={item.capa_url} className="w-12 h-16 object-cover rounded shadow" alt="capa" /></td>
                  <td className="py-4 font-bold text-[#153A81]">
                    {item.titulo} 
                    {index === 0 && <span className="ml-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Destaque Ativo</span>}
                  </td>
                  <td className="py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2"><span className="material-symbols-outlined">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}