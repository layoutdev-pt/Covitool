import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/sections/home/Hero';
import BentoGrid from '../components/sections/home/BentoGrid';
import FeaturedProducts from '../components/sections/home/FeaturedProducts';
import CustomerJourney from '../components/sections/home/CustomerJourney';
import BrochureSection from '../components/sections/home/BrochureSection';
import ContactForm from '../components/sections/home/ContactForm';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <BentoGrid />
        <FeaturedProducts />
        <CustomerJourney />
        <BrochureSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;