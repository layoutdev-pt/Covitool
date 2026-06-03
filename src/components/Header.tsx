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
      // Verde Lima para a página ativa
      ? "text-[#153A81] border-b-[3px] border-[#B5D318] pb-1 text-sm font-black tracking-tight"
      // Hover fica Verde Lima
      : "text-gray-600 hover:text-[#B5D318] transition-colors text-sm font-bold tracking-tight";
  };

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ${
        isScrolled ? 'top-2 w-full max-w-full px-4' : 'top-6'
      }`}
    >
      <div 
        className={`bg-white/90 backdrop-blur-md border border-gray-100 transition-all duration-500 ${
          isScrolled 
            ? 'rounded-xl px-6 py-2 shadow-lg' 
            : 'rounded-full px-8 py-4 shadow-sm'
        } flex justify-between items-center`}
      >
        
        {/* Logo em Imagem com redimensionamento suave no scroll */}
        <Link to="/" className="flex items-center transition-all duration-500">
          <img 
            src="/logo.png" /* Coloca o teu ficheiro logo.png dentro da pasta 'public' */
            alt="Covitool Logo" 
            className={`transition-all duration-500 object-contain ${
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

        {/* Botão Admin destacado em Verde Lima */}
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2.5 bg-[#B5D318] text-[#153A81] hover:bg-[#a0bb15] hover:shadow-md rounded-full transition-all flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;