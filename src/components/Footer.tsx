import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-xl">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-brand_logo">AutoParts Premium</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-manrope text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Privacidade</a>
          <a className="font-manrope text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Termos de Serviço</a>
          <a className="font-manrope text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">FAQs</a>
        </div>
        <div className="font-manrope text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AutoParts Premium. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;