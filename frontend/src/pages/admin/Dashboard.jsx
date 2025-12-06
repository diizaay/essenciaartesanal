import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import { getAdminStats, getAllOrdersAdmin } from '../../services/api';
import { Package, ShoppingCart, Users, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: { total: 0 },
        orders: { total: 0, pending: 0, completed: 0 },
        users: { total: 0 },
        revenue: { total: 0 }
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsData, ordersData] = await Promise.all([
                getAdminStats(),
                getAllOrdersAdmin()
            ]);
            setStats(statsData);
            setRecentOrders(ordersData.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="inline-block h-12 w-12 animate-spin border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                </div>
            </AdminLayout>
        );
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA'
        }).format(value);
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending: 'Pendente',
            confirmed: 'Confirmado',
            completed: 'Completo',
            cancelled: 'Cancelado'
        };
        return labels[status] || status;
    };

    return (
        <AdminLayout>
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-['Poppins'] font-bold text-[var(--color-primary)] mb-2">
                    Bem-vindo ao Painel
                </h2>
                <p className="text-[var(--color-muted)] font-['Poppins']">
                    Aqui está uma visão geral do seu negócio
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total de Produtos"
                    value={stats.products.total}
                    icon={Package}
                    color="primary"
                />
                <StatsCard
                    title="Pedidos Pendentes"
                    value={stats.orders.pending}
                    icon={Clock}
                    color="warning"
                />
                <StatsCard
                    title="Total de Utilizadores"
                    value={stats.users.total}
                    icon={Users}
                    color="info"
                />
                <StatsCard
                    title="Receita Total"
                    value={formatCurrency(stats.revenue.total)}
                    icon={TrendingUp}
                    color="success"
                />
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md p-6 border-2 border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-['Poppins'] font-bold text-[var(--color-text)]">
                            Visão de Pedidos
                        </h3>
                        <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-['Poppins'] text-[var(--color-muted)]">Total</span>
                            <span className="text-2xl font-['Poppins'] font-bold text-[var(--color-text)]">
                                {stats.orders.total}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-['Poppins'] text-[var(--color-muted)]">Pendentes</span>
                            <span className="text-xl font-['Poppins'] font-semibold text-yellow-600">
                                {stats.orders.pending}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-['Poppins'] text-[var(--color-muted)]">Completos</span>
                            <span className="text-xl font-['Poppins'] font-semibold text-green-600">
                                {stats.orders.completed}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-gradient-to-br from-[var(--color-primary)] to-[#7d1a28] shadow-md p-6 text-white">
                    <h3 className="text-lg font-['Poppins'] font-bold mb-2">
                        Estatísticas de Vendas
                    </h3>
                    <p className="text-sm opacity-90 mb-4 font-['Poppins']">
                        Receita e desempenho geral
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm opacity-75 font-['Poppins']">Receita Total</p>
                            <p className="text-3xl font-['Poppins'] font-bold">{formatCurrency(stats.revenue.total)}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-75 font-['Poppins']">Pedidos Completos</p>
                            <p className="text-3xl font-['Poppins'] font-bold">{stats.orders.completed}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow-md p-6 border-2 border-[var(--color-border)]">
                <h3 className="text-xl font-['Poppins'] font-bold text-[var(--color-primary)] mb-6">
                    Pedidos Recentes
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-[var(--color-border)]">
                                <th className="text-left py-3 px-4 font-['Poppins'] font-semibold text-[var(--color-text)]">
                                    ID
                                </th>
                                <th className="text-left py-3 px-4 font-['Poppins'] font-semibold text-[var(--color-text)]">
                                    Cliente
                                </th>
                                <th className="text-left py-3 px-4 font-['Poppins'] font-semibold text-[var(--color-text)]">
                                    Total
                                </th>
                                <th className="text-left py-3 px-4 font-['Poppins'] font-semibold text-[var(--color-text)]">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 font-['Poppins'] font-semibold text-[var(--color-text)]">
                                    Data
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-soft)] transition-colors">
                                    <td className="py-4 px-4 font-['Poppins'] text-sm text-[var(--color-text)]">
                                        #{order.id.slice(0, 8)}
                                    </td>
                                    <td className="py-4 px-4 font-['Poppins'] text-sm text-[var(--color-text)]">
                                        {order.shippingAddress?.name || 'N/A'}
                                    </td>
                                    <td className="py-4 px-4 font-['Poppins'] text-sm font-semibold text-[var(--color-text)]">
                                        {formatCurrency(order.total)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 text-xs font-['Poppins'] font-semibold ${getStatusColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-['Poppins'] text-sm text-[var(--color-muted)]">
                                        {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {recentOrders.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-muted)] font-['Poppins']">
                                Nenhum pedido encontrado
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
