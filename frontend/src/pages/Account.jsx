// Account.jsx - Página da conta do usuário
// Implementa todas as funcionalidades solicitadas:
//  • Remove opções "Meus pedidos" e "Pedidos antigos"
//  • Remove botão de favoritos do header (coração) que estava fora de lugar
//  • Aba "Segurança" com formulário de alteração de senha
//  • Aba "Lista de desejos" exibe produtos favoritados
//  • Botões padronizados com as cores do site (var(--color-primary) e var(--color-accent))

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { User, MapPin, Lock } from 'lucide-react';

const Account = () => {
    const navigate = useNavigate();
    const { logout: contextLogout, isAuthenticated } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        contactName: '', phone: '', province: '', city: '', neighborhood: '', street: ''
    });
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('dados');
    const [activeView, setActiveView] = useState('login'); // State for login/register tabs
    const [loading, setLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '', newPassword: '', confirmPassword: ''
    });

    // ---------------------------------------------------------------------
    // Carrega dados do usuário, endereços e favoritos ao montar o componente
    // ---------------------------------------------------------------------
    useEffect(() => {
        const loadAll = async () => {
            try {
                // Dados do usuário
                const userResponse = await api.getMe();
                if (userResponse) {
                    setFormData({
                        name: userResponse.name || '',
                        email: userResponse.email || '',
                        phone: userResponse.phone || ''
                    });
                }
                // Endereços
                const userAddresses = await api.getAddresses();
                setAddresses(userAddresses || []);
                // Favoritos
                await loadFavoriteProducts();
            } catch (err) {
                console.error('Erro ao carregar dados da conta:', err);
                contextLogout();
                navigate('/conta');
            } finally {
                setInitialLoading(false);
            }
        };

        if (isLoggedIn) {
            loadAll();
        } else {
            setInitialLoading(false);
        }
    }, [isLoggedIn]);

    // Recarrega favoritos quando aba "Lista de desejos" é aberta
    useEffect(() => {
        if (isAuthenticated && activeTab === 'desejos') {
            loadFavoriteProducts();
        }
    }, [activeTab, isAuthenticated]);

    const loadFavoriteProducts = async () => {
        try {
            const products = await api.getFavorites();
            setFavoriteProducts(products || []);
        } catch (err) {
            console.error('Erro ao carregar favoritos:', err);
            setFavoriteProducts([]);
        }
    };

    // ---------------------------------------------------------------------
    // Handlers genéricos
    // ---------------------------------------------------------------------
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressInputChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.login({
                email: formData.email,
                password: formData.password
            });
            if (response && response.access_token) {
                api.setAuthToken(response.access_token);
                toast.success('Login realizado com sucesso!');
                window.location.href = '/conta'; // força recarregamento completo
            } else {
                toast.error('Email ou senha incorretos');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.detail || err.message;
            if (errorMsg.toLowerCase().includes('not found') || errorMsg.toLowerCase().includes('invalid')) {
                toast.error('Conta não encontrada. Verifique seu email ou crie uma conta.');
            } else {
                toast.error('Erro ao fazer login. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.register({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone
            });
            if (response && response.access_token) {
                api.setAuthToken(response.access_token);
                toast.success('Conta criada com sucesso!');
                window.location.href = '/conta';
            } else {
                toast.error('Erro ao criar conta. Tente novamente.');
            }
        } catch (err) {
            console.error('Register error:', err);
            const errorMsg = err.response?.data?.detail || err.message;
            if (errorMsg.toLowerCase().includes('already') || errorMsg.toLowerCase().includes('existe')) {
                toast.error('Este email já está registrado. Faça login ou use outro email.');
            } else if (errorMsg.toLowerCase().includes('phone')) {
                toast.error('Este telefone já está registrado.');
            } else {
                toast.error('Erro ao criar conta. Verifique seus dados.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        console.log('🚪 Account: Logging out via AuthContext');
        contextLogout();
        toast.success('Logout realizado!');
        navigate('/');
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const created = await api.createAddress(newAddress);
            if (created) {
                setAddresses([...addresses, created]);
                setNewAddress({
                    contactName: '', phone: '', province: '', city: '', neighborhood: '', street: ''
                });
                toast.success('Endereço adicionado!');
            }
        } catch (err) {
            toast.error('Erro ao adicionar endereço');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm('Excluir este endereço?')) {
            setLoading(true);
            try {
                await api.deleteAddress(id);
                setAddresses(addresses.filter((addr) => addr.id !== id));
                toast.success('Endereço removido!');
            } catch (err) {
                toast.error('Erro ao remover endereço');
            } finally {
                setLoading(false);
            }
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = passwordData;
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Preencha todos os campos');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Nova senha e confirmação não coincidem');
            return;
        }
        setLoading(true);
        try {
            // TODO: Implementar endpoint de alteração de senha no backend
            toast.info('Funcionalidade em desenvolvimento - Backend precisa implementar endpoint de alteração de senha');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error('Erro ao alterar senha');
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------
    // Renderização condicional
    // ---------------------------------------------------------------------
    if (initialLoading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--color-bg-soft)] py-12">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white border-2 border-[var(--color-border)] p-8">
                        {/* Logo/Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins' }}>
                                {activeView === 'login' ? 'Entrar' : 'Cadastre-se'}
                            </h1>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setActiveView('login')}
                                className={`flex-1 py-3 font-bold transition-all ${activeView === 'login'
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Entrar
                            </button>
                            <button
                                onClick={() => setActiveView('register')}
                                className={`flex-1 py-3 font-bold transition-all ${activeView === 'register'
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Criar Conta
                            </button>
                        </div>

                        {/* Login Form */}
                        {activeView === 'login' && (
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="seu@email.com"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Senha</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] py-3 font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                                <p className="text-center text-gray-600 mt-4">
                                    Não tem uma conta?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveView('register')}
                                        className="text-[var(--color-primary)] font-semibold hover:underline"
                                    >
                                        Cadastre-se
                                    </button>
                                </p>
                            </form>
                        )}

                        {/* Register Form */}
                        {activeView === 'register' && (
                            <form onSubmit={handleRegister} className="space-y-5">
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Nome Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Seu nome"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="seu@email.com"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Telefone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+244 900 000 000"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-700">Senha</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                        className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] py-3 font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Criando...' : 'Criar Conta'}
                                </button>
                                <p className="text-center text-gray-600 mt-4">
                                    Já tem uma conta?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveView('login')}
                                        className="text-[var(--color-primary)] font-semibold hover:underline"
                                    >
                                        Entrar
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------------------
    // UI da conta (logado)
    // ---------------------------------------------------------------------
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Header do usuário */}
                <div className="bg-white border-2 border-[var(--color-border)] p-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[var(--color-primary)] flex items-center justify-center text-white text-2xl font-bold">
                            {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>
                                {formData.name || 'Utilizador'}
                            </h3>
                            <p className="text-sm text-gray-600">{formData.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 font-bold hover:opacity-90">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                        Sair
                    </button>
                </div>

                <div className="grid md:grid-cols-[250px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab('dados')}
                            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold ${activeTab === 'dados'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-white border-2 border-[var(--color-border)] text-gray-700 hover:border-[var(--color-primary)]'}`}
                        >
                            <User className="h-5 w-5" /> Dados pessoais
                        </button>
                        <button
                            onClick={() => setActiveTab('enderecos')}
                            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold ${activeTab === 'enderecos'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-white border-2 border-[var(--color-border)] text-gray-700 hover:border-[var(--color-primary)]'}`}
                        >
                            <MapPin className="h-5 w-5" /> Endereços
                        </button>
                        <button
                            onClick={() => setActiveTab('seguranca')}
                            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold ${activeTab === 'seguranca'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-white border-2 border-[var(--color-border)] text-gray-700 hover:border-[var(--color-primary)]'}`}
                        >
                            <Lock className="h-5 w-5" /> Segurança
                        </button>
                        <button
                            onClick={() => setActiveTab('desejos')}
                            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold ${activeTab === 'desejos'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-white border-2 border-[var(--color-border)] text-gray-700 hover:border-[var(--color-primary)]'}`}
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Lista de desejos
                        </button>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="bg-white border-2 border-[var(--color-border)] p-8">
                        {/* Dados pessoais */}
                        {activeTab === 'dados' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-semibold mb-2">Nome</label>
                                        <input type="text" value={formData.name} disabled className="w-full px-4 py-3 border-2 border-[var(--color-border)] bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-2">Email</label>
                                        <input type="email" value={formData.email} disabled className="w-full px-4 py-3 border-2 border-[var(--color-border)] bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-2">Telefone</label>
                                        <input type="tel" value={formData.phone} disabled className="w-full px-4 py-3 border-2 border-[var(--color-border)] bg-gray-50" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Endereços */}
                        {activeTab === 'enderecos' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Meus Endereços</h2>
                                <div className="space-y-4 mb-8">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className="border-2 border-[var(--color-border)] p-4 flex justify-between">
                                            <div>
                                                <p className="font-bold">{addr.contactName}</p>
                                                <p>{addr.street}, {addr.neighborhood}</p>
                                                <p>{addr.city}, {addr.province}</p>
                                                <p>{addr.phone}</p>
                                            </div>
                                            <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:text-red-700 font-semibold">
                                                Excluir
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleAddAddress} className="space-y-4 border-t-2 pt-4">
                                    <h3 className="font-bold text-lg">Adicionar Novo Endereço</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold mb-2">Nome Contato</label>
                                            <input type="text" name="contactName" value={newAddress.contactName} onChange={handleAddressInputChange} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Telefone</label>
                                            <input type="tel" name="phone" value={newAddress.phone} onChange={handleAddressInputChange} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Província</label>
                                            <input type="text" name="province" value={newAddress.province} onChange={handleAddressInputChange} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Município</label>
                                            <input type="text" name="city" value={newAddress.city} onChange={handleAddressInputChange} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Bairro</label>
                                            <input type="text" name="neighborhood" value={newAddress.neighborhood} onChange={handleAddressInputChange} className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Rua</label>
                                            <input type="text" name="street" value={newAddress.street} onChange={handleAddressInputChange} className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 font-bold hover:bg-[var(--color-primary)] hover:text-white">
                                        {loading ? 'Adicionando...' : 'Adicionar Endereço'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Segurança - alteração de senha */}
                        {activeTab === 'seguranca' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Segurança</h2>
                                <p className="text-gray-600 mb-4">Altere sua senha abaixo.</p>
                                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block font-semibold mb-2">Senha atual</label>
                                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-2">Nova senha</label>
                                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-2">Confirmar nova senha</label>
                                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none" />
                                    </div>
                                    <button type="submit" disabled={loading} className="bg-[var(--color-primary)] text-white px-6 py-2 font-bold hover:opacity-90">
                                        {loading ? 'Alterando...' : 'Alterar senha'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Lista de desejos */}
                        {activeTab === 'desejos' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Lista de Desejos</h2>
                                <p className="text-gray-600 mb-4">Produtos que você salvou para depois.</p>
                                {favoriteProducts.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {favoriteProducts.map((product) => (
                                            <div key={product.id} className="border-2 border-[var(--color-border)] p-4 hover:shadow-lg transition-shadow">
                                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                                <p className="text-[var(--color-primary)] font-bold text-xl mb-4">{product.price.toFixed(2)} KZ</p>
                                                <button onClick={() => navigate(`/produtos/${product.id}`)} className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] py-2 font-bold hover:bg-[var(--color-primary)] hover:text-white">
                                                    Ver Produto
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Nenhum produto favoritado.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
