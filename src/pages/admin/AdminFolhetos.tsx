import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

export default function AdminFolhetos() {
  const [folhetos, setFolhetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  // Novos estados para os ficheiros físicos
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Referências para limpar os inputs de ficheiro após o envio
  const capaInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Carregar folhetos existentes
  const fetchFolhetos = async () => {
    const { data, error } = await supabase.from('folhetos').select('*').order('created_at', { ascending: false });
    if (error) console.error("Erro ao buscar folhetos:", error);
    else setFolhetos(data || []);
  };

  useEffect(() => {
    fetchFolhetos();
  }, []);

  // Função auxiliar para fazer upload para o Supabase Storage
  const uploadFicheiro = async (file: File, pasta: string) => {
    // Criar um nome único para não haver ficheiros sobrepostos
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const caminho = `${pasta}/${nomeFicheiro}`;

    // Upload para o bucket 'folhetos'
    const { data, error } = await supabase.storage
      .from('folhetos')
      .upload(caminho, file);

    if (error) {
      throw error;
    }

    // Obter o URL público para guardar na Base de Dados
    const { data: publicUrlData } = supabase.storage
      .from('folhetos')
      .getPublicUrl(caminho);

    return publicUrlData.publicUrl;
  };

  // Guardar novo folheto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!capaFile || !pdfFile) {
      alert('Por favor, selecione a imagem da capa e o ficheiro PDF.');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload dos ficheiros físicos
      const urlCapa = await uploadFicheiro(capaFile, 'capas');
      const urlPdf = await uploadFicheiro(pdfFile, 'pdfs');

      // 2. Tratar as tags
      const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      // 3. Inserir na Base de Dados com os URLs gerados
      const { error } = await supabase.from('folhetos').insert([
        {
          titulo,
          resumo,
          tags: tagsArray,
          capa_url: urlCapa,
          pdf_url: urlPdf
        }
      ]);

      if (error) throw error;

      alert("Folheto adicionado com sucesso!");
      
      // Limpar formulário
      setTitulo(''); setResumo(''); setTagsInput('');
      setCapaFile(null); setPdfFile(null);
      if (capaInputRef.current) capaInputRef.current.value = '';
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      
      // Atualizar lista
      fetchFolhetos();

    } catch (error: any) {
      alert(`Erro: ${error.message || 'Falha ao guardar folheto.'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Apagar folheto (Apaga apenas o registo da BD por agora)
  const handleDelete = async (id: string) => {
    if(window.confirm("Tem a certeza que deseja apagar este folheto?")) {
      const { error } = await supabase.from('folhetos').delete().eq('id', id);
      if (!error) fetchFolhetos();
      // Nota: Idealmente, no futuro também apagamos os ficheiros do Storage aqui.
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Secção do Formulário */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#153A81] mb-6">Adicionar Novo Folheto</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Título do Catálogo/Folheto</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] focus:border-[#153A81] outline-none transition-all" placeholder="Ex: Catálogo Performance 2026" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Tags (Separadas por vírgula)</label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none transition-all" placeholder="Ex: Motor, Suspensão, Novidade" />
            </div>

            {/* Inputs de Upload Reais */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Imagem da Capa</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={capaInputRef}
                onChange={(e) => setCapaFile(e.target.files ? e.target.files[0] : null)} 
                required 
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B5D318]/20 file:text-[#153A81] hover:file:bg-[#B5D318]/30 transition-all cursor-pointer" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Ficheiro PDF</label>
              <input 
                type="file" 
                accept=".pdf" 
                ref={pdfInputRef}
                onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} 
                required 
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#153A81] hover:file:bg-blue-100 transition-all cursor-pointer" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Resumo / Descrição</label>
            <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} required rows={3} className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none resize-none" placeholder="Breve descrição do conteúdo do folheto..."></textarea>
          </div>

          <div className="flex justify-end mt-2">
            <button type="submit" disabled={loading} className="bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
              {loading ? (
                <><span className="material-symbols-outlined animate-spin">refresh</span> A enviar ficheiros...</>
              ) : (
                <><span className="material-symbols-outlined">cloud_upload</span> Publicar Folheto</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Folhetos Existentes */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Folhetos Publicados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-4 font-medium pl-2">Capa</th>
                <th className="pb-4 font-medium">Título</th>
                <th className="pb-4 font-medium">Tags</th>
                <th className="pb-4 font-medium text-right pr-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {folhetos.map((folheto) => (
                <tr key={folheto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-2">
                    <img src={folheto.capa_url} alt="Capa" className="w-12 h-16 object-cover rounded-md border border-gray-200 shadow-sm" />
                  </td>
                  <td className="py-4 font-bold text-[#153A81]">{folheto.titulo}</td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {folheto.tags?.map((tag: string) => (
                        <span key={tag} className="bg-[#B5D318]/20 text-[#153A81] text-xs px-2.5 py-1 rounded-md font-semibold border border-[#B5D318]/30 uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button onClick={() => handleDelete(folheto.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Apagar">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {folhetos.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 font-medium bg-gray-50 rounded-lg">Nenhum folheto publicado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}