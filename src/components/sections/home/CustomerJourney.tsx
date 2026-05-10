import React from 'react';

const CustomerJourney: React.FC = () => {
  return (
    /* py-24 para dar o distanciamento das outras seções (respiro) */
    <section className="bg-white w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Cabeçalho com bom espaçamento inferior */}
        <div className="text-center mb-20">
          <h2 className="font-h2 text-[#1e293b] text-3xl font-extrabold">Como Trabalhamos</h2>
          <p className="font-body-lg text-gray-500 max-w-2xl mx-auto mt-6">
            Um processo simplificado para que receba as suas peças com total conveniência e confiança.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
          
          {/* Linha Conectora Verde - Posicionada exatamente no centro dos ícones (top-10 que é metade de h-20) */}
          <div className="hidden md:block absolute top-10 left-20 right-20 h-[2px] bg-[#008554]/30 z-0"></div>
          
          {/* Passo 1 - shopping_cart */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="w-20 h-20 bg-white shadow-md rounded-full flex items-center justify-center mb-6 border-4 border-[#008554] transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[#008554] text-4xl">shopping_cart</span>
            </div>
            <h4 className="font-h3 text-[#1e293b] mb-3 text-lg font-bold">Encomenda no Site</h4>
            <p className="font-body-sm text-gray-500 text-sm leading-relaxed">
              Escolha entre milhares de referências originais e equivalentes.
            </p>
          </div>

          {/* Passo 2 - settings */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="w-20 h-20 bg-white shadow-md rounded-full flex items-center justify-center mb-6 border-4 border-[#008554] transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[#008554] text-4xl">settings</span>
            </div>
            <h4 className="font-h3 text-[#1e293b] mb-3 text-lg font-bold">Processamento Técnico</h4>
            <p className="font-body-sm text-gray-500 text-sm leading-relaxed">
              A nossa equipa valida a compatibilidade com o seu veículo.
            </p>
          </div>

          {/* Passo 3 - local_shipping */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="w-20 h-20 bg-white shadow-md rounded-full flex items-center justify-center mb-6 border-4 border-[#008554] transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[#008554] text-4xl">local_shipping</span>
            </div>
            <h4 className="font-h3 text-[#1e293b] mb-3 text-lg font-bold">Entrega Rápida</h4>
            <p className="font-body-sm text-gray-500 text-sm leading-relaxed">
              Envio expresso para sua casa ou oficina em 24/48 horas.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;