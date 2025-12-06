import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GiftIdeasBanner = () => (
  <section className="px-4 sm:px-6 lg:px-8 py-12 fade-in">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] border-2 border-[var(--color-accent)]/30 bg-[var(--color-bg-soft)] overflow-hidden shadow-lg min-h-[350px] lg:min-h-[400px]">

        {/* Imagem à Esquerda */}
        <div className="bg-[var(--color-bg-soft)] overflow-hidden order-2 lg:order-1">
          <img
            src="/DSC_0027.webp"
            alt="Decoração artesanal"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Conteúdo à Direita */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center gap-4 order-1 lg:order-2">

          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Presentes maravilhosos
          </span>

          <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ideias de presentes que duram mais tempo
          </h2>

          <p className="text-sm text-gray-600 max-w-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Descubra presentes únicos que combinam arte e funcionalidade. Cada peça conta uma história especial.
          </p>

          <Link to="/produtos" className="inline-flex self-start">
            <button className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Vamos lá
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default GiftIdeasBanner;
