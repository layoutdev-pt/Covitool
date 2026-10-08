import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NaoEncontrado() {
  return (
    <main className="pt-1 pb-24 bg-gray-50 min-h-[70vh] flex items-center">
      <Helmet>
        <title>Página não encontrada | Covitool</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-3xl w-full mx-auto px-4">
        <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-gray-100 text-center relative overflow-hidden">
          {/* Efeito visual no fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime rounded-full blur-[90px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

          <p className="relative z-10 text-[96px] md:text-[140px] font-black leading-none tracking-tighter text-brand-blue">
            4<span className="text-brand-lime">0</span>4
          </p>

          <h1 className="relative z-10 text-2xl md:text-3xl font-black text-brand-blue mt-4 mb-3 tracking-tight">
            Página não encontrada
          </h1>
          <p className="relative z-10 text-gray-500 font-medium max-w-md mx-auto mb-10">
            A página que procura não existe ou foi movida. Utilize os atalhos
            abaixo para continuar a navegar no nosso site.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-brand-blue hover:bg-[#0d2657] text-brand-lime px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Voltar à Página Inicial
            </Link>
            <Link
              to="/folhetos"
              className="bg-gray-100 hover:bg-gray-200 text-brand-blue px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">auto_stories</span>
              Ver Folhetos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
