import React from 'react';

export default function LocationMap() {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100">
      
      {/* Lado Esquerdo - Informações de Contacto (Azul Marinho) */}
      <div className="bg-[#153A81] text-white p-8 lg:p-12 flex flex-col justify-between w-full lg:w-1/3 relative overflow-hidden">
        
        {/* Detalhe de luz verde no fundo para dar dinâmica */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5D318] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

        <div className="mb-8 relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tight text-white">Venha visitar-nos!</h2>
          <p className="text-blue-200 text-sm font-light">Venha conhecer o nosso showroom e stock.</p>
        </div>

        <div className="flex flex-col gap-4 mb-10 relative z-10">
          
          {/* Morada */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 flex items-start gap-4 hover:border-[#B5D318]/50 transition-colors">
            <div className="text-[#B5D318] mt-1">
              <span className="material-symbols-outlined text-2xl">location_on</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Covitool Lda.</h3>
              <p className="text-sm text-blue-100 leading-relaxed font-light">
                Parque Industrial da Covilhã<br />
                Lote C4-B, 6200-027
              </p>
            </div>
          </div>

          {/* Botão de Telefone - Destaque em Verde Lima */}
          <button className="bg-[#B5D318] hover:bg-[#a1bc12] text-[#153A81] transition-all duration-300 p-5 rounded-2xl flex items-center justify-between group shadow-lg hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-2xl">call</span>
              <div className="flex flex-col items-start">
                <span className="font-black text-lg tracking-wide">+351 275 322 030</span>
                <span className="text-[10px] font-bold text-[#153A81]/70 leading-none mt-1">(Chamada para rede fixa nacional)</span>
              </div>
            </div>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-bold">arrow_forward</span>
          </button>

          {/* Email */}
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-[#B5D318]/50 transition-colors">
            <div className="text-[#B5D318]">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
            <span className="text-blue-100 text-sm font-medium">covitool@sapo.pt</span>
          </div>
        </div>

        {/* Horários */}
        <div className="flex flex-col gap-2 text-xs text-blue-200 border-t border-white/20 pt-6 relative z-10 font-medium tracking-wide">
          <div className="flex justify-between items-center">
            <span>Segunda a Sexta-feira</span>
            <span className="text-right">08:30 às 12:30<br/>14:30 às 18:00</span>
          </div>
          <div className="flex justify-between items-center text-blue-300">
            <span>Sábado e Domingo</span>
            <span>Encerrados</span>
          </div>
        </div>

      </div>

      {/* Lado Direito - Área do Mapa */}
      <div className="relative bg-gray-200 w-full lg:w-2/3 min-h-[450px]">
        {/* Iframe do Google Maps */}
        <iframe 
          title="Mapa de Localização"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.7829320360556!2d-7.485304287857375!3d40.2900854632177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3d2230ce1d6e7b%3A0x15f3f95eae2b8a0f!2sCovitool-Com%C3%A9rcio%20de%20M%C3%A1quinas%20e%20Ferramentas%20Profissionais%20Lda!5e1!3m2!1spt-PT!2spt!4v1784390397660!5m2!1spt-PT!2spt" 
          width="100%" 
          height="100%" 
          style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-90 contrast-125 hover:grayscale-0 transition-all duration-1000"
        ></iframe>

        {/* Card Flutuante - Obter Direções */}
        <div className="absolute bottom-6 right-6 bg-white p-5 rounded-2xl shadow-xl z-10 w-72 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#153A81] text-[#B5D318] p-2.5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">directions_car</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-0.5">Tempo de Viagem</p>
              <p className="font-bold text-[#153A81] text-sm">Parque Ind. Covilhã</p>
            </div>
          </div>
          <button className="w-full bg-[#153A81] hover:bg-[#0d2657] text-white text-sm font-bold py-3 rounded-xl transition-colors shadow-md">
            Obter Direções
          </button>
        </div>
      </div>

    </div>
  );
}