import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
    // Filtrar apenas produtos em destaque e limitar a 4 produtos
    const featuredProducts = products.filter(product => product.featured === true).slice(0, 4);

    if (featuredProducts.length === 0) {
        return null;
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-[1200px] mx-auto">
                {/* Título com linha decorativa à direita */}
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Produtos em Destaque
                    </h2>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Grid de produtos */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} hideTags={true} />
                    ))}
                </div>

                {/* Link para ver todos os produtos */}
                <div className="text-center mt-12">
                    <a
                        href="/produtos"
                        className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 font-bold text-sm transition-all duration-300 hover:brightness-110 active:scale-95 uppercase tracking-wide shadow-md"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Ver Todos os Produtos
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
