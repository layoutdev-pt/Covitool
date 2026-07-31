import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

// Função para extrair o caminho do ficheiro a partir do URL público
const extrairCaminhoStorage = (url: string) => {
  if (!url) return null;
  const parts = url.split('/public/folhetos/');
  if (parts.length === 2) {
    return parts[1]; 
  }
  return null;
};

export default function AdminFolhetos() {
  const [folhetos, setFolhetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [validade, setValidade] = useState(''); 
  const [tipoIva, setTipoIva] = useState('nao_especificado'); // NOVO: 3 opções ('com_iva', 'sem_iva', 'nao_especificado')
  
  // Estado para Edição
  const [editId, setEditId] = useState<string | null>(null);

  // Estados para os ficheiros físicos
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const capaInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const fetchFolhetos = async () => {
    const { data, error } = await supabase.from('folhetos').select('*').order('created_at', { ascending: false });
    if (error) console.error("Erro ao buscar folhetos:", error);
    else setFolhetos(data || []);
  };

  useEffect(() => {
    fetchFolhetos();
  }, []);

  const uploadFicheiro = async (file: File, pasta: string) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const caminho = `${pasta}/${nomeFicheiro}`;

    const { error } = await supabase.storage.from('folhetos').upload(caminho, file);
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from('folhetos').getPublicUrl(caminho);
    return publicUrlData.publicUrl;
  };

  const resetForm = () => {
    setTitulo('');
    setResumo('');
    setTagsInput('');
    setValidade('');
    setTipoIva('nao_especificado'); // Reset para a nova opção neutra
    setEditId(null);
    setCapaFile(null);
    setPdfFile(null);
    if (capaInputRef.current) capaInputRef.current.value = '';
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editId && (!capaFile || !pdfFile)) {
      alert('Por favor, selecione a imagem da capa e o ficheiro PDF.');
      return;
    }

    setLoading(true);

    try {
      let urlCapa = undefined;
      let urlPdf = undefined;
      const pathsParaApagar: string[] = [];

      const folhetoAntigo = editId ? folhetos.find(f => f.id === editId) : null;

      if (capaFile) {
        urlCapa = await uploadFicheiro(capaFile, 'capas');
        if (editId && folhetoAntigo?.capa_url) {
          const pathAntigo = extrairCaminhoStorage(folhetoAntigo.capa_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      if (pdfFile) {
        urlPdf = await uploadFicheiro(pdfFile, 'pdfs');
        if (editId && folhetoAntigo?.pdf_url) {
          const pathAntigo = extrairCaminhoStorage(folhetoAntigo.pdf_url);
          if (pathAntigo) pathsParaApagar.push(pathAntigo);
        }
      }

      if (pathsParaApagar.length > 0) {
        await supabase.storage.from('folhetos').remove(pathsParaApagar);
      }

      const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      const payload: any = { 
        titulo, 
        resumo, 
        tags: tagsArray,
        validade,
        tipo_iva: tipoIva
      };

      if (urlCapa) payload.capa_url = urlCapa;
      if (urlPdf) payload.pdf_url = urlPdf;

      if (editId) {
        const { error } = await supabase.from('folhetos').update(payload).eq('id', editId);
        if (error) throw error;
        alert("Folheto atualizado com sucesso!");
      } else {
        const { error } = await supabase.from('folhetos').insert([payload]);
        if (error) throw error;
        alert("Folheto adicionado com sucesso!");
      }
      
      resetForm();
      fetchFolhetos();

    } catch (error: any) {
      alert(`Erro: ${error.message || 'Falha ao guardar folheto.'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (folheto: any) => {
    setTitulo(folheto.titulo || '');
    setResumo(folheto.resumo || '');
    setTagsInput(folheto.tags ? folheto.tags.join(', ') : '');
    setValidade(folheto.validade || '');
    setTipoIva(folheto.tipo_iva || 'nao_especificado');
    setEditId(folheto.id);
    
    setCapaFile(null);
    setPdfFile(null);
    if (capaInputRef.current) capaInputRef.current.value = '';
    if (pdfInputRef.current) pdfInputRef.current.value = '';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if(window.confirm("Tem a certeza que deseja apagar este folheto? A Capa e o PDF serão eliminados permanentemente do servidor.")) {
      
      const folheto = folhetos.find(f => f.id === id);
      if (folheto) {
        const pathsParaApagar: string[] = [];
        const pathCapa = extrairCaminhoStorage(folheto.capa_url);
        const pathPdf = extrairCaminhoStorage(folheto.pdf_url);
        
        if (pathCapa) pathsParaApagar.push(pathCapa);
        if (pathPdf) pathsParaApagar.push(pathPdf);
        
        if (pathsParaApagar.length > 0) {
          await supabase.storage.from('folhetos').remove(pathsParaApagar);
        }
      }

      const { error } = await supabase.from('folhetos').delete().eq('id', id);
      if (!error) fetchFolhetos();
    }
  };

  const formatarData = (dataStr: string) => {
    if (!dataStr) return '-';
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative">
        {editId && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 rounded-t-2xl"></div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#153A81]">
            {editId ? 'Editar Folheto' : 'Adicionar Novo Folheto'}
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
              <label className="text-sm font-semibold text-gray-700">Título do Catálogo/Folheto</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] focus:border-[#153A81] outline-none transition-all" placeholder="Ex: Catálogo Performance 2026" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Tags (Separadas por vírgula)</label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} required className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none transition-all" placeholder="Ex: Motor, Suspensão, Novidade" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Válido até (Opcional)</label>
              <input type="date" value={validade} onChange={(e) => setValidade(e.target.value)} className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none transition-all text-gray-600" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Tipo de Preço</label>
              <div className="flex gap-4 mt-2 p-1 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input type="radio" checked={tipoIva === 'nao_especificado'} onChange={() => setTipoIva('nao_especificado')} className="accent-[#B5D318] w-4 h-4" />
                  Não Especificado
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input type="radio" checked={tipoIva === 'com_iva'} onChange={() => setTipoIva('com_iva')} className="accent-[#B5D318] w-4 h-4" />
                  Com IVA
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input type="radio" checked={tipoIva === 'sem_iva'} onChange={() => setTipoIva('sem_iva')} className="accent-[#B5D318] w-4 h-4" />
                  Sem IVA
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Imagem da Capa {editId && <span className="text-gray-400 font-normal">(Opcional)</span>}
              </label>
              <input 
                type="file" 
                accept="image/*" 
                ref={capaInputRef}
                onChange={(e) => setCapaFile(e.target.files ? e.target.files[0] : null)} 
                required={!editId} 
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B5D318]/20 file:text-[#153A81] hover:file:bg-[#B5D318]/30 transition-all cursor-pointer" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Ficheiro PDF {editId && <span className="text-gray-400 font-normal">(Opcional)</span>}
              </label>
              <input 
                type="file" 
                accept=".pdf" 
                ref={pdfInputRef}
                onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} 
                required={!editId} 
                className="p-2.5 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#153A81] hover:file:bg-blue-100 transition-all cursor-pointer" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Resumo / Descrição</label>
            <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} required rows={3} className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B5D318] outline-none resize-none" placeholder="Breve descrição do conteúdo do folheto..."></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            {editId && (
              <button type="button" onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm">
                Cancelar Edição
              </button>
            )}
            <button type="submit" disabled={loading} className={`${editId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318]'} px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}>
              {loading ? (
                <><span className="material-symbols-outlined animate-spin">refresh</span> A processar...</>
              ) : (
                <>
                  <span className="material-symbols-outlined">{editId ? 'save' : 'cloud_upload'}</span> 
                  {editId ? 'Atualizar Folheto' : 'Publicar Folheto'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Folhetos Publicados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-4 font-medium pl-2">Capa</th>
                <th className="pb-4 font-medium">Título</th>
                <th className="pb-4 font-medium">Condições</th>
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
                    <div className="flex flex-col gap-1 text-xs">
                      {folheto.validade ? (
                        <span className="text-gray-500"><b className="text-gray-700">Até:</b> {formatarData(folheto.validade)}</span>
                      ) : (
                        <span className="text-gray-400 italic">Sem data limite</span>
                      )}
                      
                      {/* Mostrar o texto do IVA consoante a escolha */}
                      {folheto.tipo_iva === 'nao_especificado' || !folheto.tipo_iva ? (
                        <span className="font-bold text-gray-400">Não especificado</span>
                      ) : (
                        <span className={`font-bold ${folheto.tipo_iva === 'sem_iva' ? 'text-orange-500' : 'text-green-600'}`}>
                          {folheto.tipo_iva === 'sem_iva' ? 'Sem IVA' : 'Com IVA'}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {folheto.tags?.map((tag: string) => (
                        <span key={tag} className="bg-[#B5D318]/20 text-[#153A81] text-xs px-2.5 py-1 rounded-md font-semibold border border-[#B5D318]/30 uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2 whitespace-nowrap">
                    <button onClick={() => handleEdit(folheto)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 mr-2" title="Editar">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button onClick={() => handleDelete(folheto.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Apagar">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {folhetos.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 font-medium bg-gray-50 rounded-lg">Nenhum folheto publicado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}