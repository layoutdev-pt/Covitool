import React from 'react';

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário de contacto enviado!");
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Lado Esquerdo: Informações de Contacto da Imagem */}
        <div className="space-y-10">
          <div>
            <h2 className="font-h2 text-[#1e293b] text-4xl font-extrabold mb-6">Fale Connosco</h2>
            <p className="font-body-lg text-gray-500 text-base leading-relaxed max-w-md">
              Tem dúvidas sobre uma peça específica? A nossa equipa de especialistas está pronta para prestar todo o apoio técnico necessário.
            </p>
          </div>

          <div className="space-y-8 pt-10 border-t border-gray-100">
            {/* Ligue-nos */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#004BFF] transition-colors group-hover:bg-[#004BFF] group-hover:text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl font-light">call</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Ligue-nos</p>
                <p className="text-[#1e293b] font-bold text-lg">+351 800 123 456</p>
              </div>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#004BFF] transition-colors group-hover:bg-[#004BFF] group-hover:text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl font-light">mail</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">E-mail</p>
                <p className="text-[#1e293b] font-bold text-lg">suporte@autoparts-premium.pt</p>
              </div>
            </div>

            {/* Localização Exata da Imagem */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#004BFF] transition-colors group-hover:bg-[#004BFF] group-hover:text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl font-light">location_on</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Localização</p>
                <p className="text-[#1e293b] font-bold text-lg">Parque Industrial, Lisboa, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário com Espaçamento Organizado */}
        <div className="bg-white p-12 rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[#1e293b] text-xs font-bold ml-1 uppercase tracking-wider">Nome</label>
                <input 
                  className="w-full bg-[#f8f9fb] border border-transparent focus:border-[#004BFF] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
                  placeholder="Seu nome" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#1e293b] text-xs font-bold ml-1 uppercase tracking-wider">E-mail</label>
                <input 
                  className="w-full bg-[#f8f9fb] border border-transparent focus:border-[#004BFF] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
                  placeholder="seu@email.com" 
                  type="email" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] text-xs font-bold ml-1 uppercase tracking-wider">Contacto</label>
              <input 
                className="w-full bg-[#f8f9fb] border border-transparent focus:border-[#004BFF] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
                placeholder="+351 ..." 
                type="tel" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] text-xs font-bold ml-1 uppercase tracking-wider">Mensagem</label>
              <textarea 
                className="w-full bg-[#f8f9fb] border border-transparent focus:border-[#004BFF] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none resize-none text-sm" 
                placeholder="Como podemos ajudar?" 
                rows={4}
              ></textarea>
            </div>

            <button 
              className="w-full bg-[#008554] text-white py-4 rounded-full font-bold text-sm hover:bg-[#006b43] transition-all shadow-lg mt-4 active:scale-[0.98]" 
              type="submit"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;