import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/DSC_0052.webp',
    '/DSC_0031.webp', // Substitua com outras imagens reais
    '/DSC_0053.webp',
    '/DSC_0022.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-[var(--color-bg-soft)] overflow-hidden">

          {/* Conteúdo à Esquerda */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center gap-6">

            <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Arte autêntica e feita à mão
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[50px] leading-tight lg:leading-[1.2] font-semibold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Descubra a arte dos produtos Artesanais feitos à mão com Amor
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-[520px] leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Peças únicas, criadas com paixão e dedicação por artesãos locais, trazendo autenticidade e charme para o seu lar.
            </p>

            <Link to="/produtos" className="inline-flex self-start">
              <button className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Explorar Produtos
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>

          {/* Imagem à Direita - Carousel */}
          <div className="relative bg-[var(--color-bg-soft)] fade-in overflow-hidden min-h-[400px] lg:min-h-[500px]">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Produtos artesanais ${index + 1}`}
                className={`h-full w-full object-cover absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
