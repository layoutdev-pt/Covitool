import React, { useState } from 'react';
import IMG_1 from '@/assets/fotos/1-15.webp';
import IMG_2 from '@/assets/fotos/1-5.webp';
import IMG_3 from '@/assets/fotos/1-4.webp';

const services = [
  {
    id: 1,
    title: "Equipamento Industrial",
    description: "Representamos as melhores marcas internacionais de ferramentas e máquinas para a indústria moderna.",
    icon: "precision_manufacturing",
    image: IMG_1
  },
  {
    id: 2,
    title: "Logística Avançada",
    description: "Os nossos 500m² de área de armazenamento garantem stock imediato para as suas necessidades mais urgentes.",
    icon: "inventory_2",
    image: IMG_2
  },
  {
    id: 3,
    title: "Entrega Rápida",
    description: "Serviço de distribuição otimizado para garantir que os seus projetos nunca fiquem parados.",
    icon: "local_shipping",
    image: IMG_3
  }
];

const ServicosAccordion: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [bgImageId, setBgImageId] = useState<number>(1);

  const handlePanelClick = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      setBgImageId(id);
    }
  };

  return (
    <section className="container mx-auto px-4 mt-8 mb-16">      
      
      {/* Dica visual para usar o acordeão */}
      <div className="mb-4 flex justify-end select-none">
        <div className="hidden md:flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <span className="material-symbols-outlined text-sm">touch_app</span>
          <span className="text-xs font-bold uppercase tracking-wider">Selecione para expandir</span>
        </div>
      </div>

      <div className="relative w-full h-[800px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-[40px] shadow-2xl">
        {/* Background Image Layer (Global) */}
        {services.map((val) => (
          <div 
            key={`bg-${val.id}`}
            className={`absolute inset-0 z-0 transition-opacity duration-300 ease-out ${
              bgImageId === val.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={val.image} 
              alt={val.title} 
              className="w-full h-full object-cover opacity-60 md:opacity-90" 
            />
            {/* Overlay Escuro para melhor leitura de fundo */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/30"></div>
          </div>
        ))}

        {/* Panels Layer */}
        <div className="absolute inset-0 z-10 flex flex-col md:flex-row w-full h-full">
          {services.map((item, index) => {
            const isActive = activeId === item.id;
            const isLast = index === services.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => handlePanelClick(item.id)}
                className={`
                  group cursor-pointer transition-colors duration-300 ease-out overflow-hidden relative flex-1
                  ${!isLast ? 'border-b md:border-b-0 md:border-r border-white/20' : ''}
                  ${isActive ? 'bg-brand-blue text-white' : 'bg-transparent hover:bg-black/20 text-white'}
                `}
              >
                {/* Active Content */}
                <div 
                  className={`absolute inset-0 flex flex-col px-6 pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12 justify-end transition-opacity duration-300 ${
                    isActive ? 'opacity-100 z-10 delay-100' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <span className="material-symbols-outlined text-brand-lime text-5xl md:text-6xl mb-4">{item.icon}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
                    {item.description}
                  </p>
                </div>

                {/* Inactive Content */}
                <div 
                  className={`absolute inset-0 flex flex-col px-6 pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12 justify-end items-start transition-opacity duration-200 ${
                    !isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <span className="material-symbols-outlined text-7xl md:text-8xl lg:text-[100px] leading-none text-white/70 mb-2 md:mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicosAccordion;
