import React from 'react';

const Header: React.FC = () => {
  return (
    /* O fixed top-6 garante que a barra flutue sobre o Hero */
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/85 backdrop-blur-md border border-white/40 shadow-sm rounded-full flex justify-between items-center px-8 py-4 transition-all duration-300">
        
        {/* Logo */}
        <div className="text-2xl font-black text-[#004BFF] tracking-tighter flex items-center gap-1">
          AutoParts <span className="font-medium text-gray-500">Premium</span>
        </div>

        {/* Links de Navegação */}
        <nav className="hidden lg:flex items-center gap-8">
          <a className="text-[#004BFF] border-b-2 border-[#008554] pb-1 text-sm font-bold tracking-tight" href="#">Home</a>
          <a className="text-gray-600 hover:text-[#004BFF] transition-colors text-sm font-semibold tracking-tight" href="#">Marcas</a>
          <a className="text-gray-600 hover:text-[#004BFF] transition-colors text-sm font-semibold tracking-tight" href="#">Sobre Nós</a>
          <a className="text-gray-600 hover:text-[#004BFF] transition-colors text-sm font-semibold tracking-tight" href="#">Novidades</a>
          <a className="text-gray-600 hover:text-[#004BFF] transition-colors text-sm font-semibold tracking-tight" href="#">Folhetos</a>
          <a className="text-gray-600 hover:text-[#004BFF] transition-colors text-sm font-semibold tracking-tight" href="#">Contacte-nos</a>
        </nav>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-[#004BFF] hover:bg-white/50 rounded-full transition-all">
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          </button>
          <button className="p-2 text-gray-600 hover:text-[#004BFF] hover:bg-white/50 rounded-full transition-all">
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;