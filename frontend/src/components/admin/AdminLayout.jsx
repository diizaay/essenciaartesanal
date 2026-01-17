import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Package,
    FolderOpen,
    ShoppingCart,
    Users,
    FileText,
    Menu,
    X,
    LogOut,
    Truck
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/produtos', icon: Package, label: 'Produtos' },
        { path: '/admin/categorias', icon: FolderOpen, label: 'Categorias' },
        { path: '/admin/pedidos', icon: ShoppingCart, label: 'Pedidos' },
        { path: '/admin/entregas', icon: Truck, label: 'Zonas de Entrega' },
        { path: '/admin/utilizadores', icon: Users, label: 'Utilizadores' },
        { path: '/admin/blog', icon: FileText, label: 'Blog' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-soft)]">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r-2 border-[var(--color-border)] shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo / Header */}
                    <div className="p-6 border-b-2 border-[var(--color-border)]">
                        <Link to="/" className="block">
                            <img src="/logo.png" alt="Lia" className="h-10 w-auto" />
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden absolute top-6 right-6 text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3
                    font-['Poppins'] font-medium transition-all duration-200
                    ${isActive
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                                        }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t-2 border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                        <div className="mb-3 px-2">
                            <p className="text-sm font-['Poppins'] font-semibold text-[var(--color-text)] truncate">{user?.name}</p>
                            <p className="text-xs text-[var(--color-muted)] truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[var(--color-primary)] hover:bg-red-50 hover:text-red-600 font-['Poppins'] font-medium transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="bg-white shadow-sm sticky top-0 z-30 border-b-2 border-[var(--color-border)]">
                    <div className="flex items-center justify-between px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-[var(--color-text)] hover:text-[var(--color-primary)]"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">
                                {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center gap-3 text-sm font-['Poppins']">
                            <span className="text-[var(--color-muted)]">Bem-vindo,</span>
                            <span className="font-semibold text-[var(--color-primary)]">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
