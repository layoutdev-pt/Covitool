import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#153A81] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
        <div className="col-span-1 md:col-span-2">
          <img src="/logo.png" alt="Covitool" className="h-10 mb-6" /> {/* Usa logo versão branca se tiveres, ou normal */}
          <p className="text-blue-200 leading-relaxed max-w-sm">
            A sua parceira de confiança em ferragens e ferramentas industriais. Experiência e rigor desde 2007.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[#B5D318] mb-6">A Empresa</h4>
          <ul className="flex flex-col gap-3 text-sm text-blue-100">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/marcas">Marcas</Link></li>
            <li><Link to="/sobre-nos">Sobre Nós</Link></li>
            <li><Link to="/folhetos">Folhetos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#B5D318] mb-6">Contactos</h4>
          <ul className="flex flex-col gap-3 text-sm text-blue-100">
            <li>Parque Industrial da Covilhã<br/>Lote C4-B, 6200-027</li>
            <li>+351 275 322 030<br/><span className="text-[10px] text-gray-400">(Chamada para rede fixa nacional)</span></li>
            <li>covitool@sapo.pt</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
        <p>© 2024 Covitool. Todos os direitos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="#">Termos e Condições</Link>
          <Link to="#">Política de Privacidade</Link>
          <Link to="#">Livro de Reclamações</Link>
        </div>
      </div>
    </footer>
  );
}