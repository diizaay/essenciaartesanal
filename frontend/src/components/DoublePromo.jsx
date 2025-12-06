import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const promos = [
  {
    title: 'Ganhe 25% OFF',
    description: 'Oferta v\u00e1lida apenas neste fim de semana especial.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    cta: 'Shop now',
  },
  {
    title: 'Presentes exclusivos',
    description: 'Curadoria artesanal para surpreender quem voc\u00ea ama.',
    image:
      'https://images.unsplash.com/photo-1523413376086-2372d65c1ea0?auto=format&fit=crop&w=800&q=80',
    cta: 'Descobrir',
  },
];

const DoublePromo = () => (
  <Reveal as="section" className="px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1200px] mx-auto grid gap-6 md:grid-cols-2">
      {promos.map((promo, index) => (
        <Reveal
          key={promo.title}
          as="article"
          delay={index * 100}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] border border-[#ead9ce] bg-[var(--color-bg-soft)] rounded-[28px] overflow-hidden shadow-sm"
        >
          <div className="p-8 sm:p-10 flex flex-col gap-4 justify-center">
            <h3 className="text-2xl font-semibold text-[#CA1818]">{promo.title}</h3>
            <p className="text-sm text-[#777777]">{promo.description}</p>
            <Link to="/produtos" className="inline-flex">
              <button className="inline-flex items-center gap-2 rounded-full border border-[#CA1818] px-6 py-3 text-xs tracking-[0.3em] uppercase text-[#CA1818] transition-colors hover:bg-[#CA1818] hover:text-white">
                {promo.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
          <div className="bg-[var(--color-accent)]">
            <img src={promo.image} alt={promo.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      ))}
    </div>
  </Reveal>
);

export default DoublePromo;
