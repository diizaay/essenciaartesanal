import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simular busca de produtos (você pode conectar à API real)
    const mockProducts = [
        {
            id: 1,
            name: 'Brincos de Pérola Dourados',
            price: '46 KZ',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop',
            slug: 'brincos-perola-dourados'
        },
        {
            id: 2,
            name: 'Brincos Argola Dourados',
            price: '42 KZ',
            image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=100&h=100&fit=crop',
            slug: 'brincos-argola-dourados'
        },
        {
            id: 3,
            name: 'Conjunto de Pulseiras',
            price: '55 KZ',
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop',
            slug: 'conjunto-pulseiras'
        }
    ];

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        setLoading(true);

        // Simular delay de busca
        const timer = setTimeout(() => {
            const filtered = mockProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filtered);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setSearchTerm('');
            setResults([]);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl">
                <div className="max-w-[800px] mx-auto p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Pesquisar produtos..."
                                className="w-full pl-12 pr-4 py-4 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none text-lg"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                                autoFocus
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="h-12 w-12 flex items-center justify-center border-2 border-[var(--color-border)] text-gray-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition"
                            aria-label="Fechar pesquisa"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                            </div>
                        )}

                        {!loading && searchTerm && results.length === 0 && (
                            <div className="text-center py-12">
                                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Nenhum produto encontrado para "{searchTerm}"
                                </p>
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                                </p>
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/produto/${product.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-4 bg-[var(--color-bg-soft)] hover:bg-[var(--color-accent)]/30 transition border-2 border-transparent hover:border-[var(--color-accent)]"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-[var(--color-primary)] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {product.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!loading && !searchTerm && (
                            <div className="text-center py-12">
                                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Digite algo para começar a pesquisar
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchModal;
