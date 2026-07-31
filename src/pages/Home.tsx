import React from 'react';
import Hero from '../components/sections/home/Hero';
import BrandsCarousel from '@/components/sections/home/BrandsCarousel';
import BentoGrid from '../components/sections/home/BentoGrid';
import FeaturedProducts from '../components/sections/home/FeaturedProducts';
import CustomerJourney from '../components/sections/home/CustomerJourney';
import BrochureSection from '../components/sections/home/BrochureSection';
import LocationMap from '../components/sections/SobreNos/LocationMap'; // Ajusta o caminho conforme a tua estrutura

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Hero />
      <BrandsCarousel />
      <BentoGrid />
      <FeaturedProducts />
      <CustomerJourney />
      <BrochureSection />
      
      {/* O Mapa entra aqui, entre o Folheto e o Formulário de Contacto */}
      <section className="container mx-auto px-4 py-16">
        <LocationMap />
      </section>
      
      
    </div>
  );
};

export default Home;