import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from './CategoryCard';

const CategoryGrid = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, categories.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Categorias populares
            </h2>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Setas de Navegação */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 grid place-items-center bg-[var(--color-accent)] text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Categoria anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 grid place-items-center bg-[var(--color-accent)] text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Próxima categoria"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {visibleCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/produtos?categoria=${category.slug}`}
              className="block fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={category} index={currentIndex + index} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
