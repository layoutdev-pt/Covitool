import React from "react";

export default function PoliticaCookies() {
  return (
    <main className="pt-1 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black text-brand-blue mb-2 tracking-tight">
            Política de Cookies
          </h1>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Última atualização: 29 de julho de 2026
          </p>

          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6">
            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              1. O que são Cookies?
            </h3>
            <p>
              Cookies são pequenos ficheiros de texto armazenados no seu
              computador, smartphone ou tablet através do navegador de internet
              (browser), utilizados para garantir o funcionamento técnico e
              seguro da página que está a visitar.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              2. O que NÃO utilizamos
            </h3>
            <p>
              O website da Covitool foi desenvolvido com uma política rigorosa
              de respeito pela privacidade, não utilizando qualquer ferramenta
              de rastreio de navegação. Desta forma, declaramos que este
              website:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>NÃO</strong> utiliza cookies estatísticos ou analíticos
                (como Google Analytics).
              </li>
              <li>
                <strong>NÃO</strong> utiliza cookies de publicidade direcionada,
                marketing ou campanhas de retargeting.
              </li>
              <li>
                <strong>NÃO</strong> utiliza pixéis de redes sociais nem
                partilha o seu comportamento de navegação.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#153A81] mt-8 mb-3">
              3. Que Cookies utilizamos?
            </h3>
            <p>
              Para assegurar o funcionamento do catálogo e das ferramentas de
              contacto, utilizamos apenas as seguintes categorias:
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Cookies Estritamente Necessários (Próprios):</strong>{" "}
                São ficheiros técnicos indispensáveis para a segurança da
                plataforma e gestão de sessões (por exemplo, para registar se já
                aceitou o banner de cookies e para permitir o processamento
                seguro e o envio das mensagens através do nosso formulário "Fale
                Connosco", prevenindo spam). Sendo essenciais, a lei não exige o
                consentimento prévio para a sua instalação.
              </li>
              <li>
                <strong>Cookies de Terceiros (Google Maps):</strong> O nosso
                website integra um mapa fornecido pela Google para ilustrar a
                localização do nosso showroom. Ao carregar a página, a Google
                instala autonomamente cookies de sessão e persistentes (tais
                como NID, CONSENT ou SOCS). Estes ficheiros servem para a Google
                memorizar as suas preferências de mapa, níveis de zoom e
                recolher dados agregados de utilização técnica. A gestão,
                finalidade e prazos de conservação destes dados são da inteira
                responsabilidade da Google, aplicando-se a respetiva Política de
                Privacidade.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#153A81] mt-8 mb-3">
              4. Gestão e Desativação de Cookies
            </h3>
            <p>
              O utilizador tem total controlo sobre a gestão de cookies nas
              definições de privacidade do seu próprio navegador (Google Chrome,
              Safari, Microsoft Edge, Mozilla Firefox, etc.). Pode optar por
              bloquear cookies de terceiros associados ao Google Maps.
              Alertamos, contudo, que o bloqueio forçado dos nossos cookies
              essenciais poderá impedir o funcionamento correto do aviso de
              cookies ou o envio seguro do formulário de contacto.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
