import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromoBanner = () => (
  <section className="px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-[var(--color-bg-soft)] via-white to-[var(--color-bg-soft-2)] border border-[var(--color-border-soft)] px-8 py-12 sm:px-12 sm:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-xl hover:shadow-2xl transition-all duration-500 fade-in relative overflow-hidden">

      {/* Decorative pink blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent)]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--color-accent)]/15 rounded-full blur-3xl" />

      <div className="space-y-4 relative z-10">
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] font-bold bg-[var(--color-accent)]/30 px-4 py-1.5 ">
          Escolha Especial
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Ideias de Presentes que Duram para Sempre
        </h2>
        <p className="text-base text-gray-600 max-w-md leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Presentes atemporais com detalhes artesanais, criados para acompanhar cada celebração com afetividade.
        </p>
      </div>

      <Link to="/produtos?tag=oferta" className="inline-flex relative z-10">
        <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] px-10 py-4 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-xl hover:scale-105 tracking-wide group">
          Explorar
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
    </div>
  </section>
);

export default PromoBanner;
