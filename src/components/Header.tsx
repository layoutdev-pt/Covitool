import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "text-[#153A81] border-b-[3px] border-[#B5D318] pb-1 text-base font-black tracking-tight"
      : "text-[#153A81] hover:text-[#B5D318] transition-colors text-base font-bold tracking-tight";
  };

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? 'top-4 w-[95%] max-w-7xl' : 'top-0 w-full max-w-full'
      }`}
    >
      <div 
        className={`bg-white/95 backdrop-blur-md transition-all duration-500 flex justify-between items-center ${
          isScrolled 
            ? 'rounded-2xl px-6 py-2 shadow-lg border border-gray-100' 
            : 'px-10 py-5 shadow-sm border-b border-gray-200'
        }`}
      >
        {/* Logo um pouco maior no topo */}
        <Link to="/" className="flex items-center shrink-0 transition-all duration-500">
          <img 
            src="/logo.png"
            alt="Covitool Logo" 
            className={`transition-all duration-500 object-contain object-left ${
              isScrolled ? 'h-10' : 'h-14'
            }`}
          />
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link className={getLinkClasses("/")} to="/">Home</Link>
          <Link className={getLinkClasses("/marcas")} to="/marcas">Marcas</Link>
          <Link className={getLinkClasses("/sobre-nos")} to="/sobre-nos">Sobre Nós</Link>
          <Link className={getLinkClasses("/folhetos")} to="/folhetos">Folhetos</Link>
        </nav>

        {/* Novo Bloco de Contacto à Direita */}
        <div className="hidden lg:flex flex-col items-end shrink-0">
          <span className="font-black text-[#153A81] text-lg tracking-tight">+351 275 322 030</span>
          <span className="text-[10px] text-gray-500 font-semibold">(Chamada para rede fixa nacional)</span>
        </div>
      </div>
    </header>
  );
};

export default Header;