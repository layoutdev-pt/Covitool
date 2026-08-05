import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../services/supabase";

// Função auxiliar para formatar a data (AAAA-MM-DD para DD/MM/AAAA)
const formatarData = (dataStr: string) => {
  if (!dataStr) return "";
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
};

export default function Folhetos() {
  const [folhetos, setFolhetos] = useState<any[]>([]);
  const [tagAtiva, setTagAtiva] = useState<string>("Todas");
  const [loading, setLoading] = useState<boolean>(true);

  // Ir buscar os dados reais ao Supabase quando a página carrega
  useEffect(() => {
    const fetchFolhetos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("folhetos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar folhetos:", error);
      } else {
        setFolhetos(data || []);
      }
      setLoading(false);
    };

    fetchFolhetos();
  }, []);

  // Lógica para extrair as tags únicas dinamicamente dos dados da BD
  const todasAsTags = useMemo(() => {
    const tags = new Set<string>();
    folhetos.forEach((folheto) => {
      if (folheto.tags && Array.isArray(folheto.tags)) {
        folheto.tags.forEach((tag: string) => tags.add(tag));
      }
    });
    return ["Todas", ...Array.from(tags)];
  }, [folhetos]);

  // Filtrar pela tag selecionada
  const folhetosFiltrados = folhetos.filter(
    (folheto) =>
      tagAtiva === "Todas" || (folheto.tags && folheto.tags.includes(tagAtiva)),
  );

  return (
    <main className="flex flex-col gap-12 pb-16 bg-gray-50 min-h-screen">
      {/* Cabeçalho da Página em Azul Marinho */}
      <section className="bg-[#153A81] pt-40 pb-20 px-4 text-center text-white flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-lime rounded-full blur-[140px] opacity-20"></div>

        <h1 className="text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">
          Catálogos e Folhetos
        </h1>
        <p className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-2xl relative z-10 font-light">
          Consulte e faça o download dos nossos materiais técnicos, guias de
          instalação e catálogos das melhores marcas do mercado.
        </p>
      </section>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#153A81]">
          <span className="material-symbols-outlined animate-spin text-5xl mb-4 text-[#B5D318]">
            refresh
          </span>
          <p className="font-bold text-lg">A carregar catálogos...</p>
        </div>
      ) : (
        <>
          {/* Sistema de Filtros Dinâmico (Verde Lima) */}
          <section className="container mx-auto px-4 flex flex-wrap justify-center gap-3 -mt-6 relative z-20">
            {todasAsTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagAtiva(tag)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  tagAtiva === tag
                    ? "bg-brand-lime text-[#153A81] scale-105 shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#B5D318] hover:text-[#153A81]"
                }`}
              >
                {tag}
              </button>
            ))}
          </section>

          {/* Grelha de Folhetos */}
          <section className="container mx-auto px-4 mt-4">
            {folhetosFiltrados.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                  search_off
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  Nenhum folheto encontrado
                </h3>
                <p className="text-gray-500 mt-2">
                  Ainda não existem folhetos publicados para esta categoria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {folhetosFiltrados.map((folheto) => (
                  <div
                    key={folheto.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:border-[#B5D318] transition-all duration-300"
                  >
                    {/* Capa do Folheto */}
                    <div className="relative aspect-[3/4] bg-[#f8f9fa] overflow-hidden p-6 flex items-center justify-center">
                      <img
                        src={folheto.capa_url}
                        alt={`Capa de ${folheto.titulo}`}
                        className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500"
                      />

                      {/* Overlay com botões */}
                      <div className="absolute inset-0 bg-[#153A81]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-10">
                        <a
                          href={folheto.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#153A81] hover:scale-110 hover:bg-gray-100 transition-transform shadow-lg"
                          title="Ver Online"
                        >
                          <span className="material-symbols-outlined text-2xl">
                            visibility
                          </span>
                        </a>
                        <a
                          href={folheto.pdf_url}
                          download
                          className="w-14 h-14 bg-brand-lime rounded-full flex items-center justify-center text-[#153A81] hover:scale-110 hover:bg-[#a1bc12] transition-transform shadow-lg"
                          title="Download PDF"
                        >
                          <span className="material-symbols-outlined text-2xl">
                            download
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Informação e Resumo */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {folheto.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-[#153A81]/5 text-[#153A81] text-xs font-bold rounded-md border border-[#153A81]/10 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight group-hover:text-[#153A81] transition-colors">
                        {folheto.titulo}
                      </h3>

                      {/* NOVO: Condições (Validade e IVA) */}
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] uppercase tracking-wider">
                        <span
                          className={`px-2 py-1 rounded-md font-bold shadow-sm ${folheto.tipo_iva === "sem_iva" ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-green-100 text-green-700 border border-green-200"}`}
                        >
                          {folheto.tipo_iva === "sem_iva"
                            ? "Preços S/ IVA"
                            : "Preços C/ IVA"}
                        </span>

                        {folheto.validade && (
                          <span className="text-gray-500 font-bold flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 shadow-sm">
                            <span className="material-symbols-outlined text-[14px]">
                              event
                            </span>
                            Até {formatarData(folheto.validade)}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                        {folheto.resumo}
                      </p>

                      <a
                        href={folheto.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto w-full py-3.5 border-2 border-gray-100 bg-gray-50 text-center rounded-xl font-bold text-gray-600 group-hover:bg-[#153A81] group-hover:border-[#153A81] group-hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-xl">
                          auto_stories
                        </span>
                        Ler Online
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
