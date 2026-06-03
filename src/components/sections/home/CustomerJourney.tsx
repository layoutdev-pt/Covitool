import React from 'react';

const CustomerJourney: React.FC = () => {
  return (
    <section className="bg-white w-full py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="text-[#153A81] text-4xl font-extrabold">Como Trabalhamos</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg">
            Um processo simplificado para que receba as suas peças com total conveniência e confiança.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-16 md:gap-4">
          
          {/* Linha Conectora com Gradiente */}
          <div className="hidden md:block absolute top-12 left-32 right-32 h-[2px] bg-gradient-to-r from-transparent via-[#B5D318] to-transparent opacity-50 z-0"></div>
          
          {/* Passo 1 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-full border border-[#B5D318] animate-ping opacity-20"></div>
              <div className="w-24 h-24 bg-white shadow-lg rounded-full flex items-center justify-center border-4 border-[#153A81] group-hover:border-[#B5D318] transition-colors duration-300 relative z-10">
                <span className="material-symbols-outlined text-[#153A81] group-hover:text-[#B5D318] text-4xl transition-colors">shopping_cart</span>
              </div>
            </div>
            <h4 className="text-[#153A81] mb-3 text-xl font-bold">Encomenda no Site</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Escolha entre milhares de referências originais e equivalentes com a máxima facilidade.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="w-24 h-24 bg-white shadow-lg rounded-full flex items-center justify-center border-4 border-[#153A81] group-hover:border-[#B5D318] transition-colors duration-300 relative z-10">
                <span className="material-symbols-outlined text-[#153A81] group-hover:text-[#B5D318] text-4xl transition-colors">settings</span>
              </div>
            </div>
            <h4 className="text-[#153A81] mb-3 text-xl font-bold">Processamento Técnico</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              A nossa equipa de especialistas valida a compatibilidade exata com o seu veículo.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] group">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="w-24 h-24 bg-white shadow-lg rounded-full flex items-center justify-center border-4 border-[#153A81] group-hover:border-[#B5D318] transition-colors duration-300 relative z-10">
                <span className="material-symbols-outlined text-[#153A81] group-hover:text-[#B5D318] text-4xl transition-colors">local_shipping</span>
              </div>
            </div>
            <h4 className="text-[#153A81] mb-3 text-xl font-bold">Entrega Rápida</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Envio expresso otimizado para a sua empresa ou oficina no menor tempo possível.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;