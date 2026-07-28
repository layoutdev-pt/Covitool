import React from 'react';

const HeroSobreNos: React.FC = () => {
  return (
    <section className="bg-brand-blue pt-16 pb-20 px-4 text-center text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime rounded-full blur-[120px] opacity-20"></div>
      
      <span className="text-brand-lime text-sm md:text-base font-black tracking-widest uppercase mb-4 relative z-10">
        Experiência e Rigor desde 2007
      </span>
      <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight relative z-10">
        A sua parceira de confiança em ferragens e ferramentas industriais.
      </h1>
    </section>
  );
};

export default HeroSobreNos;
