import React from 'react';
import { brands } from '../mock/brands';
import Reveal from './Reveal';

const BrandsStrip = () => (
  <Reveal as="section" className="px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1200px] mx-auto border border-[#ead9ce] bg-[var(--color-bg-soft)] rounded-[24px] px-6 py-8 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-sm uppercase tracking-[0.35em] text-[#CA1818]">
        {brands.map((brand, index) => (
          <Reveal
            key={brand.id}
            as="span"
            delay={index * 40}
            className="flex items-center justify-center"
          >
            {brand.name}
          </Reveal>
        ))}
      </div>
    </div>
  </Reveal>
);

export default BrandsStrip;
