import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase'; // Ajusta o caminho conforme necessário

const FeaturedProducts: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('produtos_destaque')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Erro ao carregar produtos:", error);
      } else {
        setProdutos(data || []);
      }
      setLoading(false);
    };

    fetchProdutos();
  }, []);

  return (
    <section className="bg-[#f8f9fa] py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Cabeçalho */}
        <div className="mb-12">
          <span className="text-[#153A81] text-xs font-black tracking-widest uppercase mb-2 block">
            Destaques
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Produtos em Evidência
          </h2>
        </div>

        {/* Estado de Carregamento */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#153A81]">
            <span className="material-symbols-outlined animate-spin text-5xl mb-4 text-[#B5D318]">refresh</span>
            <p className="font-bold text-lg">A carregar destaques...</p>
          </div>
        ) : produtos.length === 0 ? (
          /* Estado Vazio */
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
            <h3 className="text-xl font-bold text-gray-800">Sem destaques no momento</h3>
            <p className="text-gray-500 mt-2">Os produtos em evidência aparecerão aqui.</p>
          </div>
        ) : (
          /* Grelha Dinâmica */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {produtos.map((produto) => {
              // Verificações condicionais para Preço e Descrição
              const temPreco = produto.preco && produto.preco.trim() !== '';
              const temDescricao = produto.descricao && produto.descricao.trim() !== '';

              return (
                <div key={produto.id} className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                  
                  <div className="bg-gray-100 rounded-2xl h-64 mb-6 overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src={produto.imagem_url} 
                      alt={produto.titulo} 
                      className="object-cover w-full h-full rounded-xl mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Título: Se não houver descrição, o título ganha o flex-grow para empurrar o rodapé para baixo */}
                  <h3 className={`font-bold text-xl text-gray-900 group-hover:text-[#153A81] transition-colors ${!temDescricao ? 'mb-6 flex-grow' : 'mb-2'}`}>
                    {produto.titulo}
                  </h3>
                  
                  {/* Descrição Condicional */}
                  {temDescricao && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                      {produto.descricao}
                    </p>
                  )}
                  
                  {/* Rodapé Condicional (Preço e Botão) */}
                  <div className={`flex items-center mt-auto pt-5 border-t border-gray-100 ${temPreco ? 'justify-between' : 'justify-end'}`}>
                    {temPreco && (
                      <span className="text-[#153A81] font-black text-2xl">{produto.preco}</span>
                    )}
                    

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;