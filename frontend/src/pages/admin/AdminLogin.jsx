import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login({ email, password });

            if (result.success) {
                if (result.user.isAdmin) {
                    toast.success('Login de administrador bem-sucedido!');
                    navigate('/admin');
                } else {
                    toast.error('Acesso negado. Esta área é restrita a administradores.');
                    logout();
                }
            } else {
                toast.error(result.error || 'Credenciais inválidas');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-soft)] to-[var(--color-bg-soft-2)] px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)] mb-4 shadow-lg">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-['Poppins'] font-bold text-[var(--color-primary)] mb-2">
                        Painel Administrativo
                    </h1>
                    <p className="text-[var(--color-muted)] font-['Poppins']">
                        Essência Artesanal
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[var(--color-border)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                                Email de Administrador
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-lg font-['Poppins'] font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:-translate-y-1"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    A entrar...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Entrar no Painel
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-muted)] text-center font-['Poppins']">
                            Área restrita apenas para administradores autorizados
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-sm text-[var(--color-primary)] hover:underline font-['Poppins'] font-medium"
                    >
                        ← Voltar ao site
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
