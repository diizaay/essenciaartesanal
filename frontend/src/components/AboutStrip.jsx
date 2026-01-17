import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutStrip = () => (
  <section className="px-4 sm:px-6 lg:px-8 py-4">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] border border-[var(--color-accent)]/30 bg-[var(--color-bg-soft)] overflow-hidden shadow-lg">
      <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center gap-4">
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Sobre a loja artesanal
        </span>
        <h3 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Você compra, nós apoiamos
        </h3>
        <p className="text-sm text-gray-600 max-w-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Parte de cada compra apoia artesãos independentes e iniciativas locais. Consumir com propósito significa fortalecer comunidades criativas.
        </p>
        <Link to="/sobre" className="inline-flex self-start">
          <button className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Descubra mais
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
      <div className="bg-[var(--color-bg-soft)]">
        <img
          src="DSC_0038.webp"
          alt="Mesa com objetos artesanais"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
);

export default AboutStrip;
