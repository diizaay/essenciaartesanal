import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Grid3x3,
    Heart,
    HelpCircle,
    Circle,
    Sparkles,
    Flower2,
    Watch,
    Gem,
    Scissors,
    Shirt,
    Package
} from 'lucide-react';
import { getCategories } from '../services/api';

const Categories = () => {
    const STORE_SLUG = 'essencia-artesanal-studio';
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para obter o ícone apropriado baseado no nome da categoria
    const getCategoryIcon = (categoryName) => {
        const name = categoryName.toLowerCase();

        if (name.includes('pulseira')) return Watch;
        if (name.includes('brinco')) return Circle;
        if (name.includes('colar') || name.includes('colares')) return Gem;
        if (name.includes('an') && name.includes('is')) return Circle; // Anéis
        if (name.includes('sabonete')) return Package;
        if (name.includes('cabelo') || name.includes('hair')) return Scissors;
        if (name.includes('acessório')) return Sparkles;
        if (name.includes('roupa') || name.includes('vest')) return Shirt;
        if (name.includes('flor')) return Flower2;

        // Ícone padrão
        return Gem;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategories(STORE_SLUG);
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Carregando categorias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            CATEGORIAS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Explora as Nossas Categorias
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Descobre a nossa vasta gama de produtos artesanais organizados por categoria.<br />Cada peça é única e feita com paixão e dedicação.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
                    {/* Main Content */}
                    <div>
                        {categories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categories.map((category) => {
                                    const CategoryIcon = getCategoryIcon(category.name);
                                    return (
                                        <Link
                                            key={category.id}
                                            to={`/produtos?categoria=${category.slug || category.id}`}
                                            className="group bg-white border-2 border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <CategoryIcon className="h-6 w-6 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-700 pt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {category.name}
                                                </h3>
                                            </div>

                                            {category.description ? (
                                                <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {category.description}
                                                </p>
                                            ) : (
                                                <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    Descobre produtos artesanais únicos e especiais nesta categoria.
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
                                                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Ver Produtos</span>
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] p-12">
                                <Grid3x3 className="h-16 w-16 text-[var(--color-primary)] mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Nenhuma categoria disponível
                                </h3>
                                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    As categorias estarão disponíveis em breve.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Sobre as Categorias */}
                        <div className="bg-[var(--color-bg-soft)] p-8 border-2 border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <Grid3x3 className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Sobre as Categorias
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Organizamos os nossos produtos em categorias para facilitar a tua busca. Cada categoria contém peças cuidadosamente criadas à mão.
                            </p>
                        </div>

                        {/* Produtos em Destaque */}
                        <div className="bg-white p-8 border-2 border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    100% Artesanal
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Todos os nossos produtos são feitos à mão com materiais de qualidade premium. Cada peça é única e especial.
                            </p>
                            <Link
                                to="/sobre"
                                className="inline-block text-[var(--color-primary)] font-semibold text-sm hover:underline"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Conhece a Nossa História →
                            </Link>
                        </div>

                        {/* Precisa de Ajuda */}
                        <div className="bg-[var(--color-primary)] text-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <HelpCircle className="h-6 w-6" />
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Não encontraste o que procuras?
                                </h3>
                            </div>
                            <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Criamos peças personalizadas especialmente para ti. Contacta-nos e vamos dar vida à tua ideia!
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-block bg-white text-[var(--color-primary)] px-6 py-3 font-bold text-sm transition-all duration-300 hover:bg-[var(--color-accent)] w-full text-center"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Fala Connosco
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
