import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import SEOMetadata from '../components/SEOMetadata';
import IMG_HERO from '@/assets/fotos/1.webp';
const gerarGradiente = (hex: string, opacidadePercentual: number) => {
  if(!hex) hex = '#153A81';
  const r = parseInt(hex.slice(1, 3), 16) || 21;
  const g = parseInt(hex.slice(3, 5), 16) || 58;
  const b = parseInt(hex.slice(5, 7), 16) || 129;
  const op = (opacidadePercentual ?? 80) / 100;
  return `linear-gradient(to top, rgba(${r},${g},${b},${op}), rgba(${r},${g},${b},${op * 0.7}), rgba(${r},${g},${b},0.1))`;
};

export default function Marcas() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');
  const [marcasGrid, setMarcasGrid] = useState<any[]>([]);
  const [marcaMes, setMarcaMes] = useState<any>(null);
  
  const categorias = ['Todas', 'Motor', 'Travagem', 'Suspensão', 'Iluminação', 'Óleos e Fluidos'];
  const parceiros = ['WERKU', 'STANLEY', 'SKIL', 'KAERCHER', 'GEDORE', 'DEWALT', 'CHEMITOOL', 'BOSCH', 'BETA', 'AEG', '3M'];

  useEffect(() => {
    const fetchData = async () => {
      // Ordenação alterada: da primeira a ser adicionada para a mais recente (ascending: true)
      const { data: gridData } = await supabase.from('marcas_grelha').select('*').order('created_at', { ascending: true });
      if (gridData) setMarcasGrid(gridData);

      const { data: mesData } = await supabase.from('marca_mes').select('*').order('created_at', { ascending: false }).limit(1).single();
      if (mesData) setMarcaMes(mesData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-16 py-12">
      <SEOMetadata 
        title="Marcas de Ferramentas para Construção e Obras Públicas | Covitool" 
        description="Explore as melhores marcas de ferramentas e equipamento profissional distribuídas pela Covitool para o setor B2B e construção de obras públicas." 
        canonical="https://covitool.pt/marcas" 
      />
      
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 25s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>

      {/* Secção Inicial */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-brand-blue rounded-3xl h-80 flex flex-col justify-end p-10 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-blue/60 z-10 transition-opacity duration-500 group-hover:bg-brand-blue/75"></div>
            <img src={IMG_HERO} alt="Peças" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" />
            <div className="relative z-20">
              <span className="inline-block px-3 py-1 bg-brand-lime text-brand-blue text-xs font-black tracking-widest uppercase rounded-full mb-4 shadow-sm">Marcas Certificadas</span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight">Equipamento Profissional</h1>
              <p className="text-blue-100 font-light max-w-sm">A máxima fiabilidade e precisão, garantidas pelos melhores fabricantes do mercado.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center hover:border-brand-lime transition-colors duration-300 group">
                <div className="text-brand-blue group-hover:text-brand-lime transition-colors mb-4"><span className="material-symbols-outlined text-4xl">verified</span></div>
                <h3 className="text-lg font-bold text-brand-blue">Garantia de Fábrica</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Proteção total em todos os componentes adquiridos.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center hover:border-brand-lime transition-colors duration-300 group">
                <div className="text-brand-blue group-hover:text-brand-lime transition-colors mb-4"><span className="material-symbols-outlined text-4xl">sell</span></div>
                <h3 className="text-lg font-bold text-brand-blue">Melhor Preço</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Compromisso com a melhor oferta do mercado nacional.</p>
              </div>
            </div>
            
            <div className="bg-brand-blue p-6 rounded-3xl shadow-sm flex items-center gap-4 overflow-hidden relative h-20">
              <div className="z-20 bg-brand-blue pr-4 py-2 flex items-center h-full">
                <span className="font-bold text-white tracking-wide whitespace-nowrap">Parceiros Oficiais</span>
              </div>
              <div className="flex-1 overflow-hidden relative flex items-center h-full mask-image">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-blue to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-blue to-transparent z-10 pointer-events-none"></div>
                <div className="flex gap-12 text-brand-lime font-black tracking-wider text-sm opacity-90 animate-scroll w-max px-6">
                  {parceiros.map((marca, index) => <span key={index}>{marca}</span>)}
                  {parceiros.map((marca, index) => <span key={`dup-${index}`}>{marca}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* GRELHA DE MARCAS */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 items-start">
          {marcasGrid.map((marca) => {
            const shaderOpacity = marca.sombreado !== undefined ? marca.sombreado / 100 : 0.4;
            const textColorHover = marca.cor_texto_hover || '#ffffff';
            
            return (
              <div 
                key={marca.id} 
                className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-2xl hover:border-brand-lime transition-all duration-500 cursor-pointer group relative overflow-hidden h-32 hover:h-64"
              >
                
                {/* REPOUSO */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center`}
                  style={marca.tipo_fundo === 'cor' ? { backgroundColor: marca.cor_fundo } : {}}
                >
                  {marca.tipo_fundo === 'imagem' && (
                    <>
                      <img src={marca.imagem_url} alt={marca.nome} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 transition-opacity duration-300" style={{ backgroundColor: `rgba(0,0,0, ${shaderOpacity})` }}></div>
                    </>
                  )}
                  
                  {marca.exibir_logo && marca.logo_url ? (
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                      <img src={marca.logo_url} alt={`${marca.nome} logo`} className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md" />
                    </div>
                  ) : (
                    marca.nome && (
                      <span 
                        className="font-black text-xl tracking-widest relative z-10 px-2 text-center w-full block drop-shadow-sm flex items-center justify-center h-full"
                        style={{ color: marca.cor_texto || 'var(--color-brand-blue)' }}
                      >
                        {marca.nome}
                      </span>
                    )
                  )}
                </div>

                {/* HOVER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col justify-end p-5">
                  <img src={marca.imagem_url} alt={`${marca.nome} background`} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                  
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: gerarGradiente(marca.cor_overlay, marca.opacidade_overlay) }}
                  ></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center mt-auto transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {marca.nome && (
                      <>
                        <h4 className="font-black tracking-widest text-base mb-2 uppercase drop-shadow-md" style={{ color: textColorHover }}>{marca.nome}</h4>
                        <div className="w-6 h-1 bg-brand-lime rounded-full mb-3 shadow-sm"></div>
                      </>
                    )}
                    {marca.descricao && (
                      <p className="text-xs leading-relaxed line-clamp-4 font-medium drop-shadow" style={{ color: textColorHover }}>{marca.descricao}</p>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* NOVO: CTA Marcas Não Encontrada */}
      <section className="container mx-auto px-4 mt-8 mb-4">
        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-4 tracking-tight">Não encontra a marca que procura?</h2>
          <p className="text-gray-500 text-lg max-w-2xl mb-8 leading-relaxed">
            O nosso portfólio vai muito além desta seleção. Trabalhamos em parceria com centenas de fabricantes para garantir que tem sempre acesso ao equipamento certo para o seu projeto.
          </p>
          <a href="https://wa.me/351912191755" target="_blank" rel="noopener noreferrer" className="bg-brand-lime hover:bg-[#a1bc12] text-brand-blue px-8 py-4 rounded-full font-black tracking-wide transition-all hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">forum</span>
            Perguntar por uma Marca
          </a>
        </div>
      </section>

      {/* MARCA DO MÊS */}
      {marcaMes && (
        <section className="container mx-auto px-4 mt-8">
          <div className="bg-white rounded-[40px] p-8 lg:p-14 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
            <div className="flex flex-col items-start">
              <span className="px-3 py-1 bg-brand-blue text-brand-lime text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
                Marca do Mês
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-brand-blue mb-6 tracking-tight">
                {marcaMes.titulo}
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed whitespace-pre-line">
                {marcaMes.descricao}
              </p>
              
              <Link to="/folhetos" className="px-8 py-4 bg-brand-lime text-brand-blue rounded-full font-bold hover:bg-[#a1bc12] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Verificar em folhetos
                <span className="material-symbols-outlined text-xl">auto_stories</span>
              </Link>
            </div>
            <div className="bg-[#f0f2f5] h-72 lg:h-100 rounded-3xl overflow-hidden relative flex items-center justify-center p-8">
               <img 
                src={marcaMes.imagem_url} 
                alt={marcaMes.titulo} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply rounded-2xl shadow-sm"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL (Mantido na base) */}
      <section className="container mx-auto px-4 pb-12 mt-8">
        <div className="bg-brand-blue rounded-[40px] p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg">
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-brand-lime rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
          <div className="flex flex-col gap-4 max-w-2xl relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">Venha visitar-nos e conheça a nossa gama completa.</h2>
            <p className="text-blue-100 text-lg font-light leading-relaxed">Temos uma equipa de especialistas pronta para encontrar a solução técnica ideal para o seu negócio.</p>
          </div>
          <Link to="/sobre-nos#contacto" className="bg-brand-lime hover:bg-[#a1bc12] text-brand-blue px-10 py-4 rounded-full font-black tracking-wide transition-all hover:-translate-y-1 shadow-xl relative z-10 whitespace-nowrap flex items-center justify-center gap-2 shrink-0 w-full md:w-auto">
            <span className="material-symbols-outlined">support_agent</span> Contactar Agora
          </Link>
        </div>
      </section>

    </div>
  );
}