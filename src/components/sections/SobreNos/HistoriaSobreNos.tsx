import React from 'react';
import HISTORIA_IMG from '@/assets/fotos/1.webp';

const HistoriaSobreNos: React.FC = () => {
  return (
    <section className="container mx-auto px-4 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-[40px] overflow-hidden shadow-lg group">
          <img src={HISTORIA_IMG} alt="A Nossa História" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        
        <div>
          <h2 className="text-4xl text-brand-blue mb-6 font-black tracking-tight">A Nossa História</h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            Fundada em 2007 por Nuno Costa e Luis Miguel Simões, a Covitool Lda. é o resultado de décadas de experiência no setor de acessórios industriais, máquinas e ferramentas.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Ao longo dos anos, consolidámo-nos como uma referência no mercado nacional, focando na importação e distribuição de produtos que garantem a máxima eficiência aos nossos clientes. O nosso compromisso com a qualidade técnica e o apoio especializado define quem somos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistoriaSobreNos;
