import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from '../components/ui/sonner';
import * as api from '../services/api';

const CartContext = createContext(null);
const STORAGE_KEY = 'essencia-cart';

const getInitialState = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.map((item) => ({
        ...item,
        quantity: item.quantity ?? item.qty ?? 1,
      }))
      : [];
  } catch (error) {
    console.warn('Não foi possível carregar o carrinho.', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialState);
  const [loading, setLoading] = useState(false);

  // Load cart from backend on mount (if authenticated)
  useEffect(() => {
    loadCart();
  }, []);

  // Reload cart when authentication changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadCart = async () => {
    const token = api.getAuthToken();

    if (token) {
      // User authenticated - load from backend
      try {
        const data = await api.getCart();
        if (data && data.items && Array.isArray(data.items)) {
          // Backend cart items have productId and quantity
          // We need to fetch full product data for each item
          const itemsWithProducts = [];

          for (const cartItem of data.items) {
            try {
              const product = await api.getProductById(cartItem.productId);
              if (product) {
                itemsWithProducts.push({
                  ...product,
                  quantity: cartItem.quantity || 1,
                  productId: cartItem.productId,
                  id: product.id || cartItem.productId
                });
              }
            } catch (err) {
              console.error(`Error loading product ${cartItem.productId}:`, err);
            }
          }

          setItems(itemsWithProducts);
        }
      } catch (error) {
        console.error('Error loading cart from backend:', error);
        // Fallback to localStorage
        setItems(getInitialState());
      }
    } else {
      // Not authenticated - use localStorage
      setItems(getInitialState());
    }
  };

  // Save to localStorage when items change (fallback)
  useEffect(() => {
    if (!api.getAuthToken()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.warn('Não foi possível salvar o carrinho.', error);
      }
    }
  }, [items]);

  const addToCart = async (product, quantity = 1) => {
    const token = api.getAuthToken();

    if (!token) {
      // Not authenticated - use localhost
      addToCartLocal(product, quantity);
      return;
    }

    // Authenticated - use backend
    setLoading(true);
    try {
      await api.addToCart(product.id, quantity);

      // Update local state
      setItems((prev) => {
        const existing = prev.find((item) => (item.productId || item.id) === product.id);
        if (existing) {
          return prev.map((item) =>
            (item.productId || item.id) === product.id
              ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
              : item,
          );
        }
        return [...prev, { ...product, quantity: Math.max(1, quantity), productId: product.id }];
      });

      toast.success('✓ Adicionado ao Carrinho!', {
        description: `${product.name} foi adicionado`,
        duration: 2000
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erro ao adicionar ao carrinho');
    } finally {
      setLoading(false);
    }
  };

  const addToCartLocal = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
            : item,
        );
      }
      return [...prev, { ...product, quantity: Math.max(1, quantity) }];
    });

    toast.success('✓ Adicionado ao Carrinho!', {
      description: `${product.name} foi adicionado`,
      duration: 2000
    });
  };

  const addItem = (product) => addToCart(product, 1);

  const removeItem = async (id) => {
    const token = api.getAuthToken();

    if (token) {
      setLoading(true);
      try {
        await api.removeFromCart(id);
        setItems((prev) => prev.filter((item) => (item.productId || item.id) !== id));
        toast.success('Item removido do carrinho');
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast.error('Erro ao remover item');
      } finally {
        setLoading(false);
      }
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item removido do carrinho');
    }
  };

  const clearCart = async () => {
    const token = api.getAuthToken();

    if (token) {
      try {
        await api.clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }

    setItems([]);
    if (!token) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateQuantity = async (id, quantity) => {
    const token = api.getAuthToken();

    if (token) {
      setLoading(true);
      try {
        await api.updateCartItem(id, quantity);
        setItems((prev) =>
          prev
            .map((item) =>
              (item.productId || item.id) === id ? {
                ...item, quantity: Math.max(1, quantity)
              } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      } catch (error) {
        console.error('Error updating cart:', error);
        toast.error('Erro ao atualizar quantidade');
      } finally {
        setLoading(false);
      }
    } else {
      setItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    }
  };

  const value = useMemo(() => {
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartTotal = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    return {
      items,
      cart: items,
      addItem,
      addToCart,
      removeItem,
      removeFromCart: removeItem,
      clearCart,
      updateQuantity,
      totalQty,
      cartTotal,
      loading,
      refreshCart: loadCart
    };
  }, [items, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};
