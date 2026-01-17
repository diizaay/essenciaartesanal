import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, User, Trash2 } from 'lucide-react';
import { getProductById, getProducts, getProductReviews, createProductReview, deleteReview, getProductRating, getMe } from '../services/api';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import { toast } from 'sonner';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [product, setProduct] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null); // Selected product variant
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState({ averageRating: 0, totalReviews: 0 });
    const [currentUser, setCurrentUser] = useState(null);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const loadProduct = async () => {
            try {
                setLoading(true);

                // Load all data in parallel for better performance
                const [productData, reviewsData, ratingData, userData] = await Promise.all([
                    getProductById(id),
                    getProductReviews(id),
                    getProductRating(id),
                    getMe().catch(() => null) // User might not be logged in
                ]);

                setProduct(productData);
                setReviews(reviewsData);
                setRating(ratingData);
                setCurrentUser(userData);

                // Auto-select cheapest variant if product has variants
                if (productData.variants && productData.variants.length > 0) {
                    const cheapestVariant = productData.variants.reduce((min, variant) =>
                        variant.price < min.price ? variant : min
                    );
                    setSelectedVariant(cheapestVariant);
                }

                // Load suggested products from same category
                if (productData?.category) {
                    const allProducts = await getProducts({ category: productData.category });
                    const suggested = allProducts
                        .filter(p => p.id !== productData.id)
                        .slice(0, 4);
                    setSuggestedProducts(suggested);
                }
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-gray-600" style={{ fontFamily: 'Poppins' }}>Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Produto não encontrado</p>
                    <button
                        onClick={() => navigate('/produtos')}
                        className="bg-[var(--color-accent)] text-[var(--color-primary)] px-6 py-2 font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                    >
                        Ver Todos os Produtos
                    </button>
                </div>
            </div>
        );
    }

    const images = product.images || [product.image];
    const favorited = isFavorite(product.id);

    // Get current price (variant price or base price)
    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    const handleAddToCart = () => {
        // If product has variants, require selection
        if (product.variants && product.variants.length > 0 && !selectedVariant) {
            toast.error('Por favor, selecione uma opção do produto');
            return;
        }

        for (let i = 0; i < quantity; i++) {
            addItem({
                ...product,
                image: images[selectedImage],
                price: currentPrice,
                selectedVariant: selectedVariant ? {
                    id: selectedVariant.id,
                    name: selectedVariant.name,
                    price: selectedVariant.price
                } : null
            });
        }
        toast.success('Produto adicionado ao carrinho!');
    };

    const handleToggleFavorite = () => {
        toggleFavorite({ ...product, image: images[selectedImage] });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            toast.error('Por favor, faça login para avaliar');
            navigate('/conta');
            return;
        }

        if (!newReview.comment.trim()) {
            toast.error('Por favor, adicione um comentário');
            return;
        }

        try {
            const reviewData = {
                productId: id,
                rating: newReview.rating,
                comment: newReview.comment.trim()
            };

            await createProductReview(id, reviewData);

            // Reload reviews and rating
            const [reviewsData, ratingData] = await Promise.all([
                getProductReviews(id),
                getProductRating(id)
            ]);
            setReviews(reviewsData);
            setRating(ratingData);
            setNewReview({ rating: 5, comment: '' });

            toast.success('Avaliação adicionada com sucesso!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Erro ao adicionar avaliação');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Tem certeza que deseja eliminar esta avaliação?')) {
            return;
        }

        try {
            await deleteReview(reviewId);

            // Reload reviews and rating
            const [reviewsData, ratingData] = await Promise.all([
                getProductReviews(id),
                getProductRating(id)
            ]);
            setReviews(reviewsData);
            setRating(ratingData);

            toast.success('Avaliação eliminada');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Erro ao eliminar avaliação');
        }
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] mb-8 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Voltar</span>
                </button>

                {/* Product Details Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Image Gallery */}
                    <div>
                        <div className="border-2 border-[var(--color-border)] mb-4 overflow-hidden">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border-2 overflow-hidden transition-all ${selectedImage === index
                                            ? 'border-[var(--color-primary)]'
                                            : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full aspect-square object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins' }}>
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                {/* If product has variants, only show price after selection */}
                                {product.variants && product.variants.length > 0 ? (
                                    selectedVariant ? (
                                        <p className="text-3xl font-bold text-[var(--color-primary)]">
                                            {Number.isInteger(currentPrice)
                                                ? `${currentPrice.toLocaleString('pt-PT')} KZ`
                                                : `${currentPrice.toFixed(2)} KZ`}
                                        </p>
                                    ) : (
                                        <p className="text-lg text-gray-500 italic">
                                            Selecione uma opção para ver o preço
                                        </p>
                                    )
                                ) : (
                                    <p className="text-3xl font-bold text-[var(--color-primary)]">
                                        {Number.isInteger(currentPrice)
                                            ? `${currentPrice.toLocaleString('pt-PT')} KZ`
                                            : `${currentPrice.toFixed(2)} KZ`}
                                    </p>
                                )}
                                {product.discount && (
                                    <span className="bg-[var(--color-primary)] text-white px-3 py-1 text-sm font-semibold">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {product.description && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>
                                    Descrição
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Product Variants Selection */}
                        {product.variants && product.variants.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold mb-3 text-gray-700">
                                    Selecione uma opção *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-2 border-2 transition-all text-sm font-medium ${selectedVariant?.id === variant.id
                                                ? 'border-[var(--color-primary)] bg-[var(--color-accent)] bg-opacity-20 text-[var(--color-primary)]'
                                                : 'border-[var(--color-border)] hover:border-[var(--color-primary)] text-gray-700'
                                                }`}
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.category && (
                            <div>
                                <span className="inline-block bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                                    {product.category}
                                </span>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="pt-4">
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Quantidade</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-12 w-12 grid place-items-center border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors font-bold text-xl"
                                >
                                    -
                                </button>
                                <span className="text-xl font-bold min-w-[60px] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-12 w-12 grid place-items-center border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors font-bold text-xl"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full flex items-center justify-center gap-3 bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-4 font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Adicionar ao Carrinho
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/checkout');
                                }}
                                className="w-full bg-[var(--color-primary)] text-white px-8 py-4 font-bold hover:opacity-90 transition-opacity"
                            >
                                Finalizar Compra
                            </button>
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={handleToggleFavorite}
                            className={`w-full flex items-center justify-center gap-2 border-2 py-3 transition-all ${favorited
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'bg-white text-[var(--color-primary)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                                }`}
                        >
                            <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
                            {favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
                    </div>
                </div>

                {/* Product Details/Specifications - Full Width */}
                {product.details && product.details.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins' }}>
                            Detalhes do Produto
                        </h3>
                        <div className="bg-gray-50 border-2 border-[var(--color-border)] p-6 space-y-3">
                            {product.details.map((detail, index) => (
                                <div key={index} className="flex gap-4">
                                    <span className="font-semibold min-w-[150px]">
                                        {detail.label}:
                                    </span>
                                    <span className="text-gray-700 flex-1">
                                        {detail.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Suggested Products */}
                {suggestedProducts.length > 0 && (
                    <div>
                        <div className="border-t-2 border-[var(--color-border)] pt-12 mb-8">
                            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins' }}>
                                Produtos Sugeridos
                            </h2>
                            <p className="text-gray-600">Outros produtos que pode gostar</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {suggestedProducts.map((suggestedProduct) => (
                                <ProductCard key={suggestedProduct.id} product={suggestedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;

