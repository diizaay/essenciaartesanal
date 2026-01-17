import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllOrdersAdmin, updateOrderStatus } from '../../services/api';
import { toast } from 'sonner';
import { RefreshCw, ChevronDown, ChevronUp, Package, MapPin, Phone, User } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, [filter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const statusParam = filter !== 'all' ? filter : null;
            const data = await getAllOrdersAdmin(statusParam);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Erro ao carregar pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            toast.success('Status atualizado com sucesso');
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Erro ao atualizar status');
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
        }).format(value || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-orange-100 text-orange-800 border border-orange-300',
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        const labels = {
            draft: 'Rascunho',
            pending: 'Pendente',
            confirmed: 'Confirmado',
            completed: 'Completo',
            cancelled: 'Cancelado',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-['Poppins'] font-medium ${badges[status] || badges.pending}`}>
                {labels[status] || status}
            </span>
        );
    };

    const getShortId = (id) => {
        return id ? id.slice(-8).toUpperCase() : 'N/A';
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                        <p className="mt-4 text-[var(--color-text)] font-['Poppins']">A carregar pedidos...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-gray-900">Gestão de Pedidos</h1>
                    <p className="text-gray-500 font-['Poppins'] mt-1">{orders.length} pedidos encontrados</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-['Poppins']"
                >
                    <RefreshCw className="w-5 h-5" />
                    Atualizar
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-2 inline-flex gap-2 flex-wrap">
                {['all', 'draft', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-['Poppins'] font-medium transition-colors ${filter === status
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {status === 'all' ? 'Todos' : status === 'draft' ? 'Rascunhos' : status === 'pending' ? 'Pendentes' : status === 'confirmed' ? 'Confirmados' : status === 'completed' ? 'Completos' : 'Cancelados'}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500 font-['Poppins']">
                        Nenhum pedido encontrado
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white shadow-md overflow-hidden">
                            {/* Order Header - Clickable */}
                            <div
                                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleExpand(order.id)}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <div className="text-xs text-gray-500 font-['Poppins']">ID</div>
                                            <div className="font-bold text-[var(--color-primary)] font-['Poppins']">#{getShortId(order.id)}</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 font-['Poppins']">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.customerPhone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                                            <div className="font-bold text-lg font-['Poppins']">{formatCurrency(order.total)}</div>
                                        </div>
                                        {getStatusBadge(order.status)}
                                        {expandedOrderId === order.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedOrderId === order.id && (
                                <div className="border-t border-gray-200 bg-gray-50 p-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 font-['Poppins'] mb-3 flex items-center gap-2">
                                                <Package className="w-4 h-4" /> Itens do Pedido
                                            </h4>
                                            <div className="space-y-2">
                                                {order.items && order.items.length > 0 ? (
                                                    order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm bg-white p-2 rounded">
                                                            <span>
                                                                {item.productName || item.name || `Produto ${item.productId}`}
                                                                <span className="text-gray-500 ml-1">x{item.quantity}</span>
                                                            </span>
                                                            <span className="font-medium">
                                                                {formatCurrency((item.price || 0) * (item.quantity || 1))}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-gray-500">Sem itens detalhados</div>
                                                )}
                                            </div>

                                            {/* Totals */}
                                            <div className="mt-3 pt-3 border-t space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Subtotal:</span>
                                                    <span>{formatCurrency((order.total || 0) - (order.deliveryFee || 0))}</span>
                                                </div>
                                                {order.deliveryFee > 0 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Taxa de Entrega:</span>
                                                        <span>{formatCurrency(order.deliveryFee)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between font-bold text-[var(--color-primary)]">
                                                    <span>Total:</span>
                                                    <span>{formatCurrency(order.total)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customer & Delivery Info */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 font-['Poppins'] mb-3 flex items-center gap-2">
                                                <User className="w-4 h-4" /> Dados do Cliente
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <span>{order.customerName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <span>{order.customerPhone}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <span>{order.customerAddress || 'Sem endereço'}</span>
                                                </div>
                                            </div>

                                            {order.notes && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold text-gray-900 font-['Poppins'] mb-2">Observações</h4>
                                                    <div className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                                                        {order.notes}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Status Change */}
                                            <div className="mt-4">
                                                <h4 className="font-semibold text-gray-900 font-['Poppins'] mb-2">Alterar Status</h4>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="w-full text-sm border-gray-300 rounded-lg font-['Poppins'] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] p-2"
                                                >
                                                    <option value="draft">Rascunho</option>
                                                    <option value="pending">Pendente</option>
                                                    <option value="confirmed">Confirmado</option>
                                                    <option value="completed">Completo</option>
                                                    <option value="cancelled">Cancelado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
};

export default Orders;
