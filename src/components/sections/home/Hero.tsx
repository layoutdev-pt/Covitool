import React from 'react';

const Hero: React.FC = () => {
  return (
    /* px-0 e pt-0 fazem a imagem encostar no topo e nas laterais se desejar, 
       ou mantenha px-8 para o efeito de "moldura" que está na sua imagem */
    <section className="relative w-full px-0 pt-0 pb-16">
      
      {/* Container Principal: Removido arredondamento superior para não vazar branco no topo */}
      <div className="relative h-[85vh] md:h-[750px] w-full max-w-[1440px] mx-auto overflow-hidden rounded-b-[40px] shadow-2xl">
        
        {/* Imagem de Fundo conforme a sua referência */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGuIzDHOS_gukhkr7sW6_gv-MSORT9ENSrwZRHl5Z1NoDd762IXCe9l3yyZpZWaFZSAoaHgFBo4Z5etu2XMw3kUt4HbW7meBHHp0bxnTtHmw18Sg1O2mivSUEv3U70-kPMBwappyfxaN24mjwGnq7u1vyGiLca8C5UjyshRPF9JRTfZtftnVnO1SiC3x331k0Ov7cxjvLyIMlfrUd6kHQpt89GHWi59yNkPL3MBSHB8YhiFKq1TWAt6-Q9YzRKBm0anCAn7MLKuWV3')" 
          }}
        >
          {/* Gradiente para garantir que o texto branco seja lido sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Conteúdo: pt-32 empurra apenas o texto para baixo da Navbar */}
        <div className="relative h-full px-12 md:px-24 flex flex-col justify-center items-start pt-32">
          <h1 className="font-h1 text-white text-5xl md:text-7xl max-w-3xl mb-6 font-black leading-[1.1]">
            Peças & Acessórios de <br/> Alta Performance
          </h1>
          <p className="font-body-lg text-white/80 max-w-xl mb-10 text-lg leading-relaxed">
            Especialistas em componentes premium para veículos que exigem o melhor em tecnologia, segurança e durabilidade.
          </p>
          
          <button className="bg-[#008554] text-white px-10 py-4 rounded-full font-bold hover:bg-[#006b43] transition-all scale-100 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/30">
            Explorar Catálogo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;