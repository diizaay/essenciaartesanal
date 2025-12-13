import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../components/ui/sonner';
import * as api from '../services/api';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carregar favoritos do backend ao iniciar (se autenticado) ou do localStorage
    useEffect(() => {
        loadFavorites();
    }, []);

    // Listen for auth changes (login/logout)
    useEffect(() => {
        const handleLogout = () => {
            console.log('🔴 Favorites: Clearing on logout');
            setFavorites([]);
            localStorage.removeItem('favorites');
        };

        const handleLogin = () => {
            console.log('🟢 Favorites: Reloading on login');
            loadFavorites();
        };

        window.addEventListener('auth:logout', handleLogout);
        window.addEventListener('auth:login', handleLogin);

        return () => {
            window.removeEventListener('auth:logout', handleLogout);
            window.removeEventListener('auth:login', handleLogin);
        };
    }, []);

    const loadFavorites = async () => {
        const token = api.getAuthToken();

        if (token) {
            // Usuário autenticado - carregar do backend
            try {
                const data = await api.getFavorites();
                // Backend retorna produtos completos
                setFavorites(data || []);
            } catch (error) {
                console.error('Error loading favorites from backend:', error);
                // Fallback para localStorage
                loadFromLocalStorage();
            }
        } else {
            // Não autenticado - usar localStorage
            loadFromLocalStorage();
        }
    };

    const loadFromLocalStorage = () => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading favorites from localStorage:', error);
            }
        }
    };

    // Salvar no localStorage quando mudar (fallback)
    useEffect(() => {
        if (!api.getAuthToken()) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const toggleFavorite = async (product) => {
        const token = api.getAuthToken();

        if (!token) {
            // Não autenticado - usar localStorage
            toggleFavoriteLocal(product);
            return;
        }

        // Autenticado - usar backend
        setLoading(true);
        try {
            const exists = favorites.find(item => item.id === product.id);

            if (exists) {
                // Remover dos favoritos
                await api.removeFavorite(product.id);
                setFavorites(prev => prev.filter(item => item.id !== product.id));
                toast.success('✓ Removido dos Favoritos', {
                    description: `${product.name} foi removido da sua lista`,
                    duration: 2000
                });
            } else {
                // Adicionar aos favoritos
                await api.addFavorite(product.id);
                setFavorites(prev => [...prev, product]);
                toast.success('✓ Adicionado aos Favoritos!', {
                    description: `${product.name} está na sua lista`,
                    duration: 2000
                });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Erro ao atualizar favoritos');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavoriteLocal = (product) => {
        setFavorites(prev => {
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                toast.success('✓ Removido dos Favoritos', {
                    description: `${product.name} foi removido`,
                    duration: 2000
                });
                return prev.filter(item => item.id !== product.id);
            } else {
                toast.success('✓ Adicionado aos Favoritos!', {
                    description: `${product.name} está na sua lista`,
                    duration: 2000
                });
                return [...prev, product];
            }
        });
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const clearFavorites = async () => {
        const token = api.getAuthToken();

        if (token) {
            // Limpar do backend
            try {
                // Remover todos individualmente
                await Promise.all(favorites.map(fav => api.removeFavorite(fav.id)));
            } catch (error) {
                console.error('Error clearing favorites:', error);
            }
        }

        setFavorites([]);
        if (!token) {
            localStorage.removeItem('favorites');
        }
        toast.info('Lista de Favoritos Limpa');
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            clearFavorites,
            totalFavorites: favorites.length,
            loading,
            refreshFavorites: loadFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
