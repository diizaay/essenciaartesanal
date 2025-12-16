import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, MapPin, MessageCircle, Truck, AlertCircle, ChevronDown } from 'lucide-react';
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
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [deliveryEstimate, setDeliveryEstimate] = useState('');
    const [deliveryZones, setDeliveryZones] = useState([]);
    const [selectedZoneId, setSelectedZoneId] = useState('');
    const [isZoneDropdownOpen, setIsZoneDropdownOpen] = useState(false);

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
                // Load delivery zones first
                const zones = await api.getPublicDeliveryZones();
                setDeliveryZones(zones || []);

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

                        // Try to auto-select matching zone
                        if (zones && zones.length > 0) {
                            const matchingZone = zones.find(z =>
                                z.province.toLowerCase() === (defaultAddr.province || '').toLowerCase() &&
                                z.city.toLowerCase() === (defaultAddr.city || '').toLowerCase()
                            );
                            if (matchingZone) {
                                setSelectedZoneId(matchingZone.id);
                                setDeliveryFee(matchingZone.fee);
                                setDeliveryEstimate(matchingZone.estimatedDays);
                            }
                        }
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

    // Handle zone selection
    const handleZoneSelect = (zoneId) => {
        setSelectedZoneId(zoneId);
        if (zoneId) {
            const zone = deliveryZones.find(z => z.id === zoneId);
            if (zone) {
                setDeliveryFee(zone.fee);
                setDeliveryEstimate(zone.estimatedDays);
                setFormData(prev => ({
                    ...prev,
                    province: zone.province,
                    city: zone.city
                }));
            }
        } else {
            setDeliveryFee(0);
            setDeliveryEstimate('');
        }
    };

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
        message += '*ITENS:*%0A%0A';

        items.forEach((item, index) => {
            const price = item.price || 0;
            const qty = item.quantity || 1;

            message += `[${index + 1}] ${item.name.toUpperCase()}%0A`;

            // SKU if available
            if (item.sku) {
                message += `    » SKU: ${item.sku}%0A`;
            }

            // Variant if selected
            if (item.selectedVariant && item.selectedVariant.name) {
                message += `    » Variante: ${item.selectedVariant.name}%0A`;
            }

            // Quantity and prices
            message += `    » Quantidade: ${qty}x%0A`;
            message += `    » Preco: ${price.toFixed(2)} KZ cada%0A`;
            message += `    » Subtotal: ${(price * qty).toFixed(2)} KZ%0A%0A`;
        });

        message += `Subtotal Produtos: ${cartTotal.toFixed(2)} KZ%0A`;

        // Include selected zone info
        const selectedZone = deliveryZones.find(z => z.id === selectedZoneId);
        if (selectedZone) {
            message += `%0A*ZONA DE ENTREGA:*%0A`;
            message += `Zona: ${selectedZone.province} - ${selectedZone.city}%0A`;
            message += `Taxa de Entrega: ${deliveryFee.toFixed(2)} KZ%0A`;
            message += `Prazo Estimado: ${selectedZone.estimatedDays}%0A`;
        } else {
            message += `Taxa de Entrega: ${deliveryFee.toFixed(2)} KZ%0A`;
        }

        message += `%0A*TOTAL: ${(cartTotal + deliveryFee).toFixed(2)} KZ*%0A%0A`;
        message += '*DADOS DO CLIENTE:*%0A';
        message += `Nome: ${formData.name}%0A`;
        message += `Email: ${formData.email}%0A`;
        message += `Telefone: ${formData.phone}%0A%0A`;
        message += '*ENDERECO DE ENTREGA:*%0A';
        message += `${formData.street}%0A`;
        if (formData.neighborhood) {
            message += `Bairro: ${formData.neighborhood}%0A`;
        }
        if (selectedZone) {
            message += `${selectedZone.city}, ${selectedZone.province}%0A`;
        }

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

        if (!formData.name || !formData.phone) {
            toast.error('Por favor, preencha nome e telefone');
            return;
        }

        if (deliveryZones.length > 0 && !selectedZoneId) {
            toast.error('Por favor, selecione uma zona de entrega');
            return;
        }

        if (!formData.street) {
            toast.error('Por favor, informe seu endereço completo');
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
                total: cartTotal + deliveryFee,
                deliveryFee: deliveryFee,
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

                        {/* Endereço e Zona de Entrega */}
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
                                    <label className="block font-semibold mb-2">Rua / Endereço Completo *</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ex: Rua 123, Casa 45"
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
                                        placeholder="Ponto de referência, instruções de entrega..."
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

                            {/* Products List */}
                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id || item.productId} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} ({item.quantity}x)
                                        </span>
                                        <span className="font-semibold">
                                            {((item.price || 0) * (item.quantity || 1)).toLocaleString()} KZ
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Subtotal Products */}
                            <div className="border-t-2 border-[var(--color-border)] pt-4 mb-4">
                                <div className="flex justify-between text-sm mb-4">
                                    <span className="text-gray-600">Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'itens'})</span>
                                    <span className="font-semibold">{cartTotal.toLocaleString()} KZ</span>
                                </div>
                            </div>

                            {/* Delivery Zone Selection - Collapsible Dropdown */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Truck className="h-5 w-5 text-[var(--color-primary)]" />
                                    <span className="font-semibold text-sm">Zona de Entrega</span>
                                </div>

                                {deliveryZones.length > 0 ? (
                                    <div className="relative">
                                        {/* Dropdown Toggle Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsZoneDropdownOpen(!isZoneDropdownOpen)}
                                            className={`w-full flex items-center justify-between p-3 border-2 text-sm text-left transition-all ${selectedZoneId
                                                    ? 'border-[var(--color-primary)] bg-white'
                                                    : 'border-gray-300 bg-white hover:border-gray-400'
                                                }`}
                                        >
                                            {selectedZoneId ? (
                                                <div className="flex-1">
                                                    <span className="font-medium block">
                                                        {deliveryZones.find(z => z.id === selectedZoneId)?.province} - {deliveryZones.find(z => z.id === selectedZoneId)?.city}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {deliveryZones.find(z => z.id === selectedZoneId)?.estimatedDays}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">Selecione sua zona de entrega...</span>
                                            )}
                                            <div className="flex items-center gap-2">
                                                {selectedZoneId && (
                                                    <span className="font-bold text-[var(--color-primary)]">
                                                        {deliveryFee > 0 ? `${deliveryFee.toLocaleString()} KZ` : 'Grátis'}
                                                    </span>
                                                )}
                                                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isZoneDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                        </button>

                                        {/* Dropdown Options */}
                                        {isZoneDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 shadow-lg max-h-48 overflow-y-auto">
                                                {deliveryZones.map(zone => (
                                                    <button
                                                        type="button"
                                                        key={zone.id}
                                                        onClick={() => {
                                                            handleZoneSelect(zone.id);
                                                            setIsZoneDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between p-3 text-sm text-left hover:bg-gray-50 transition-colors ${selectedZoneId === zone.id ? 'bg-[var(--color-bg-soft)]' : ''
                                                            }`}
                                                    >
                                                        <div>
                                                            <span className="font-medium block">{zone.province} - {zone.city}</span>
                                                            <span className="text-xs text-gray-500">{zone.estimatedDays}</span>
                                                        </div>
                                                        <span className="font-bold text-[var(--color-primary)]">
                                                            {zone.fee > 0 ? `${zone.fee.toLocaleString()} KZ` : 'Grátis'}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                        <span>Nenhuma zona disponível. Contacte via WhatsApp.</span>
                                    </div>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="border-t-2 border-[var(--color-border)] pt-4 mb-6 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Taxa de Entrega</span>
                                    <span className="font-semibold">
                                        {deliveryFee > 0 ? `${deliveryFee.toLocaleString()} KZ` : 'Selecione uma zona'}
                                    </span>
                                </div>
                                {selectedZoneId && deliveryEstimate && (
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Prazo estimado</span>
                                        <span>{deliveryEstimate}</span>
                                    </div>
                                )}
                                <div className="border-t-2 border-[var(--color-primary)] pt-3 mt-3">
                                    <div className="flex justify-between text-xl font-bold text-[var(--color-primary)]">
                                        <span>TOTAL</span>
                                        <span>{(cartTotal + deliveryFee).toLocaleString()} KZ</span>
                                    </div>
                                </div>
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
