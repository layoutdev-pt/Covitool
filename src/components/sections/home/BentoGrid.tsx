import React from 'react';

const BentoGrid: React.FC = () => {
  return (
    /* Fundo da section alterado para branco puro */
    <section className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[580px]">
          
          {/* 1. CARD GRANDE: CONTROLO DE QUALIDADE */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[40px] shadow-sm bg-white border border-gray-100">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrcPunER6RHPgwDAJo8BDDn1VXbiZBm2RGaoHwte0iJpsuowbjGJ82rPJFceBgmc-s4iU4pPgVDxM08SKZ-7ZiHvielIXzJlSVLo4Uk9ik5ONH1QJepb6s3w3q0s2c9Al6TfBc8X9Abg9nKPs1fD5lTB0rzqqOIly-a4o4MtnAHwqRMzLzMzaqgF7o9krjDjHNS9CkYJuNAVtOQLM-fpsl7NTB_XHQeDS9wgh_7f_Wka_cBPmiVXsKRj1tU3bYzfQ_1jES_JaCeO3" 
              alt="Qualidade"
            />
            
            {/* Overlay de gradiente azul suavizado */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003dc2]/70 via-[#003dc2]/25 to-transparent"></div>
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="absolute bottom-0 left-0 p-10 z-10">
              <h3 className="font-h3 text-white mb-3 text-2xl font-bold tracking-tight">
                Controlo de Qualidade
              </h3>
              <p className="font-body-sm text-white/90 text-[13px] max-w-xs leading-relaxed font-medium">
                Testes rigorosos em cada componente para garantir a máxima performance na estrada.
              </p>
            </div>
          </div>

          {/* 2. CARD: MELHORES PREÇOS */}
          <div className="md:col-span-1 bg-[#f0f2f8] rounded-[40px] p-8 flex flex-col justify-center items-center text-center border border-gray-50 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-[#004BFF] text-4xl mb-4 font-light">sell</span>
            <h4 className="text-[#004BFF] font-bold text-lg mb-1">Melhores Preços</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[140px]">
              Parcerias diretas com fabricantes.
            </p>
          </div>

          {/* 3. CARD: SUPORTE TÉCNICO */}
          <div className="md:col-span-1 bg-[#f0f2f8] rounded-[40px] p-8 flex flex-col justify-center items-center text-center border border-gray-50 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-[#004BFF] text-4xl mb-4 font-light">engineering</span>
            <h4 className="text-[#004BFF] font-bold text-lg mb-1">Suporte Técnico</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[140px]">
              Especialistas prontos para ajudar.
            </p>
          </div>

          {/* 4. CARD: MARCAS GLOBAIS */}
          <div className="md:col-span-1 bg-[#004BFF] rounded-[40px] p-8 flex flex-col justify-center items-center text-center shadow-lg transition-all hover:brightness-110">
            <span className="material-symbols-outlined text-white text-4xl mb-4">public</span>
            <h4 className="text-white font-bold text-lg mb-1">Marcas Globais</h4>
            <p className="text-white/80 text-xs leading-relaxed max-w-[140px]">
              O melhor do mercado mundial.
            </p>
          </div>

          {/* 5. CARD: STOCK PERMANENTE */}
          <div className="md:col-span-1 relative overflow-hidden rounded-[40px] shadow-sm group">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg47aW5QNbceCNHO0f35mNUpT2CwmNbOGXPOGOGSX7ZNDb35Bh1KzRSic8KPNco0L40n89VqUYkbIaPJfUPMUIpXuC14JGJQjpwOVoCvbxcaZZP-wFZMGJuWOI12lSCE39sh-cYw7MzWBWaTKLCGCLppT476gpfJrISySPm8Mks7_ruwL9LQUiQly8kZiRoIoBmE-Ak3iWVzYWenYil4M0XCpXWJhalAFgo0lbBwdfHUOT4ok8vfYA6WmcEklwuOEDNqkg1fJtYc1w" 
              alt="Stock" 
            />
            <div className="absolute inset-0 bg-[#005a3c]/55 backdrop-blur-[1px]"></div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
              <h4 className="text-white font-bold text-lg mb-1">Stock Permanente</h4>
              <p className="text-white/90 text-xs leading-relaxed max-w-[140px]">
                Envio imediato disponível.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;