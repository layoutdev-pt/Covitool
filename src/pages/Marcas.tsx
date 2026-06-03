import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Marcas() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');
  
  const categorias = ['Todas'];
  const marcasGrelha = ['BOSCH', 'BREMBO', 'CASTROL', 'MANN', 'VALEO', 'SACHS', 'MICHELIN', 'NGK', 'MOTUL', 'LUK', 'SKF', 'K&N'];
  
  // Lista de parceiros para o carrossel
  const parceiros = ['BOSCH', 'BREMBO', 'CASTROL', 'MAGNETI', 'MANN', 'VALEO', 'SACHS', 'SKF'];

  return (
    <main className="flex flex-col gap-16 py-12 bg-gray-50 pt-32 min-h-screen">
      
      {/* Estilo CSS injetado para a animação infinita do carrossel */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Secção de Destaque Inicial */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bloco Esquerdo: Imagem com Título (Agora em Azul Marinho) */}
          <div className=" rounded-3xl h-80 flex flex-col justify-end p-10 text-white relative overflow-hidden group">
            {/* Overlay em tons de azul para escurecer a imagem de fundo */}
            <div className="absolute inset-0 bg-[#153A81]/6 z-0.1 transition-opacity duration-500 group-hover:bg-[#153A81]/5"></div>
            <img 
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800" 
              alt="Peças Originais" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
            />
            <div className="relative z-20">
              <span className="inline-block px-3 py-1 bg-[#B5D318] text-[#153A81] text-xs font-black tracking-widest uppercase rounded-full mb-4 shadow-sm">
                Qualidade Certificada
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight">Peças Originais</h1>
              <p className="text-blue-100 font-light max-w-sm">A máxima performance garantida pelos melhores fabricantes.</p>
            </div>
          </div>

          {/* Bloco Direito: Vantagens e Parceiros */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Cartão Garantia */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center hover:border-[#B5D318] transition-colors duration-300 group">
                <div className="text-[#153A81] group-hover:text-[#B5D318] transition-colors mb-4">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h3 className="text-lg font-bold text-[#153A81]">Garantia de Fábrica</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Proteção total em todos os componentes adquiridos.</p>
              </div>
              {/* Cartão Melhor Preço */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center hover:border-[#B5D318] transition-colors duration-300 group">
                <div className="text-[#153A81] group-hover:text-[#B5D318] transition-colors mb-4">
                  <span className="material-symbols-outlined text-4xl">sell</span>
                </div>
                <h3 className="text-lg font-bold text-[#153A81]">Melhor Preço</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Compromisso com a melhor oferta do mercado nacional.</p>
              </div>
            </div>
            
            {/* Banner de Parceiros Oficiais (CARROSSEL ANIMADO - Fundo Azul) */}
            <div className="bg-[#153A81] p-6 rounded-3xl shadow-sm flex items-center gap-4 overflow-hidden relative h-20">
              <div className="z-20 bg-[#153A81] pr-4 py-2 flex items-center h-full">
                <span className="font-bold text-white tracking-wide whitespace-nowrap">Parceiros Oficiais</span>
              </div>
              
              <div className="flex-1 overflow-hidden relative flex items-center h-full mask-image">
                {/* Sombras laterais agora usam a cor #153A81 para se fundirem com o fundo */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#153A81] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#153A81] to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex gap-12 text-[#B5D318] font-black tracking-wider text-sm opacity-90 animate-scroll w-max px-6">
                  {parceiros.map((marca, index) => (
                    <span key={index}>{marca}</span>
                  ))}
                  {parceiros.map((marca, index) => (
                    <span key={`dup-${index}`}>{marca}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Secção de Filtros de Categoria */}
      <section className="container mx-auto px-4 mt-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map((cat) => (
            <button 
              key={cat}
              onClick={() => setFiltroAtivo(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filtroAtivo === cat 
                  ? 'bg-[#B5D318] text-[#153A81] shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#B5D318] hover:text-[#153A81]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grelha de Marcas */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {marcasGrelha.map((marca, index) => (
            <div 
              key={index} 
              className="bg-white h-32 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-lg hover:border-[#B5D318] transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#B5D318]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-gray-300 font-black text-xl tracking-widest group-hover:text-[#153A81] transition-colors duration-300 relative z-10">
                {marca}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Marca do Mês */}
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-[40px] p-8 lg:p-14 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
          <div className="flex flex-col items-start">
            {/* Etiqueta atualizada para Azul Marinho */}
            <span className="px-3 py-1 bg-[#153A81] text-[#B5D318] text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
              Marca do Mês
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#153A81] mb-6 tracking-tight">
              Michelin <br/> Performance
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Com mais de 100 anos de inovação, a Michelin define o padrão global em segurança e durabilidade. Descubra a nova linha de pneus Pilot Sport desenhada para máxima aderência e controlo.
            </p>
            <button className="px-8 py-4 bg-[#B5D318] text-[#153A81] rounded-full font-bold hover:bg-[#a1bc12] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              Ver Catálogo Michelin
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
          <div className="bg-[#f0f2f5] h-72 lg:h-[400px] rounded-3xl overflow-hidden relative flex items-center justify-center p-8">
             <img 
              src="https://images.unsplash.com/photo-1580274455052-eb4cfae3c3b0?auto=format&fit=crop&q=80&w=800" 
              alt="Pneu Michelin" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* NOVA CTA FINAL - Direciona para o ContactForm na página Sobre Nós */}
      <section className="container mx-auto px-4 pb-12 mt-8">
        <div className="bg-[#153A81] rounded-[40px] p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg">
          {/* Luz verde decorativa no fundo */}
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#B5D318] rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="flex flex-col gap-4 max-w-2xl relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              Venha visitar-nos e conheça a nossa gama completa.
            </h2>
            <p className="text-blue-100 text-lg font-light leading-relaxed">
              Temos uma equipa de especialistas pronta para encontrar a solução técnica ideal para o seu negócio.
            </p>
          </div>
          
          {/* A propriedade 'to' agora inclui o hash #contacto */}
          <Link 
            to="/sobre-nos#contacto" 
            className="bg-[#B5D318] hover:bg-[#a1bc12] text-[#153A81] px-10 py-4 rounded-full font-black tracking-wide transition-all hover:-translate-y-1 shadow-xl relative z-10 whitespace-nowrap flex items-center justify-center gap-2 shrink-0 w-full md:w-auto"
          >
            <span className="material-symbols-outlined">support_agent</span>
            Contactar Agora
          </Link>
        </div>
      </section>

    </main>
  );
}