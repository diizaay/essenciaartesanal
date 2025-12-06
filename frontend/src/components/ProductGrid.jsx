import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [] }) => {
  // Filtrar apenas produtos marcados como novos e limitar a 4 produtos
  const newProducts = products.filter(product => product.isNew === true).slice(0, 4);

  // Early return AFTER all hooks
  if (newProducts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Produtos recentes
          </h2>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product, index) => (
            <div
              key={product.id || product.slug || index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
