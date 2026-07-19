import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';

// Função auxiliar para gerar o gradiente a partir de um HEX e opacidade
const gerarGradiente = (hex: string, opacidadePercentual: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const op = opacidadePercentual / 100;
  return `linear-gradient(to top, rgba(${r},${g},${b},${op}), rgba(${r},${g},${b},${op * 0.7}), rgba(${r},${g},${b},0.1))`;
};

export default function AdminMarcas() {
  const [marcas, setMarcas] = useState<any[]>([]);
  const [marcaMes, setMarcaMes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Estados - Marca do Mês
  const [tituloMes, setTituloMes] = useState('');
  const [descricaoMes, setDescricaoMes] = useState('');
  const [imagemMesFile, setImagemMesFile] = useState<File | null>(null);
  const imagemMesRef = useRef<HTMLInputElement>(null);

  // Estados - Grelha de Marcas
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoFundo, setTipoFundo] = useState('cor');
  const [corFundo, setCorFundo] = useState('#ffffff');
  const [corTexto, setCorTexto] = useState('#153A81');
  const [sombreado, setSombreado] = useState(40);
  
  // NOVO ESTADO - Exibir Logótipo em vez do Nome
  const [exibirLogo, setExibirLogo] = useState(false);
  
  // Estados - Efeito Hover (Overlay)
  const [corOverlay, setCorOverlay] = useState('#153A81');
  const [opacidadeOverlay, setOpacidadeOverlay] = useState(80);

  const [imagemGridFile, setImagemGridFile] = useState<File | null>(null);
  const imagemGridRef = useRef<HTMLInputElement>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const fetchData = async () => {
    const { data: gridData } = await supabase.from('marcas_grelha').select('*').order('created_at', { ascending: false });
    if (gridData) setMarcas(gridData);
    
    const { data: mesData } = await supabase.from('marca_mes').select('*').order('created_at', { ascending: false }).limit(1);
    if (mesData && mesData.length > 0) setMarcaMes(mesData[0]);
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (imagemGridFile) {
      const objectUrl = URL.createObjectURL(imagemGridFile);
      setPreviewImgUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImgUrl('');
    }
  }, [imagemGridFile]);

  const uploadFicheiro = async (file: File, pasta: string) => {
    const nomeFicheiro = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const caminho = `marcas/${pasta}/${nomeFicheiro}`;
    const { error } = await supabase.storage.from('folhetos').upload(caminho, file);
    if (error) throw error;
    const { data } = supabase.storage.from('folhetos').getPublicUrl(caminho);
    return data.publicUrl;
  };

  const handleMesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagemMesFile) return alert("Selecione a imagem da Marca do Mês.");
    setLoading(true);
    try {
      const url = await uploadFicheiro(imagemMesFile, 'mes');
      
      // APAGA TODAS as marcas do mês anteriores para não acumular na base de dados
      await supabase.from('marca_mes').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // INSERE a nova marca do mês
      await supabase.from('marca_mes').insert([{ titulo: tituloMes, descricao: descricaoMes, imagem_url: url }]);
      
      alert("Marca do Mês substituída com sucesso!");
      setTituloMes(''); setDescricaoMes(''); setImagemMesFile(null);
      if (imagemMesRef.current) imagemMesRef.current.value = '';
      fetchData();
    } catch (error: any) { alert(error.message); } finally { setLoading(false); }
  };

  const handleGridSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagemGridFile) return alert("Selecione a imagem/logo da marca.");
    setLoading(true);
    try {
      const url = await uploadFicheiro(imagemGridFile, 'grelha');
      await supabase.from('marcas_grelha').insert([{
        nome, 
        descricao, 
        tipo_fundo: tipoFundo, 
        cor_fundo: corFundo, 
        cor_texto: corTexto, 
        sombreado,
        cor_overlay: corOverlay, 
        opacidade_overlay: opacidadeOverlay, 
        imagem_url: url,
        exibir_logo: exibirLogo // Guarda a preferência de mostrar logo
      }]);
      alert("Marca adicionada à grelha!");
      
      // Resetar todos os campos
      setNome(''); 
      setDescricao(''); 
      setImagemGridFile(null); 
      setCorFundo('#ffffff'); 
      setCorTexto('#153A81'); 
      setSombreado(40); 
      setCorOverlay('#153A81'); 
      setOpacidadeOverlay(80);
      setExibirLogo(false);
      
      if (imagemGridRef.current) imagemGridRef.current.value = '';
      fetchData();
    } catch (error: any) { alert(error.message); } finally { setLoading(false); }
  };

  const apagarMarcaGrelha = async (id: string) => {
    if(window.confirm("Apagar esta marca?")) {
      await supabase.from('marcas_grelha').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      
      {/* FORMULÁRIO 1: MARCA DO MÊS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#153A81] mb-6">Atualizar Marca do Mês (Substitui a anterior)</h2>
        <form onSubmit={handleMesSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Título da Marca</label>
              <input type="text" value={tituloMes} onChange={(e) => setTituloMes(e.target.value)} required className="p-3 border rounded-xl outline-none focus:border-[#B5D318]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Imagem de Destaque</label>
              <input type="file" accept="image/*" ref={imagemMesRef} onChange={(e) => setImagemMesFile(e.target.files ? e.target.files[0] : null)} required className="p-2 border rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Descrição</label>
            <textarea value={descricaoMes} onChange={(e) => setDescricaoMes(e.target.value)} required rows={3} className="p-3 border rounded-xl outline-none focus:border-[#B5D318]"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] px-8 py-3 rounded-xl font-bold transition-all">Publicar Marca do Mês</button>
          </div>
        </form>
      </div>

      {/* FORMULÁRIO 2: GRELHA DE MARCAS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#153A81] mb-6">Adicionar Card à Grelha</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LADO ESQUERDO: FORMULÁRIO */}
          <form onSubmit={handleGridSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="p-3 border rounded-xl outline-none focus:border-[#B5D318]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Imagem / Foto do Produto</label>
                <input type="file" accept="image/*" ref={imagemGridRef} onChange={(e) => setImagemGridFile(e.target.files ? e.target.files[0] : null)} required className="p-2 border rounded-xl" />
              </div>
            </div>

            {/* SEÇÃO 1: REPOUSO */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
              <h3 className="font-bold text-[#153A81]">Aparência em Repouso</h3>
              
              {/* O QUE MOSTRAR NO CENTRO (TEXTO OU LOGO) */}
              <div className="flex flex-col gap-2 mb-2 pb-4 border-b border-gray-200">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Centro do Cartão</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
                    <input type="radio" checked={!exibirLogo} onChange={() => setExibirLogo(false)} className="w-4 h-4 text-[#B5D318]" /> 
                    Mostrar Nome (Texto)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
                    <input type="radio" checked={exibirLogo} onChange={() => setExibirLogo(true)} className="w-4 h-4 text-[#B5D318]" /> 
                    Mostrar Imagem (Logo s/ fundo)
                  </label>
                </div>
              </div>

              {/* FUNDO */}
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fundo do Cartão</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="radio" checked={tipoFundo === 'cor'} onChange={() => setTipoFundo('cor')} className="w-5 h-5 text-[#B5D318]" /> Cor Sólida
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="radio" checked={tipoFundo === 'imagem'} onChange={() => setTipoFundo('imagem')} className="w-5 h-5 text-[#B5D318]" /> Imagem
                </label>
              </div>

              <div className="flex flex-wrap gap-6 mt-2">
                {/* Mostra Cor do Título apenas se estiver a usar Texto no centro */}
                {!exibirLogo && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cor do Título</label>
                    <input type="color" value={corTexto} onChange={(e) => setCorTexto(e.target.value)} className="w-16 h-10 cursor-pointer rounded border" />
                  </div>
                )}

                {tipoFundo === 'cor' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cor Fundo</label>
                    <input type="color" value={corFundo} onChange={(e) => setCorFundo(e.target.value)} className="w-16 h-10 cursor-pointer rounded border" />
                  </div>
                )}

                {tipoFundo === 'imagem' && (
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                      <span>Sombrear Fundo</span><span>{sombreado}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={sombreado} onChange={(e) => setSombreado(Number(e.target.value))} className="mt-2" />
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 2: EFEITO HOVER */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col gap-4">
              <h3 className="font-bold text-[#153A81]">Efeito ao Passar o Rato (Overlay)</h3>
              
              <div className="flex flex-wrap gap-6 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cor Base</label>
                  <input type="color" value={corOverlay} onChange={(e) => setCorOverlay(e.target.value)} className="w-16 h-10 cursor-pointer rounded border" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                    <span>Opacidade da Cor</span><span>{opacidadeOverlay}%</span>
                  </label>
                  <input type="range" min="0" max="100" value={opacidadeOverlay} onChange={(e) => setOpacidadeOverlay(Number(e.target.value))} className="mt-2" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Descrição (Hover)</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={2} className="p-3 border rounded-xl outline-none focus:border-[#B5D318]"></textarea>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="bg-[#B5D318] hover:bg-[#a1bc12] text-[#153A81] px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                Adicionar à Grelha
              </button>
            </div>
          </form>

          {/* LADO DIREITO: LIVE PREVIEW */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Exemplo Visual (Passa o rato)</span>
            
            <div className="w-full max-w-[200px] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden h-32 hover:h-64">
              
              {/* ESTADO DE REPOUSO */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center`}
                style={tipoFundo === 'cor' ? { backgroundColor: corFundo } : {}}
              >
                {/* Imagem de Fundo (Se aplicável) */}
                {tipoFundo === 'imagem' && previewImgUrl && (
                  <>
                    <img src={previewImgUrl} alt="Preview Background" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 transition-opacity duration-300" style={{ backgroundColor: `rgba(0,0,0, ${sombreado / 100})` }}></div>
                  </>
                )}
                
                {/* Exibição Central: Logótipo OU Nome */}
                {exibirLogo && previewImgUrl ? (
                  <img src={previewImgUrl} alt="Logo" className="w-1/2 object-contain relative z-10 drop-shadow-sm" />
                ) : (
                  <span className="font-black text-xl tracking-widest relative z-10 px-2 text-center w-full block drop-shadow-sm" style={{ color: corTexto }}>
                    {nome || 'MARCA'}
                  </span>
                )}
              </div>

              {/* ESTADO AO PASSAR O RATO */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col justify-end p-5">
                  {previewImgUrl && (
                      <img src={previewImgUrl} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" alt="Hover Background" />
                  )}
                  {/* Overlay Dinâmico usando a função */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500" 
                    style={{ background: gerarGradiente(corOverlay, opacidadeOverlay) }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center mt-auto transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <h4 className="text-white font-black tracking-widest text-base mb-2 uppercase drop-shadow-md">{nome || 'MARCA'}</h4>
                      <div className="w-6 h-1 bg-[#B5D318] rounded-full mb-3 shadow-sm"></div>
                      <p className="text-white/90 text-xs leading-relaxed line-clamp-4 font-medium drop-shadow">{descricao || 'A descrição aparecerá aqui...'}</p>
                  </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* LISTA DE MARCAS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Marcas Atuais na Grelha</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {marcas.map(m => (
            <div key={m.id} className="border p-4 rounded-xl flex flex-col items-center gap-2 text-center relative hover:border-[#B5D318] transition-colors">
              <button onClick={() => apagarMarcaGrelha(m.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 rounded-full p-1"><span className="material-symbols-outlined text-sm">close</span></button>
              <img src={m.imagem_url} className="h-10 object-contain rounded" alt="logo" />
              <span className="font-bold text-sm text-[#153A81] truncate w-full">{m.nome}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}