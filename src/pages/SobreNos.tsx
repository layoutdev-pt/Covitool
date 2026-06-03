import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationMap from '../components/sections/SobreNos/LocationMap'; // Ajusta o caminho se necessário
import ContactForm from '../components/sections/home/ContactForm'; // Ajusta o caminho se necessário

export default function SobreNos() {
  const location = useLocation();

  // Efeito para gerir o scroll quando a página carrega
  useEffect(() => {
    // Se existir um # no URL (ex: #contacto)
    if (location.hash) {
      // Pequeno atraso para garantir que os componentes (como o mapa) já estão na tela
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Se não houver #, garante que a página abre sempre no topo
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="flex flex-col gap-16 pb-12 bg-white">
      
      {/* Secção Hero Inicial */}
      <section className="bg-[#153A81] pt-48 pb-32 px-4 text-center text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5D318] rounded-full blur-[120px] opacity-20"></div>
        
        <span className="text-[#B5D318] text-sm md:text-base font-black tracking-widest uppercase mb-4 relative z-10">
          Experiência e Rigor desde 2007
        </span>
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight relative z-10">
          A sua parceira de confiança em ferragens e ferramentas industriais.
        </h1>
      </section>

      {/* Secção de Introdução / A Nossa História */}
      <section className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 h-80 rounded-3xl flex items-center justify-center text-gray-400 border border-gray-200">
            [Espaço para Grelha de Imagens]
          </div>
          
          <div>
            <h2 className="text-4xl text-[#153A81] mb-6 font-black tracking-tight">A Nossa História</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Fundada em 2007 por Nuno Costa e Luis Miguel Simões, a Covitool Lda. é o resultado de décadas de experiência no setor de acessórios industriais, máquinas e ferramentas.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Ao longo dos anos, consolidámo-nos como uma referência no mercado nacional, focando na importação e distribuição de produtos que garantem a máxima eficiência aos nossos clientes. O nosso compromisso com a qualidade técnica e o apoio especializado define quem somos.
            </p>
          </div>
        </div>
      </section>

      {/* Secção de KPIs / Estatísticas */}
      <section className="bg-[#153A81] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-6xl font-black">19+</span>
            <span className="text-sm font-bold tracking-widest uppercase text-blue-200">Anos de Experiência</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-6xl font-black">500m²</span>
            <span className="text-sm font-bold tracking-widest uppercase text-blue-200">Exposição e Stock</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-6xl font-black">+10k</span>
            <span className="text-sm font-bold tracking-widest uppercase text-blue-200">Referências de Produtos</span>
          </div>
        </div>
      </section>

      {/* Secção de Instalações e Serviços */}
      <section className="container mx-auto px-4 mt-4">
        <h2 className="text-3xl text-[#153A81] text-center mb-16 font-black tracking-tight">Instalações e Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 text-center hover:shadow-xl hover:border-[#B5D318] transition-all duration-300 group">
            <div className="relative flex items-center justify-center mb-6 w-20 h-20 mx-auto">
               <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
               <div className="relative z-10 flex justify-center bg-[#153A81] w-full h-full rounded-full items-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                 <span className="material-symbols-outlined text-[#B5D318] text-4xl">precision_manufacturing</span>
               </div>
            </div>
            <h3 className="text-[#153A81] text-xl font-bold mb-4">Equipamento Industrial</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Representamos as melhores marcas internacionais de ferramentas e máquinas para a indústria moderna.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 text-center hover:shadow-xl hover:border-[#B5D318] transition-all duration-300 group">
            <div className="relative flex items-center justify-center mb-6 w-20 h-20 mx-auto">
               <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
               <div className="relative z-10 flex justify-center bg-[#153A81] w-full h-full rounded-full items-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                 <span className="material-symbols-outlined text-[#B5D318] text-4xl">inventory_2</span>
               </div>
            </div>
            <h3 className="text-[#153A81] text-xl font-bold mb-4">Logística Avançada</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Os nossos 500m² de área de armazenamento garantem stock imediato para as suas necessidades mais urgentes.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 text-center hover:shadow-xl hover:border-[#B5D318] transition-all duration-300 group">
            <div className="relative flex items-center justify-center mb-6 w-20 h-20 mx-auto">
               <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
               <div className="relative z-10 flex justify-center bg-[#153A81] w-full h-full rounded-full items-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                 <span className="material-symbols-outlined text-[#B5D318] text-4xl">local_shipping</span>
               </div>
            </div>
            <h3 className="text-[#153A81] text-xl font-bold mb-4">Entrega Rápida</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Serviço de distribuição otimizado para garantir que os seus projetos nunca fiquem parados.
            </p>
          </div>

        </div>
      </section>

      {/* Secção de Mapa e Contactos */}
      <section className="container mx-auto px-4 mt-8">
        <LocationMap />
      </section>

      {/* ID adicionado aqui! O React Router vai procurar esta secção */}
      <section id="contacto" className="scroll-mt-32">
        <ContactForm />
      </section>

    </main>
  );
}