import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllOrdersAdmin, updateOrderStatus } from '../../services/api';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
        }).format(value);
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
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        const labels = {
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
            <div className="mb-6 bg-white rounded-lg shadow-md p-2 inline-flex gap-2">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-['Poppins'] font-medium transition-colors ${filter === status
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {status === 'all' ? 'Todos' : status === 'pending' ? 'Pendentes' : status === 'confirmed' ? 'Confirmados' : status === 'completed' ? 'Completos' : 'Cancelados'}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-['Poppins']">
                                        Nenhum pedido encontrado
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-['Poppins'] font-medium text-gray-900">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.customerPhone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-['Poppins']">{formatDate(order.createdAt)}</td>
                                        <td className="px-6 py-4 text-sm font-['Poppins'] font-medium text-gray-900">{formatCurrency(order.total)}</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="text-sm border-gray-300 rounded-lg font-['Poppins'] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                            >
                                                <option value="pending">Pendente</option>
                                                <option value="confirmed">Confirmado</option>
                                                <option value="completed">Completo</option>
                                                <option value="cancelled">Cancelado</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Orders;
