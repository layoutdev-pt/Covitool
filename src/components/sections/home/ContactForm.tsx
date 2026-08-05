import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactForm: React.FC = () => {
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // O '/ajax/' no link do formsubmit permite enviar sem sair da página!
      const response = await fetch(
        "https://formsubmit.co/ajax/covitool@sapo.pt",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (response.ok) {
        setShowSuccessModal(true);
        form.reset(); // Limpa os campos
        setAceitaTermos(false); // Desmarca a checkbox
      } else {
        alert(
          "Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente ou contacte-nos por telefone.",
        );
      }
    } catch (error) {
      alert(
        "Erro de ligação. Por favor, verifique a sua internet e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-1 relative" id="contacto">
      <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-xl border border-gray-100 w-full relative z-10">
        {/* Cabeçalho do Formulário */}
        <div className="text-center mb-10">
          <h2 className="font-h2 text-brand-blue text-4xl font-black mb-4 tracking-tight">
            Fale Connosco
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Tem dúvidas sobre uma peça específica? A nossa equipa de
            especialistas está pronta para prestar todo o apoio técnico
            necessário.
          </p>
        </div>

        {/* Formulário de Envio */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Configurações do FormSubmit */}
          <input
            type="hidden"
            name="_subject"
            value="Novo Contacto via Website Covitool!"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-brand-blue text-xs font-bold ml-1 uppercase tracking-wider">
                Nome
              </label>
              <input
                name="Nome"
                className="w-full bg-gray-50 border border-transparent focus:border-brand-lime focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm"
                placeholder="O seu nome"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-brand-blue text-xs font-bold ml-1 uppercase tracking-wider">
                E-mail
              </label>
              <input
                name="Email"
                className="w-full bg-gray-50 border border-transparent focus:border-brand-lime focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm"
                placeholder="seu@email.com"
                type="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-brand-blue text-xs font-bold ml-1 uppercase tracking-wider">
              Contacto Telefónico
            </label>
            <input
              name="Telefone"
              className="w-full bg-gray-50 border border-transparent focus:border-brand-lime focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none text-sm"
              placeholder="+351 ..."
              type="tel"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-brand-blue text-xs font-bold ml-1 uppercase tracking-wider">
              Mensagem
            </label>
            <textarea
              name="Mensagem"
              className="w-full bg-gray-50 border border-transparent focus:border-brand-lime focus:bg-white transition-all py-4 px-6 rounded-2xl outline-none resize-none text-sm"
              placeholder="Como podemos ajudar?"
              rows={5}
              required
            ></textarea>
          </div>

          {/* CHECKBOX OBRIGATÓRIA */}
          <div className="flex items-start gap-3 mt-4 px-1">
            <input
              type="checkbox"
              id="termos"
              required
              checked={aceitaTermos}
              onChange={(e) => setAceitaTermos(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#B5D318] cursor-pointer shrink-0"
            />
            <label
              htmlFor="termos"
              className="text-sm text-gray-500 leading-relaxed cursor-pointer select-none"
            >
              Compreendo e aceito que os dados fornecidos serão utilizados
              exclusivamente para responder a este contacto, em conformidade com
              a nossa{" "}
              <Link
                to="/politica-de-privacidade"
                className="text-[#153A81] font-bold hover:underline"
              >
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link
                to="/termos-e-condicoes"
                className="text-[#153A81] font-bold hover:underline"
              >
                Termos e Condições
              </Link>
              .
            </label>
          </div>

          <div className="flex justify-center mt-8 pt-4">
            <button
              className={`font-black py-4 px-12 rounded-full transition-all shadow-lg w-full md:w-auto flex items-center justify-center gap-2 ${
                !aceitaTermos
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isSubmitting
                    ? "bg-[#0d2657] text-[#B5D318] opacity-90 cursor-wait"
                    : "bg-[#153A81] hover:bg-[#0d2657] text-[#B5D318] hover:-translate-y-1"
              }`}
              type="submit"
              disabled={!aceitaTermos || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">
                    refresh
                  </span>{" "}
                  A enviar...
                </>
              ) : (
                "Enviar Mensagem"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* POP-UP DE SUCESSO (MODAL) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#153A81]/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-8 md:p-12 max-w-lg w-full shadow-2xl flex flex-col items-center text-center transform scale-100 animate-in zoom-in-95 duration-300">
            {/* Ícone de Sucesso */}
            <div className="w-20 h-20 bg-brand-lime/20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-5xl text-[#B5D318]">
                check_circle
              </span>
            </div>

            <h3 className="text-3xl font-black text-[#153A81] mb-4 tracking-tight">
              Mensagem Recebida!
            </h3>

            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Mensagem enviada com sucesso! Entraremos em contacto consigo
              brevemente.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#153A81] hover:bg-[#0d2657] text-white font-bold py-4 px-10 rounded-full transition-all hover:shadow-lg w-full"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
