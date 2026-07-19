import React from 'react';

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário de contacto enviado!");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-xl border border-gray-100 w-full">
        
        {/* Cabeçalho do Formulário */}
        <div className="text-center mb-10">
          <h2 className="font-h2 text-[#153A81] text-4xl font-black mb-4 tracking-tight">Fale Connosco</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Tem dúvidas sobre uma peça específica? A nossa equipa de especialistas está pronta para prestar todo o apoio técnico necessário.
          </p>
        </div>
        
        {/* Formulário de Envio de Mensagem */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#153A81] text-xs font-bold ml-1 uppercase tracking-wider">Nome</label>
              <input 
                className="w-full bg-gray-50 border border-transparent focus:border-[#B5D318] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
                placeholder="Seu nome" 
                type="text" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#153A81] text-xs font-bold ml-1 uppercase tracking-wider">E-mail</label>
              <input 
                className="w-full bg-gray-50 border border-transparent focus:border-[#B5D318] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
                placeholder="seu@email.com" 
                type="email" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[#153A81] text-xs font-bold ml-1 uppercase tracking-wider">Contacto</label>
            <input 
              className="w-full bg-gray-50 border border-transparent focus:border-[#B5D318] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm" 
              placeholder="+351 ..." 
              type="tel" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#153A81] text-xs font-bold ml-1 uppercase tracking-wider">Mensagem</label>
            <textarea 
              className="w-full bg-gray-50 border border-transparent focus:border-[#B5D318] focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none resize-none text-sm" 
              placeholder="Como podemos ajudar?" 
              rows={5}
              required
            ></textarea>
          </div>

          <div className="flex justify-center mt-8 pt-4">
            <button 
              className="bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] font-black py-4 px-12 rounded-full transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto" 
              type="submit"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default ContactForm;