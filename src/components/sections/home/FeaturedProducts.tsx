import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../services/supabase'; // Ajusta o caminho conforme necessário

const FeaturedProducts: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Referências para a lógica de arrastar (Drag to Scroll)
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('produtos_destaque')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao carregar produtos:", error);
      } else {
        setProdutos(data || []);
      }
      setLoading(false);
    };

    fetchProdutos();
  }, []);

  // --- FUNÇÕES DE ARRASTAR (DRAG TO SCROLL) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    // Captura a posição inicial do clique e a posição atual do scroll
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    // Desativa o "snap" temporariamente para um deslize perfeito com o rato
    carouselRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.scrollSnapType = 'x mandatory';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.scrollSnapType = 'x mandatory';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault(); // Previne comportamentos padrão indesejados
    
    // Calcula a distância do movimento
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiplicador para a velocidade do arrasto
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="bg-[#f8f9fa] py-24 overflow-hidden">
      
      {/* CSS embutido para esconder a barra de scroll padrão */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Cabeçalho */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 select-none">
          <div>
            <span className="text-[#153A81] text-xs font-black tracking-widest uppercase mb-2 block">
              Destaques
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Produtos em Evidência
            </h2>
          </div>

          {/* Dica visual para usar o carrossel */}
          {produtos.length > 3 && (
            <div className="hidden md:flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="material-symbols-outlined text-sm">swipe</span>
              <span className="text-xs font-bold uppercase tracking-wider">Deslize para ver mais</span>
            </div>
          )}
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
          
          /* CARROSSEL COM MECÂNICA DE DRAG ADICIONADA */
          <div 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {produtos.map((produto) => {
              const temPreco = produto.preco && produto.preco.trim() !== '';
              const temDescricao = produto.descricao && produto.descricao.trim() !== '';
              const temMarca = produto.marca && produto.marca.trim() !== ''; 

              return (
                <div key={produto.id} className="w-[85vw] sm:w-[320px] md:w-[380px] snap-start shrink-0 bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                  
                  {/* Impedir que o rato "puxe" a imagem como um ficheiro fantasma e cancele o arrasto do container */}
                  <div className="bg-gray-100 rounded-2xl h-64 mb-6 overflow-hidden flex items-center justify-center p-4 pointer-events-none">
                    <img 
                      src={produto.imagem_url} 
                      alt={produto.titulo} 
                      className="object-contain w-full h-full rounded-xl mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Título e Marca */}
                  <div className={`flex flex-col ${!temDescricao ? 'mb-6 flex-grow' : 'mb-3'}`}>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#153A81] transition-colors leading-tight line-clamp-2">
                      {produto.titulo}
                    </h3>
                    
                    {temMarca && (
                      <span className="text-[#B5D318] font-black text-sm uppercase tracking-widest mt-2 block">
                        {produto.marca}
                      </span>
                    )}
                  </div>
                  
                  {/* Descrição Condicional */}
                  {temDescricao && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {produto.descricao}
                    </p>
                  )}
                  
                  {/* Rodapé Condicional (Preço) */}
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