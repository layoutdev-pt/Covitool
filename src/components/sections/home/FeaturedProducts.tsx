import React from 'react';

const FeaturedProducts: React.FC = () => {
  return (
    /* Fundo alterado para #f8f9fb (o mesmo tom suave fora do container do Hero) */
    <section className="bg-[#f8f9fb] py-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-caps text-[#004BFF] uppercase text-xs font-bold tracking-widest">Destaques</span>
            <h2 className="font-h2 text-[#1e293b] mt-2 text-3xl font-extrabold">Produtos em Evidência</h2>
          </div>
          <button className="text-[#004BFF] font-button flex items-center gap-2 hover:gap-3 transition-all text-sm font-bold group">
            Ver todos 
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
        
        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 - Discos */}
          <div className="bg-white rounded-[40px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-square mb-6 overflow-hidden rounded-[32px] bg-[#f1f5f9] flex items-center justify-center p-10">
              <img className="max-h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Tf5mhrCRt6JkziJFs3i__Hhj9Glf8UfoKb6koQ0CRvqQ142kGuI8vHx2re-qDRaK9GD3jO5twWaquJXeU4hVVUyVDj71ttx_slVRSbupy78_7951KZMbwU-moCMgQZ76EIviiHhIQiuPUr9sNU6DXEoLJTpq6-6j2LzZLr8vo8161kv5FyjQXvmLMkLh291a1o83IDAXrsdctZi8lUGTwz-XV-Aab6cNnz30Q1bjb2vKTC92hDFtfea0-jzhai8sHqma2vk7H7fz" alt="Discos de Travão" />
            </div>
            <div className="px-2 flex flex-col flex-grow">
              <h3 className="font-h3 text-[#1e293b] mb-3 text-xl font-bold">Discos de Travão Cerâmicos</h3>
              <p className="font-body-sm text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">
                Resistência extrema ao calor e performance superior em pista para condutores exigentes.
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[#008554] text-2xl font-black italic">489,00 €</span>
                <button className="bg-[#008554] text-white px-7 py-3 rounded-full font-button text-xs font-bold hover:bg-[#006b43] transition-all shadow-md active:scale-95">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 - Intercooler */}
          <div className="bg-white rounded-[40px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-square mb-6 overflow-hidden rounded-[32px] bg-[#f1f5f9] flex items-center justify-center p-10">
              <img className="max-h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu3EIepJDTY6wXvgMNgTNhrxwpsMXiSTMAAevKtjEAb1dVgSYdGcN_HFdvorzaE8uSHYXbRoVlaBydY1L54WPIK6vdOxghncZXpvgQJBqHbjcDzrZl5j7sIXyCaSpANTduG2ouJ1DxUSmJvc-Y5aH2D532jECyrC24Hp6qn-rU2j7BRgiPdkz5RNSQToA_ukN6RpAi0a-hEjAUZtsS-m7_oFDtCJOXp_BlCBMIhiwCaAtfRx0Ej-FWepwP6AQvaQ15jgcwcYWSM1MO" alt="Intercooler" />
            </div>
            <div className="px-2 flex flex-col flex-grow">
              <h3 className="font-h3 text-[#1e293b] mb-3 text-xl font-bold">Turbo Intercooler Pro</h3>
              <p className="font-body-sm text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">
                Eficiência térmica otimizada para motores de alta cilindrada e performance contínua.
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[#008554] text-2xl font-black italic">825,00 €</span>
                <button className="bg-[#008554] text-white px-7 py-3 rounded-full font-button text-xs font-bold hover:bg-[#006b43] transition-all shadow-md active:scale-95">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Óleo */}
          <div className="bg-white rounded-[40px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-square mb-6 overflow-hidden rounded-[32px] bg-[#f1f5f9] flex items-center justify-center p-10">
              <img className="max-h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeM0mhlquvsyGAeegdzb0dG9vuL9SPHt4ksCX-GyVaWX6P1rsTdUaSGlASVGCjmywFDUp3gJ0y8NCMScaqLR8v6eksSVkoqdSP4uJ2Dul1-TDWPLRVy2XkLTCvkQtqUQyz9HWKLtCYYtX6zNvOwpjlYgOHXl1v62DsGZsxgjZVgKNVQ4qLOC72AhpPrM1HKWXT7Alw_dGfc76LcAn3INVnE2GAmVQdLUCiHeSDLn95i7VFcUN4882s8s__RrtsxPHUhYOq9DzhKKIV" alt="Óleo" />
            </div>
            <div className="px-2 flex flex-col flex-grow">
              <h3 className="font-h3 text-[#1e293b] mb-3 text-xl font-bold">Óleo Sintético 5W-30</h3>
              <p className="font-body-sm text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">
                Proteção total para o motor em qualquer condição climática, garantindo longevidade.
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[#008554] text-2xl font-black italic">64,90 €</span>
                <button className="bg-[#008554] text-white px-7 py-3 rounded-full font-button text-xs font-bold hover:bg-[#006b43] transition-all shadow-md active:scale-95">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;