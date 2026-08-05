import React from "react";

export default function PoliticaPrivacidade() {
  return (
    <main className="pt-1 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black text-brand-blue mb-2 tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Última atualização: 29 de julho de 2026
          </p>

          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6">
            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              1. O Nosso Compromisso
            </h3>
            <p>
              A Covitool garante o rigoroso cumprimento do Regulamento Geral
              sobre a Proteção de Dados (RGPD) e da legislação portuguesa em
              vigor, assegurando que os dados recolhidos através deste website
              informativo são tratados com total transparência e segurança.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              2. Dados Recolhidos e Finalidade
            </h3>
            <p>
              Como o nosso website não é uma loja online, não recolhemos dados
              de faturação, moradas de envio ou informações bancárias. A recolha
              de dados ocorre estritamente quando o utilizador preenche o
              formulário "Fale Connosco".
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Dados recolhidos:</strong> Nome, E-mail, Contacto
                telefónico e o conteúdo da Mensagem.
              </li>
              <li>
                <strong>Finalidade:</strong> Responder a pedidos de apoio
                técnico, dúvidas sobre peças específicas, orçamentos e
                agilização do contacto comercial.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              3. Tratamento, Alojamento e Partilha de Dados
            </h3>
            <p>
              O nosso website encontra-se alojado nos servidores da entidade On
              Memory, Informática Lda. Os dados submetidos através do formulário
              de contacto não são retidos ou guardados em nenhuma base de dados
              (backoffice) do website. São encaminhados de forma direta e segura
              exclusivamente para a nossa caixa de correio eletrónico
              corporativa (covitool@sapo.pt).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Garantimos que o tratamento das suas mensagens é efetuado apenas
                pela equipa interna da Covitool.
              </li>
              <li>
                Não existe qualquer acesso às suas mensagens por parte da
                agência responsável pelo desenvolvimento e manutenção da
                plataforma.
              </li>
              <li>
                A Covitool compromete-se a não vender, ceder ou partilhar os
                seus dados pessoais com entidades terceiras para fins de
                marketing.
              </li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-xl mt-4">
              <p className="text-sm font-medium">
                <strong>Nota sobre o WhatsApp:</strong> Caso opte por nos
                contactar através do botão de direcionamento para o WhatsApp,
                partilhará o seu número de telefone e perfil diretamente com
                essa plataforma, aplicando-se a Política de Privacidade da Meta
                (WhatsApp).
              </p>
            </div>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              4. Conservação dos Dados
            </h3>
            <p>
              Os dados fornecidos via formulário serão conservados na nossa
              caixa de correio apenas pelo período estritamente necessário para
              dar resposta à sua solicitação técnica ou comercial, sendo
              posteriormente eliminados, a menos que resultem numa relação
              comercial formal contínua.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              5. Os Seus Direitos
            </h3>
            <p>
              O titular dos dados tem o direito de solicitar o acesso, a
              retificação, a limitação ou o apagamento definitivo dos seus dados
              pessoais. Para exercer estes direitos, deverá contactar-nos
              através do e-mail: <strong>covitool@sapo.pt</strong>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
