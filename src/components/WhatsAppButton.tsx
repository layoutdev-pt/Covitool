import React, { useState } from 'react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-manrope pointer-events-none">
      
      {/* Card Flutuante */}
      <div 
        className={`mb-4 w-72 sm:w-80 bg-brand-blue rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Cabeçalho Verde */}
        <div className="bg-brand-lime p-5 relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-sm">close</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <WhatsAppIcon className="w-6 h-6 text-brand-lime" />
            </div>
            <div className="pr-6">
              <h4 className="text-white font-bold text-lg leading-tight">Covitool</h4>
              <p className="text-white/90 text-sm mt-0.5 leading-tight">
                Envie-nos as suas questões e dúvidas.
              </p>
            </div>
          </div>
        </div>

        {/* Corpo Escuro (Azul) */}
        <div className="p-5">
          <a 
            href="https://wa.link/024kt6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-4 border border-white/10 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <WhatsAppIcon className="w-6 h-6 text-brand-lime" />
              <span className="text-white font-bold">Covitool</span>
            </div>
            <span className="material-symbols-outlined text-brand-lime">chevron_right</span>
          </a>
        </div>
      </div>

      {/* Botão Flutuante (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-lime rounded-full shadow-[0_4px_20px_rgba(181,211,24,0.4)] flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 z-50 relative pointer-events-auto"
      >
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
          <WhatsAppIcon className="w-8 h-8" />
        </div>
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
          <span className="material-symbols-outlined text-3xl">close</span>
        </div>
      </button>
      
    </div>
  );
}
