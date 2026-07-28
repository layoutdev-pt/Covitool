import React, { useEffect, useRef, useState } from 'react';

const timelineData = [
  { 
    year: '1995', 
    title: 'A Fundação', 
    description: 'Iniciámos a nossa jornada com a missão de construir infraestruturas sólidas e duradouras, baseadas na confiança e excelência.' 
  },
  { 
    year: '2010', 
    title: 'Expansão e Inovação', 
    description: 'Investimos em tecnologia e talento, alargando a nossa atuação para projetos de maior envergadura e novos mercados.' 
  },
  { 
    year: '2025', 
    title: 'O Futuro', 
    description: 'Lideramos com sustentabilidade e inovação, mantendo o compromisso inabalável com a qualidade que nos define.' 
  }
];

export const Timeline: React.FC = () => {
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
    <section ref={sectionRef} className="w-full bg-surface py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Secção */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-primary uppercase tracking-wider text-sm">
              A Nossa História
            </span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-5xl text-contrast font-bold max-w-2xl leading-tight">
            Conheça a Trajetória <br></br>da Nossa Empresa
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-8">
          {/* Linha Conetora Animada (Desktop) */}
          {/* Linha horizontal Base */}
          <div className="hidden md:block absolute left-[16.66%] w-[66.66%] h-[2px] bg-primary/20 z-0 top-12"></div>
          {/* Linha horizontal Animada */}
          <div 
            className="hidden md:block absolute left-[16.66%] h-[2px] bg-primary z-0 top-12 transition-all duration-[2000ms] ease-linear" 
            style={{ width: isVisible ? '66.66%' : '0%' }}
          ></div>

          {/* Blocos de Anos */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-8">
            {timelineData.map((item, index) => {
              const itemDelay = index * 500;
              return (
              <div 
                key={index} 
                className={`group flex flex-col items-center text-center relative z-10 w-full md:w-1/3 px-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'}`}
                style={{ transitionDelay: `${itemDelay}ms` }}
              >
                {/* Círculo Branco com texto Laranja */}
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border-[6px] border-surface shrink-0 mb-6 md:mb-8 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_var(--color-primary)]">
                  <span className="font-sora text-2xl font-bold text-primary">
                    {item.year}
                  </span>
                </div>

                {/* Conteúdo Tipográfico Escuro */}
                <h3 className="font-sora text-2xl font-bold text-contrast mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-contrast font-normal! leading-relaxed">
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
