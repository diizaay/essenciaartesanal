import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Favoritos = () => {
    const { favorites, totalFavorites } = useFavorites();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            LISTA DE DESEJOS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Meus Favoritos
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {totalFavorites > 0
                            ? `Você tem ${totalFavorites} ${totalFavorites === 1 ? 'produto' : 'produtos'} na sua lista de desejos`
                            : 'Sua lista de desejos está vazia'}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {totalFavorites > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] mb-6">
                            <Heart className="h-12 w-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Sua lista de desejos está vazia
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Adicione produtos à sua lista de desejos para salvá-los e comprá-los mais tarde.
                        </p>
                        <Link to="/produtos">
                            <button className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-4 font-bold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <ShoppingBag className="h-5 w-5" />
                                Explorar Produtos
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
