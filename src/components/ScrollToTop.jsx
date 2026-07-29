import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Quando o caminho (pathname) muda, faz scroll para o topo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' para não veres a página a deslizar do nada
    });
  }, [pathname]);

  return null; // Este componente não renderiza nada visualmente
}