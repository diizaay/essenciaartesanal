import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, MapPin, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import * as api from '../services/api';

const WHATSAPP_NUMBER = '244951868817';

const Checkout = () => {
    const { items, cartTotal, totalQty, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        province: '',
        city: '',
        neighborhood: '',
        street: '',
        notes: ''
    });

    useEffect(() => {
        const loadUserData = async () => {
            const token = api.getAuthToken();

            if (!token) {
                toast.error('Por favor, faça login para continuar');
                navigate('/conta');
                return;
            }

            try {
                const userData = await api.getMe();
                if (userData) {
                    setFormData(prev => ({
                        ...prev,
                        name: userData.name || '',
                        email: userData.email || '',
                        phone: userData.phone || ''
                    }));

                    const userAddresses = await api.getAddresses();
                    setAddresses(userAddresses || []);

                    if (userAddresses && userAddresses.length > 0) {
                        const defaultAddr = userAddresses.find(addr => addr.isDefault) || userAddresses[0];
                        setSelectedAddressId(defaultAddr.id);
                        setFormData(prev => ({
                            ...prev,
                            province: defaultAddr.province || '',
                            city: defaultAddr.city || '',
                            neighborhood: defaultAddr.neighborhood || '',
                            street: defaultAddr.street || ''
                        }));
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                toast.error('Erro ao carregar dados');
                navigate('/conta');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddressSelect = (e) => {
        const addrId = e.target.value;
        setSelectedAddressId(addrId);

        if (addrId) {
            const addr = addresses.find(a => a.id === addrId);
            if (addr) {
                setFormData(prev => ({
                    ...prev,
                    province: addr.province || '',
                    city: addr.city || '',
                    neighborhood: addr.neighborhood || '',
                    street: addr.street || ''
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                province: '',
                city: '',
                neighborhood: '',
                street: ''
            }));
        }
    };

    const generateWhatsAppMessage = () => {
        let message = '*Ola! Gostaria de finalizar meu pedido:*%0A%0A';
        message += '*ITENS:*%0A';

        items.forEach((item, index) => {
            const price = item.price || 0;
            const qty = item.quantity || 1;
            message += `${index + 1}. ${item.name} (${qty}x) - ${(price * qty).toFixed(2)} KZ%0A`;
        });

        message += `%0A*TOTAL: ${cartTotal.toFixed(2)} KZ*%0A%0A`;
        message += '*DADOS DO CLIENTE:*%0A';
        message += `Nome: ${formData.name}%0A`;
        message += `Email: ${formData.email}%0A`;
        message += `Telefone: ${formData.phone}%0A%0A`;
        message += '*ENDERECO DE ENTREGA:*%0A';
        message += `${formData.street}%0A`;
        message += `${formData.neighborhood}, ${formData.city}%0A`;
        message += `${formData.province}%0A`;

        if (formData.notes) {
            message += `%0A*OBSERVACOES:* ${formData.notes}%0A`;
        }

        return message;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            toast.error('Por favor, aceite os termos e condições para continuar');
            return;
        }

        if (!formData.name || !formData.phone || !formData.province || !formData.city) {
            toast.error('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        if (items.length === 0) {
            toast.error('Seu carrinho está vazio');
            navigate('/carrinho');
            return;
        }

        try {
            // Create order in database
            const orderData = {
                customerName: formData.name,
                customerPhone: formData.phone,
                customerAddress: `${formData.street}, ${formData.neighborhood}, ${formData.city}, ${formData.province}`,
                items: items.map(item => ({
                    productId: item.id || item.productId,
                    quantity: item.quantity || 1
                })),
                total: cartTotal,
                notes: formData.notes,
                status: 'pending'
            };

            await api.createOrder(orderData);

            // Generate WhatsApp message and open
            const message = generateWhatsAppMessage();
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');

            // Clear cart
            clearCart();

            toast.success('Pedido criado e enviado para WhatsApp!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error creating order:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            toast.error(`Erro ao criar pedido: ${error.response?.data?.detail || error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Poppins' }}>
                        Seu carrinho está vazio
                    </h2>
                    <Link to="/produtos">
                        <button className="bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 font-bold hover:bg-[var(--color-primary)] hover:text-white">
                            Explorar Produtos
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins' }}>
                        Checkout
                    </h1>
                    <p className="text-lg text-gray-600">Finalize seu pedido via WhatsApp</p>
                </div>
            </div>

            {/* Payment Notice Banner */}
            <div className="max-w-[1200px] mx-auto px-4 -mt-8 mb-8">
                <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                        <MessageCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-blue-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                                Métodos de Pagamento em Desenvolvimento
                            </h3>
                            <p className="text-blue-800 text-sm leading-relaxed">
                                Estamos trabalhando para oferecer múltiplas opções de pagamento online.
                                Por enquanto, <strong>todos os pedidos serão finalizados via WhatsApp</strong>,
                                onde você poderá confirmar seu pedido e escolher a melhor forma de pagamento com nossa equipe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 py-16">
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Dados Pessoais */}
                        <div className="border-2 border-[var(--color-border)] p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <User className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Poppins' }}>Dados Pessoais</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-2">Nome Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block font-semibold mb-2">Telefone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+244 923 456 789"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="border-2 border-[var(--color-border)] p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Poppins' }}>Endereço de Entrega</h2>
                            </div>

                            {addresses.length > 0 && (
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2">Selecionar Endereço Salvo</label>
                                    <select
                                        value={selectedAddressId}
                                        onChange={handleAddressSelect}
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    >
                                        <option value="">Novo endereço</option>
                                        {addresses.map(addr => (
                                            <option key={addr.id} value={addr.id}>
                                                {addr.street}, {addr.city} - {addr.province}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-2">Província *</label>
                                    <input
                                        type="text"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ex: Luanda"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-2">Município *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ex: Luanda"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-2">Bairro</label>
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Viana"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-2">Rua</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Rua 123"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block font-semibold mb-2">Observações</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Informações adicionais..."
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="border-2 border-[var(--color-border)] p-6 bg-[var(--color-bg-soft)] sticky top-4">
                            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Poppins' }}>
                                Resumo do Pedido
                            </h2>

                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id || item.productId} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} ({item.quantity}x)
                                        </span>
                                        <span className="font-semibold">
                                            {((item.price || 0) * (item.quantity || 1)).toFixed(2)} KZ
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t-2 border-[var(--color-border)] pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold text-[var(--color-primary)]">
                                    <span>Total</span>
                                    <span>{cartTotal.toFixed(2)} KZ</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {totalQty} {totalQty === 1 ? 'item' : 'itens'}
                                </p>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="w-5 h-5 mt-0.5 border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 select-none">
                                        Aceito os{' '}
                                        <Link
                                            to="/termos"
                                            target="_blank"
                                            className="text-[var(--color-primary)] font-semibold hover:underline"
                                        >
                                            Termos e Condições
                                        </Link>
                                        {' '}da Essência Artesanal *
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!acceptedTerms}
                                className="w-full bg-green-600 text-white py-4 font-bold hover:bg-green-700 flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            >
                                <MessageCircle className="h-5 w-5" />
                                FINALIZAR VIA WHATSAPP
                            </button>

                            <Link to="/carrinho">
                                <button
                                    type="button"
                                    className="w-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] py-4 font-bold hover:bg-[var(--color-primary)] hover:text-white"
                                >
                                    VOLTAR AO CARRINHO
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
