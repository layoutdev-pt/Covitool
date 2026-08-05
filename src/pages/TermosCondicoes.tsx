import React from "react";

export default function TermosCondicoes() {
  return (
    <main className="pt-1 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black text-brand-blue mb-2 tracking-tight">
            Termos e Condições de Utilização
          </h1>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Última atualização: 29 de julho de 2026
          </p>

          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl mb-8">
              <ul className="text-sm space-y-1">
                <li>
                  <strong>Website:</strong> www.covitool.pt
                </li>
                <li>
                  <strong>Entidade Responsável:</strong> Covitool - Comércio de
                  Máquinas e Ferramentas Profissionais, Lda
                </li>
                <li>
                  <strong>NIPC:</strong> 508 061 296
                </li>
                <li>
                  <strong>Morada:</strong> Parque Industrial da Covilhã Lote
                  C4-B, Apartado 553, 6200-027 Canhoso - Covilhã
                </li>
                <li>
                  <strong>Contactos:</strong> covitool@sapo.pt | +351 275 322
                  030 (Chamada para a rede fixa nacional)
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              1. Objeto e Âmbito
            </h3>
            <p>
              O presente documento estabelece as regras que regulam o acesso e a
              utilização do website www.covitool.pt. Ao navegar nesta página, o
              utilizador aceita integralmente os presentes Termos e Condições.
              Este website funciona exclusivamente como um catálogo digital
              informativo, não sendo possível realizar compras, pagamentos ou
              celebração de contratos de venda online através da plataforma.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              2. Informações de Produtos e Preços (Isenção de Responsabilidade)
            </h3>
            <p>
              O website apresenta produtos em evidência, catálogos e folhetos. A
              Covitool envida todos os esforços para que a informação
              apresentada seja exata. No entanto, alertamos para o seguinte:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Preços e Características:</strong> Os preços
                apresentados (ex: 139,95 €) e as descrições técnicas dos
                produtos têm um caráter meramente indicativo e orientador.
              </li>
              <li>
                <strong>Erros e Atualizações:</strong> A informação apresentada
                no website pode conter erros tipográficos, falhas de atualização
                de stock ou incorreções nos preços de venda ao público.
              </li>
              <li>
                <strong>Validação:</strong> O preço final, a disponibilidade do
                artigo e as condições de venda deverão ser sempre confirmados
                presencialmente no nosso showroom ou através de contacto direto
                com a nossa equipa comercial (via e-mail, telefone ou WhatsApp).
              </li>
            </ul>
            <p className="font-medium bg-red-50 text-red-700 p-4 rounded-xl mt-4 border border-red-100">
              A Covitool não assume qualquer responsabilidade por eventuais
              prejuízos decorrentes de erros de informação no website.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              3. Ligações a Plataformas Externas
            </h3>
            <p>
              O nosso website disponibiliza botões de contacto direto que
              reencaminham o utilizador para a plataforma WhatsApp, bem como
              mapas de localização fornecidos pelo Google Maps. A utilização
              destes serviços de terceiros rege-se pelos termos e políticas de
              privacidade das respetivas plataformas, não tendo a Covitool
              controlo sobre o tratamento de dados realizado por estas
              entidades.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              4. Propriedade Intelectual
            </h3>
            <p>
              Todo o conteúdo do website (textos, design e organização) pertence
              à Covitool Lda. Os logótipos e imagens representativos das marcas
              comercializadas e expostas no nosso portfólio (como Bosch, DeWalt,
              Makita, SKF, entre outras) são propriedade exclusiva dos
              respetivos fabricantes e detentores das marcas. O acesso aos
              catálogos em formato PDF destina-se apenas a consulta técnica
              ("Ler Online" ou download), sendo proibida a sua alteração ou uso
              para fins ilícitos.
            </p>

            <h3 className="text-xl font-bold text-brand-blue mt-8 mb-3">
              5. Resolução de Litígios
            </h3>
            <p>
              Em caso de litígio decorrente da interpretação destes Termos, é
              competente o tribunal da Comarca da Covilhã. Em caso de litígio de
              consumo, o consumidor pode recorrer à seguinte Entidade de
              Resolução Alternativa de Litígios (RAL):
            </p>
            <p className="font-bold">
              CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos
              de Consumo (www.cniacc.pt / cniacc@fd.unl.pt).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
