import React from "react";

import IMG_CONFIANCA from "@/assets/fotos/1.webp";
import IMG_STOCK from "@/assets/fotos/stock.webp";

const BentoGrid: React.FC = () => {
  return (
    <section className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* CORREÇÃO AQUI: Trocado 'grid-rows-2' por 'md:grid-rows-2' para não forçar as 2 linhas no telemóvel */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[580px]">
          
          {/* 1. CARD GRANDE: Marcas de confiança */}
          {/* CORREÇÃO AQUI: Adicionado 'min-h-[350px] md:min-h-0' para dar altura no mobile e 'p-8 md:p-10' para melhor responsividade */}
          <div className="md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-0 relative group overflow-hidden rounded-[40px] shadow-sm bg-white border border-gray-100">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={IMG_CONFIANCA}
              alt="Confianca"
            />

            {/* Overlay de gradiente azul suavizado */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003dc2]/70 via-[#003dc2]/25 to-transparent"></div>
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="absolute bottom-0 left-0 p-8 md:p-10 z-10">
              <h3 className="font-h3 text-white mb-3 text-3xl font-bold tracking-tight">
                Marcas de confiança
              </h3>
              <p className="font-body-sm text-white/90 text-[15px] max-w-sm leading-relaxed font-medium">
                Trabalhamos com marcas de confiança para garantir a qualidade
                que o seu trabalho exige.
              </p>
            </div>
          </div>

          {/* 2. CARD: MELHORES PREÇOS */}
          <div className="md:col-span-1 bg-[#f0f2f8] rounded-[40px] p-8 flex flex-col justify-center items-center text-center border border-gray-50 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-brand-blue text-5xl mb-4 font-light">
              sell
            </span>
            <h4 className="text-brand-blue font-bold text-xl mb-1">
              Melhores Preços
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[160px]">
              Parcerias diretas com fabricantes.
            </p>
          </div>

          {/* 3. CARD: SUPORTE TÉCNICO */}
          <div className="md:col-span-1 bg-[#f0f2f8] rounded-[40px] p-8 flex flex-col justify-center items-center text-center border border-gray-50 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-brand-blue text-5xl mb-4 font-light">
              engineering
            </span>
            <h4 className="text-brand-blue font-bold text-xl mb-1">
              Suporte Técnico
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[160px]">
              Especialistas prontos para ajudar.
            </p>
          </div>

          {/* 4. CARD: MARCAS GLOBAIS */}
          {/* CORREÇÃO AQUI: Adicionado 'min-h-[220px] md:min-h-0' */}
          <div className="md:col-span-1 min-h-[220px] md:min-h-0 relative overflow-hidden rounded-[40px] shadow-lg group">
            <div className="absolute inset-0 bg-brand-blue backdrop-blur-[2px] transition-colors group-hover:bg-brand-bluetext-brand-blue/75"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
              <span className="material-symbols-outlined text-white text-5xl mb-4">
                public
              </span>
              <h4 className="text-white font-bold text-xl mb-1">
                Marcas Globais
              </h4>
              <p className="text-white/90 text-sm leading-relaxed max-w-[160px]">
                O melhor do mercado mundial.
              </p>
            </div>
          </div>

          {/* 5. CARD: STOCK DISPONÍVEL */}
          {/* CORREÇÃO AQUI: Adicionado 'min-h-[220px] md:min-h-0' */}
          <div className="md:col-span-1 min-h-[220px] md:min-h-0 relative overflow-hidden rounded-[40px] shadow-sm group">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={IMG_STOCK}
              alt="Stock"
            />
            {/* Fundo verde em todo o card */}
            <div className="absolute inset-0 bg-[#005a3c]/55"></div>
            
            {/* Blur apenas na metade inferior, com fade suave */}
            <div className="absolute inset-x-0 bottom-0 h-[50%] backdrop-blur-[4px] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent_100%)] [mask-image:linear-gradient(to_top,black_30%,transparent_100%)] pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
              <h4 className="text-white font-bold text-xl mb-1">
                Stock Disponível
              </h4>
              <p className="text-white/90 text-sm leading-relaxed max-w-[160px]">
                Ampla variedade de máquinas e ferramentas prontas para
                levantamento.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;