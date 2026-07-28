import React, { useEffect, useRef, useState } from 'react';

const estatisticasData = [
  { 
    value: '19+', 
    title: 'Anos de Experiência', 
    description: 'Quase duas décadas a fornecer as melhores soluções para a indústria, garantindo confiança e solidez em cada parceria.' 
  },
  { 
    value: '500m²', 
    title: 'Exposição e Stock', 
    description: 'Um espaço amplo e otimizado, permitindo-nos ter sempre o equipamento certo disponível para entrega imediata.' 
  },
  { 
    value: '+10k', 
    title: 'Referências de Produtos', 
    description: 'Um catálogo extenso e diversificado, com as melhores marcas mundiais para responder a qualquer desafio.' 
  }
];

const EstatisticasSobreNos: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gray-50 py-16 md:py-24 px-4 md:px-12 lg:px-24 rounded-3xl mt-12 mb-12 shadow-sm">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Secção */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-brand-lime"></div>
            <span className="text-brand-blue uppercase tracking-wider text-sm font-bold">
              A Nossa Força
            </span>
            <div className="h-px w-8 bg-brand-lime"></div>
          </div>
          <h2 className="text-3xl md:text-5xl text-gray-900 font-bold max-w-2xl leading-tight">
            Estatísticas que Falam <br className="hidden md:block" />por Nós
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-8">
          {/* Linha Conetora Animada (Desktop) */}
          {/* Linha horizontal Base */}
          <div className="hidden md:block absolute left-[16.66%] w-[66.66%] h-[2px] bg-brand-blue/10 z-0 top-14"></div>
          {/* Linha horizontal Animada */}
          <div 
            className="hidden md:block absolute left-[16.66%] h-[2px] bg-brand-lime z-0 top-14 transition-all duration-[2000ms] ease-linear" 
            style={{ width: isVisible ? '66.66%' : '0%' }}
          ></div>

          {/* Blocos de Estatísticas */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-8">
            {estatisticasData.map((item, index) => {
              const itemDelay = index * 500;
              return (
              <div 
                key={index} 
                className={`group flex flex-col items-center text-center relative z-10 w-full md:w-1/3 px-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'}`}
                style={{ transitionDelay: `${itemDelay}ms` }}
              >
                {/* Círculo Branco com texto Azul */}
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-[6px] border-gray-50 shrink-0 mb-6 md:mb-8 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_#153A81]">
                  <span className="text-3xl font-black text-brand-blue">
                    {item.value}
                  </span>
                </div>

                {/* Conteúdo Tipográfico Escuro */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstatisticasSobreNos;
