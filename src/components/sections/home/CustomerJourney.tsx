import React, { useEffect, useRef } from 'react';

  const passos = [
  {
    id: 1,
    titulo: "Descubra as Nossas Soluções",
    descricao: "Explore as marcas que comercializamos e os folhetos com as novidades no nosso site. Se preferir, ligue-nos diretamente para saber o que temos disponível e pedir aconselhamento.",
    icone: "manage_search",
  },
  {
    id: 2,
    titulo: "Faça a sua Encomenda",
    descricao: "Após escolher o material, faça o seu pedido de forma simples por telefone. Pode optar por levantar as ferramentas na nossa loja física ou solicitar o envio por transportadora.",
    icone: "shopping_cart_checkout",
  },
  {
    id: 3,
    titulo: "Receba o seu Material",
    descricao: "Seja ao nosso balcão na Covilhã ou através da entrega na sua morada, garantimos que a sua encomenda chega até si com a maior brevidade possível para que o trabalho não pare.",
    icone: "local_shipping",
  }
];

const CustomerJourney: React.FC = () => {
  // Referência para guardar as caixas de cada passo
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Configura o observador para detetar quando o elemento entra no ecrã
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona as classes que tornam o elemento visível e na posição original
            entry.target.classList.remove('opacity-0', 'translate-y-16');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.25 } // O efeito dispara quando 25% do elemento estiver visível
    );

    // Começa a observar cada um dos passos
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white w-full py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-24">
          <h2 className="text-[#153A81] text-4xl font-extrabold tracking-tight">Como Trabalhamos</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg">
            Um processo simplificado para que receba as suas peças com total conveniência e confiança.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Linha Vertical Central (Fica à esquerda nos telemóveis e ao centro nos PCs) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#B5D318] to-transparent md:-translate-x-1/2 rounded-full opacity-50"></div>

          <div className="flex flex-col gap-12 md:gap-24 relative">
            {passos.map((passo, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={passo.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  // Estado inicial invisível e empurrado para baixo
                  className="relative flex flex-col md:flex-row items-center w-full opacity-0 translate-y-16 transition-all duration-1000 ease-out group"
                >
                  
                  {/* Ícone no centro da linha */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#153A81] group-hover:border-[#B5D318] z-20 transition-colors duration-500 shadow-xl">
                    <div className="absolute inset-0 bg-[#B5D318] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-[#153A81] group-hover:text-[#B5D318] text-3xl transition-colors relative z-10">
                      {passo.icone}
                    </span>
                  </div>

                  {/* Cartão de Conteúdo (Ziguezague no PC, sempre à direita no telemóvel) */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:ml-auto'}`}>
                    <div className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-[#B5D318]/50 transition-all duration-300 w-full max-w-md relative ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      
                      {/* Pequena seta indicadora a apontar para a linha temporal (Apenas visível em PCs) */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 transform ${isEven ? 'right-0 translate-x-[8px] rotate-45 group-hover:border-[#B5D318]/50 group-hover:border-b-0 group-hover:border-l-0' : 'left-0 -translate-x-[8px] -rotate-[135deg] group-hover:border-[#B5D318]/50 group-hover:border-b-0 group-hover:border-l-0'} transition-colors duration-300 z-10`}></div>


                      <h4 className="text-[#153A81] text-2xl font-bold mb-3 relative z-10">{passo.titulo}</h4>
                      <p className="text-gray-500 leading-relaxed relative z-10">{passo.descricao}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;