import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "text-[#153A81] border-b-[3px] border-[#B5D318] pb-1 text-sm font-black tracking-tight"
      : "text-[#153A81] hover:text-[#B5D318] transition-colors text-sm font-bold tracking-tight";
  };

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ${
        isScrolled ? 'top-2 w-full max-w-full px-4' : 'top-6'
      }`}
    >
      {/* w-full adicionado aqui para garantir que ocupa todo o espaço do container */}
      <div 
        className={`bg-white/90 backdrop-blur-md border border-gray-100 transition-all duration-500 w-full ${
          isScrolled 
            ? 'rounded-xl px-6 py-2 shadow-lg' 
            : 'rounded-full px-8 py-3 shadow-sm'
        } flex justify-between items-center`}
      >
        
        {/* Logo - shrink-0 impede que a imagem seja esmagada pelos outros elementos */}
        <Link to="/" className="flex items-center shrink-0 transition-all duration-500">
          <img 
            src="/logo.png"
            alt="Covitool Logo" 
            className={`transition-all duration-500 object-contain object-left ${
              isScrolled ? 'h-8' : 'h-10 md:h-12'
            }`}
          />
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link className={getLinkClasses("/")} to="/">Home</Link>
          <Link className={getLinkClasses("/marcas")} to="/marcas">Marcas</Link>
          <Link className={getLinkClasses("/sobre-nos")} to="/sobre-nos">Sobre Nós</Link>
          <Link className={getLinkClasses("/folhetos")} to="/folhetos">Folhetos</Link>
        </nav>

        {/* Div invisível apenas para equilibrar o flexbox no desktop e manter o logo à esquerda e menu ao centro/direita */}
        <div className="hidden lg:block w-12 shrink-0"></div>
      </div>
    </header>
  );
};

export default Header;