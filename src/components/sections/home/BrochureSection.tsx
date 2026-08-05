import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase'; // Ajusta o caminho se necessário

const BrochureSection: React.FC = () => {
  const [destaque, setDestaque] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestaque = async () => {
      setLoading(true);
      // Vamos buscar apenas o último destaque adicionado
      const { data, error } = await supabase
        .from('destaque_mensal')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Erro ao carregar destaque mensal:", error);
      } else if (data && data.length > 0) {
        setDestaque(data[0]);
      }
      setLoading(false);
    };

    fetchDestaque();
  }, []);

  // Se estiver a carregar ou se não houver dados, não renderiza a secção
  if (loading || !destaque) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Fundo totalmente Verde Lima vibrante */}
      <div className="bg-brand-lime rounded-[40px] overflow-hidden flex flex-col lg:flex-row items-center shadow-lg relative">
        
        {/* Padrão decorativo subtil no fundo */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#153A81_1px,transparent_1px)] bg-size-[20px_20px]"></div>

        <div className="w-full lg:w-1/2 p-12 lg:p-16 text-brand-blue relative z-10">
          <span className="bg-brand-blue text-brand-lime px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-block shadow-sm">
            {destaque.etiqueta}
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {destaque.titulo}
          </h2>
          <p className="text-brand-blue/80 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg">
            {destaque.descricao}
          </p>
          
          <div className="flex flex-wrap gap-4">
            {/* Botão de Download */}
            <a href={destaque.pdf_url} download className="bg-brand-blue hover:bg-[#0d2657] text-brand-lime px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span className="material-symbols-outlined text-xl">download</span>
              Download PDF
            </a>
            {/* Botão de Ver Online */}
            <a href={destaque.pdf_url} target="_blank" rel="noreferrer" className="bg-transparent border-2 border-brand-blue hover:bg-brand-blue hover:text-brand-lime text-brand-blue px-8 py-4 rounded-full font-bold transition-all">
              Ver Online
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-12 flex justify-center items-center relative z-10 min-h-100">
          {/* Efeito de brilho escuro para dar profundidade à capa */}
          <div className="absolute bg-brand-blue w-64 h-64 rounded-full blur-[90px] opacity-20"></div>
          <img 
            src={destaque.capa_url} 
            alt={destaque.titulo} 
            className="relative z-10 w-64 md:w-80 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white"
          />
        </div>

      </div>
    </section>
  );
};

export default BrochureSection;