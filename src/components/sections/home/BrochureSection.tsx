import React from 'react';

const BrochureSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      {/* Container com bordas bem arredondadas [40px] e fundo azul da marca */}
      <div className="flex flex-col md:flex-row items-stretch bg-[#004BFF] rounded-[40px] overflow-hidden shadow-xl border border-blue-600/20">
        
        {/* Lado da Imagem */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Zqv2DcI8Wny0u5vWe4MstJqrfYSJVlLc8W_y6UhonlqhdIcavCzrQsvO1xygfCdUCNS6b9oowuzywZIDXYmS0bIza4FBdG0ZrJs24cQ89z5Tr1QpVKExIb1YZ6HwcTS74jOtfkeB23xdqr0mE_LMTlGh2W9XmJXcHWABNWnnBtmZyeUCtqD3XRP2XWBsqUoXDilVH-pF6tVStdn3dimfhxcu9LdHwjysH8dR6EuKkANogXMPcRWeZoxxbJjnDxqSAMa8-OaroZtx" 
            alt="Folheto Mensal de Peças" 
          />
        </div>

        {/* Lado do Texto com fundo Azul */}
        <div className="w-full md:w-1/2 p-16 text-white flex flex-col justify-center gap-6">
          <div>
            <span className="font-label-caps text-white/70 uppercase text-xs font-bold tracking-[0.2em]">
              Oportunidades
            </span>
            <h2 className="font-h1 text-white mt-4 text-4xl font-black leading-tight">
              Folheto Mensal
            </h2>
          </div>
          
          <p className="font-body-lg text-white/90 text-base max-w-lg leading-relaxed">
            Descubra as promoções exclusivas deste mês em óleos, filtros, sistemas de travagem e muito mais. Não perca os descontos de até 40% em marcas selecionadas.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {/* Botão Verde de Destaque */}
            <button className="bg-[#008554] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#006b43] transition-all flex items-center gap-3 shadow-lg active:scale-95">
              <span className="material-symbols-outlined text-lg">download</span> 
              Download PDF
            </button>
            
            {/* Botão Vazado Branco */}
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all active:scale-95">
              Ver Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;