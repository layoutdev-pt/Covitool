import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationMap from '../components/sections/SobreNos/LocationMap'; // Ajusta o caminho se necessário
import ContactForm from '../components/sections/home/ContactForm'; // Ajusta o caminho se necessário
import SEOMetadata from '../components/SEOMetadata';

// Novas secções modulares
import HeroSobreNos from '../components/sections/SobreNos/HeroSobreNos';
import HistoriaSobreNos from '../components/sections/SobreNos/HistoriaSobreNos';
import EstatisticasSobreNos from '../components/sections/SobreNos/EstatisticasSobreNos';
import ServicosAccordion from '../components/sections/SobreNos/ServicosAccordion';

export default function SobreNos() {
  const location = useLocation();

  // Efeito para gerir o scroll quando a página carrega
  useEffect(() => {
    // Se existir um # no URL (ex: #contacto)
    if (location.hash) {
      // Pequeno atraso para garantir que os componentes (como o mapa) já estão na tela
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Se não houver #, garante que a página abre sempre no topo
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-16 pb-12">
      <SEOMetadata 
        title="Sobre Nós | Covitool" 
        description="Informação institucional sobre a história, missão e valores da Covitool." 
        canonical="https://covitool.pt/sobre-nos" 
      />
      <HeroSobreNos />
      <HistoriaSobreNos />
      <EstatisticasSobreNos />
      <ServicosAccordion />

      {/* Secção de Mapa e Contactos */}
      <section className="container mx-auto px-4 mt-8">
        <LocationMap />
      </section>

      {/* ID adicionado aqui! O React Router vai procurar esta secção */}
      <section id="contacto" className="scroll-mt-32">
        <ContactForm />
      </section>
    </div>
  );
}