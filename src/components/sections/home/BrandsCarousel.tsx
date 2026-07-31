import React from 'react';
import { Link } from 'react-router-dom';

import logoWerku from '@/assets/logos_marcas/werku.webp';
import logoStanley from '@/assets/logos_marcas/Stanley.webp';
import logoSkil from '@/assets/logos_marcas/skil.webp';
import logoKaercher from '@/assets/logos_marcas/Kaercher.webp';
import logoGedore from '@/assets/logos_marcas/gedore.webp';
import logoDewalt from '@/assets/logos_marcas/dewalt.webp';
import logoChemitool from '@/assets/logos_marcas/chemitool.webp';
import logoBosch from '@/assets/logos_marcas/Bosch.webp';
import logoBeta from '@/assets/logos_marcas/beta.webp';
import logoAeg from '@/assets/logos_marcas/aeg.webp';
import logo3M from '@/assets/logos_marcas/3M.webp';

const brands = [
  { name: 'werku', logo: logoWerku },
  { name: 'Stanley', logo: logoStanley },
  { name: 'skil', logo: logoSkil },
  { name: 'Kaercher', logo: logoKaercher },
  { name: 'gedore', logo: logoGedore },
  { name: 'dewalt', logo: logoDewalt },
  { name: 'chemitool', logo: logoChemitool },
  { name: 'Bosch', logo: logoBosch },
  { name: 'beta', logo: logoBeta },
  { name: 'aeg', logo: logoAeg },
  { name: '3M', logo: logo3M },
];

const BrandsCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#153A81] uppercase tracking-wider">
          Trabalhamos com as melhores marcas
        </h2>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Gradients para suavizar a entrada e saída (fades laterais) */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Contentor que vai ser animado na totalidade (-50%) */}
        <div 
          className="flex w-max"
          style={{ animation: 'scroll 75s linear infinite' }}
        >
          {/* Primeira lista de marcas */}
          <div className="flex shrink-0 items-center">
            {brands.map((brand, index) => (
              <div 
                key={`first-${index}`} 
                className="mx-8 md:mx-12 flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={brand.logo} 
                  alt={`Logotipo da ${brand.name}`} 
                  className="h-12 md:h-16 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Segunda lista (cópia exata para o loop não ter saltos) */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {brands.map((brand, index) => (
              <div 
                key={`second-${index}`} 
                className="mx-8 md:mx-12 flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={brand.logo} 
                  alt={`Logotipo da ${brand.name}`} 
                  className="h-12 md:h-16 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 flex justify-center">
        <Link 
          to="/marcas" 
          className="inline-flex items-center gap-2 bg-[#B5D318] hover:bg-[#a1bc12] text-[#153A81] px-8 py-3 rounded-full font-bold text-lg transition-all shadow-md hover:-translate-y-1"
        >
          Ver Todas as Marcas
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </Link>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .flex[style*="animation"] {
            animation-duration: 120s !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandsCarousel;
