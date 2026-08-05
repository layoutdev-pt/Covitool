import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setIsVisible(true);
    }

    const handleOpenBanner = () => setIsVisible(true);
    window.addEventListener("openCookieBanner", handleOpenBanner);

    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-700 text-sm md:text-base flex-1 text-center md:text-left">
          <p>
            Utilizamos cookies essenciais e analíticos para melhorar a sua
            experiência no nosso site. Ao continuar a navegar, consideramos que
            aceita a sua utilização.
            <Link
              to="/politica-de-cookies"
              className="text-[#153A81] hover:underline font-bold ml-1"
            >
              Saber mais.
            </Link>
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={acceptCookies}
            className="bg-brand-lime hover:bg-[#a1bc12] text-[#153A81] px-8 py-3 rounded-full font-bold transition-all shadow-md hover:-translate-y-1 whitespace-nowrap"
          >
            Compreendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
