import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full px-4 pt-2 pb-16 bg-gray-50">
      {/* Container arredondado em todos os cantos (40px) */}
      <div className="relative h-[85vh] md:h-[750px] w-full max-w-[1440px] mx-auto overflow-hidden rounded-[40px] shadow-2xl">
        
        {/* VÍDEO DE FUNDO */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="videos/covitool_vid_compressed.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#153A81]/90 via-[#153A81]/50 to-transparent"></div>

        <div className="relative h-full px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-center items-start">
          <h1 className="font-h1 text-white text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-4 sm:mb-6 font-black leading-[1.15] sm:leading-[1.1]">
            Máquinas, ferramentas e acessórios industriais de <br /> <span className="text-[#B5D318]">Alta Qualidade</span>
          </h1>
          <p className="font-body-lg text-white/90 max-w-2xl mb-8 sm:mb-10 text-lg sm:text-xl leading-relaxed font-light">
            Especialistas em equipamentos de alta performance para trabalhos que exigem o melhor em precisão, segurança e durabilidade.
          </p>
          
          <Link to="/sobre-nos#contacto" className="inline-flex items-center gap-2 sm:gap-3 bg-[#B5D318] hover:bg-[#a1bc12] text-[#153A81] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all shadow-xl hover:-translate-y-1">
            <span className="material-symbols-outlined text-xl sm:text-2xl">support_agent</span>
            Fale com um Especialista
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;