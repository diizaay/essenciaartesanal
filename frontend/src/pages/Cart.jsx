import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { items, removeItem, updateQuantity, cartTotal, totalQty } = useCart();

    const handleIncrement = (item) => {
        const id = item.productId || item.id;
        updateQuantity(id, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        const id = item.productId || item.id;
        if (item.quantity > 1) {
            updateQuantity(id, item.quantity - 1);
        }
    };

    const handleRemove = (item) => {
        const id = item.productId || item.id;
        removeItem(id);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            CARRINHO DE COMPRAS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Meu Carrinho
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {totalQty > 0
                            ? `Você tem ${totalQty} ${totalQty === 1 ? 'item' : 'itens'} no carrinho`
                            : 'Seu carrinho está vazio'}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {items.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.productId || item.id} className="flex gap-4 p-4 border-2 border-[var(--color-border)] bg-white hover:shadow-md transition-shadow">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                                        <img
                                            src={item.images?.[0] || '/placeholder.png'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {item.name}
                                            </h3>
                                            <p className="text-[var(--color-primary)] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {item.price} KZ
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center border-2 border-[var(--color-border)]">
                                                <button
                                                    onClick={() => handleDecrement(item)}
                                                    className="p-2 hover:bg-[var(--color-bg-soft)] transition-colors"
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <Minus className="h-4 w-4 text-gray-600" />
                                                </button>
                                                <span className="px-4 font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrement(item)}
                                                    className="p-2 hover:bg-[var(--color-bg-soft)] transition-colors"
                                                    aria-label="Aumentar quantidade"
                                                >
                                                    <Plus className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item)}
                                                className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                                                aria-label="Remover item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            Subtotal
                                        </p>
                                        <p className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {(item.price * item.quantity).toFixed(2)} KZ
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="border-2 border-[var(--color-border)] p-6 bg-[var(--color-bg-soft)] sticky top-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Resumo do Pedido
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <span>Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'itens'})</span>
                                        <span className="font-semibold">{cartTotal.toFixed(2)} KZ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <span>Envio</span>
                                        <span className="font-semibold">A calcular</span>
                                    </div>
                                    <div className="border-t-2 border-[var(--color-border)] pt-4">
                                        <div className="flex justify-between text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            <span>Total</span>
                                            <span>{cartTotal.toFixed(2)} KZ</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/checkout">
                                    <button className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] py-4 font-bold text-sm transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        FINALIZAR COMPRA
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </Link>

                                <Link to="/produtos">
                                    <button className="w-full mt-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] py-4 font-bold text-sm transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        CONTINUAR COMPRANDO
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] mb-6">
                            <ShoppingBag className="h-12 w-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Seu carrinho está vazio
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Adicione produtos ao carrinho para continuar comprando.
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

export default Cart;
