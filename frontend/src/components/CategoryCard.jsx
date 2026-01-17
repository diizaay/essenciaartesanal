import React from 'react';

const CategoryCard = ({ category, index }) => (
  <article className="group border border-[var(--color-accent)]/30 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--color-accent)]">
    <div className="overflow-hidden">
      <img
        src={category.image}
        alt={category.name}
        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex items-center justify-between px-5 py-4">
      <span className="font-semibold text-[var(--color-primary)] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {String(index + 1).padStart(2, '0')}. {category.name}
      </span>
    </div>
  </article>
);

export default CategoryCard;
