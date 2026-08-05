import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
        <div className="col-span-1 md:col-span-2">
          <img src="/logo.png" alt="Covitool" className="h-10 mb-6" />
          <p className="text-blue-200 leading-relaxed max-w-sm">
            A sua parceria de confiança em Máquinas, ferramentas e acessórios industriais. Experiência e rigor desde 2007.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-brand-lime mb-6">A Empresa</h4>
          <ul className="flex flex-col gap-3 text-sm text-blue-100">
            <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/marcas" className="hover:text-white transition-colors">Marcas</Link></li>
            <li><Link to="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
            <li><Link to="/folhetos" className="hover:text-white transition-colors">Folhetos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-brand-lime mb-6">Contactos</h4>
          <ul className="flex flex-col gap-3 text-sm text-blue-100">
            <li>Parque Industrial da Covilhã<br/>Lote C4-B, 6200-027</li>
            <li>+351 275 322 030<br/><span className="text-[10px] text-brand-lime/70">(Chamada para rede fixa nacional)</span></li>
            <li>covitool@sapo.pt</li>
          </ul>
        </div>
      </div>
      
      {/* Secção Inferior (Copyright, Créditos e Links Legais) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-blue-300 gap-6 md:gap-0">
        
        {/* Lado Esquerdo: Copyright e Assinatura */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <p>© 2026 Covitool. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por:{' '}
            <a 
              href="https://layoutagency.pt/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-brand-lime font-bold transition-colors"
            >
              Layout Agency
            </a>
          </p>
        </div>
        
        {/* Lado Direito: Links Legais */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/termos-e-condicoes" className="hover:text-white transition-colors">Termos e Condições</Link>
          <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          <Link to="/politica-de-cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
          <button 
            onClick={() => window.dispatchEvent(new Event('openCookieBanner'))} 
            className="hover:text-white transition-colors"
          >
            Configurações de Cookies
          </button>
          <a href="https://www.livroreclamacoes.pt/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Livro de Reclamações</a>
        </div>
      </div>
    </footer>
  );
}