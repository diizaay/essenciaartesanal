import React from "react";

const featureItems = [
  {
    title: "+1000 Clientes Satisfeitos",
    description: "Milhares de clientes felizes com produtos artesanais únicos e autênticos.",

  },
  {
    title: "Atendimento Especializado",
    description: "Equipe dedicada para ajudar você a encontrar a peça perfeita para cada ocasião.",

  },
  {
    title: "Envio Rápido",
    description: "Entrega cuidadosa e rápida para que suas peças cheguem em perfeito estado.",

  },
];

const Features = () => (
  <section className="py-12 bg-gradient-to-b from-white to-[var(--color-bg-soft)]">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* Título Centralizado */}
      <div className="text-center mb-12 fade-in">
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)] font-semibold mb-3 inline-block" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Por que escolher
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Nossa incrível particularidade
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {featureItems.map(({ title, description, icon }, index) => (
          <div
            key={title}
            className="group relative bg-white border-2 border-[var(--color-accent)]/30 p-8 transition-all duration-500 hover:border-[var(--color-accent)] hover:shadow-xl hover:-translate-y-2 fade-in"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Icon */}
            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {description}
            </p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--color-accent)]/20 transform rotate-45 translate-x-4 -translate-y-4 transition-all duration-300 group-hover:bg-[var(--color-accent)]/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
