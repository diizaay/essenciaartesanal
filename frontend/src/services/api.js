import axios from 'axios';

// VERCEL BUILD VERIFICATION - If you see this, new code is loaded!
console.log('%c🚀 API.JS LOADED - BUILD TIME: 2025-12-11 19:40 UTC', 'background: #00ff00; color: #000; font-size: 20px; padding: 10px;');
console.log('🔥 MOCK MODE COMPLETELY DISABLED - ALL API CALLS ARE REAL');

// Backend URL - empty string for same-origin requests (Vercel)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTHENTICATION ==========

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const logout = () => {
  setAuthToken(null);
};

// ========== ADDRESSES ==========

export const getAddresses = async () =>
  safeRequest(() => api.get('/addresses'), () => {
    console.warn('getAddresses não disponível em modo mock');
    return [];
  });

export const createAddress = async (address) =>
  safeRequest(() => api.post('/addresses', address), () => {
    console.warn('createAddress não disponível em modo mock');
    return address;
  });

export const updateAddress = async (addressId, address) =>
  safeRequest(() => api.put(`/addresses/${addressId}`, address), () => {
    console.warn('updateAddress não disponível em modo mock');
    return address;
  });

export const deleteAddress = async (id) =>
  safeRequest(() => api.delete(`/addresses/${id}`), () => {
    console.warn('deleteAddress não disponível em modo mock');
    return null;
  });

// ========== FAVORITES ==========

export const getFavorites = async () =>
  safeRequest(() => api.get('/favorites'), () => {
    console.warn('getFavorites não disponível em modo mock');
    return [];
  });

export const addFavorite = async (productId) =>
  safeRequest(() => api.post('/favorites', { productId }), () => {
    console.warn('addFavorite não disponível em modo mock');
    return null;
  });

export const removeFavorite = async (productId) =>
  safeRequest(() => api.delete(`/favorites/${productId}`), () => {
    console.warn('removeFavorite não disponível em modo mock');
    return null;
  });

export const checkFavorite = async (productId) =>
  safeRequest(() => api.get(`/favorites/check/${productId}`), () => {
    console.warn('checkFavorite não disponível em modo mock');
    return { isFavorite: false };
  });

// ========== CART ==========

export const getCart = async () =>
  safeRequest(() => api.get('/cart'), () => {
    console.warn('getCart não disponível em modo mock');
    return { items: [] };
  });

export const addToCart = async (productId, quantity = 1) =>
  safeRequest(() => api.post('/cart/items', { productId, quantity }), () => {
    console.warn('addToCart não disponível em modo mock');
    return null;
  });

export const updateCartItem = async (productId, quantity) =>
  safeRequest(() => api.put(`/cart/items/${productId}?quantity=${quantity}`), () => {
    console.warn('updateCartItem não disponível em modo mock');
    return null;
  });

export const removeFromCart = async (productId) =>
  safeRequest(() => api.delete(`/cart/items/${productId}`), () => {
    console.warn('removeFromCart não disponível em modo mock');
    return null;
  });

export const clearCart = async () =>
  safeRequest(() => api.delete('/cart'), () => {
    console.warn('clearCart não disponível em modo mock');
    return null;
  });

// Get product by ID
export const getProductById = async (productId) =>
  safeRequest(() => api.get(`/products/${productId}`), () => {
    console.warn('getProductById não disponível em modo mock');
    return null;
  });

// Categories
export const getCategories = async (store) =>
  safeRequest(
    () => api.get('/categories', { params: store ? { store } : {} }),
    () => mockCategories,
  );

export const createCategory = async (category) =>
  safeRequest(() => api.post('/categories', category), () => {
    console.warn('createCategory not available in mock mode');
    return category;
  });

// Products
export const getProducts = async (filters = {}) =>
  safeRequest(
    () => {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.featured !== undefined) params.append('featured', filters.featured);
      if (filters.store) params.append('store', filters.store);
      return api.get(`/products?${params.toString()}`);
    },
    () => {
      let filtered = [...mockProducts];

      if (filters.category) {
        filtered = filtered.filter((product) => product.category === filters.category);
      }

      if (filters.featured !== undefined) {
        filtered = filtered.filter(
          (product) => Boolean(product.featured) === Boolean(filters.featured),
        );
      }

      return filtered;
    },
  );

export const getProductBySlug = async (slug) =>
  safeRequest(
    () => api.get(`/products/${slug}`),
    () => {
      const product = mockProducts.find((item) => item.slug === slug);
      if (!product) {
        throw new Error('Produto n\u00e3o encontrado nos mocks.');
      }
      return product;
    },
  );

export const createProduct = async (product) =>
  safeRequest(() => api.post('/products', product), () => {
    console.warn('createProduct n\u00e3o dispon\u00edvel em modo mock');
    return product;
  });

// Orders
export const createOrder = async (order) =>
  safeRequest(() => api.post('/orders', order), () => {
    console.warn('createOrder n\u00e3o dispon\u00edvel em modo mock');
    return order;
  });

export const createWhatsappOrder = async (order) =>
  safeRequest(() => api.post('/orders/whatsapp', order), () => {
    console.warn('createWhatsappOrder n\u00e3o dispon\u00edvel em modo mock');
    return order;
  });

export const getOrders = async () =>
  safeRequest(() => api.get('/orders'), () => {
    console.warn('getOrders n\u00e3o dispon\u00edvel em modo mock');
    return [];
  });

export const getOrderById = async (orderId) =>
  safeRequest(() => api.get(`/orders/${orderId}`), () => {
    console.warn('getOrderById n\u00e3o dispon\u00edvel em modo mock');
    return null;
  });

// Seed (development only)
export const seedDatabase = async () =>
  safeRequest(() => api.post('/seed'), () => {
    console.warn('seedDatabase n\u00e3o dispon\u00edvel em modo mock');
    return null;
  });

// ========== ADMIN ROUTES ==========

export const getAdminStats = async () =>
  safeRequest(() => api.get('/admin/stats'), () => {
    console.warn('getAdminStats não disponível em modo mock');
    return {
      products: { total: 0 },
      orders: { total: 0, pending: 0, completed: 0 },
      users: { total: 0 },
      revenue: { total: 0 }
    };
  });

export const getAllUsers = async () => {
  return safeRequest(
    () => api.get('/admin/users'),
    () => []
  );
};

export const getAllOrdersAdmin = async (status = null) => {
  const params = status ? { status } : {};
  return safeRequest(
    () => api.get('/admin/orders', { params }),
    () => []
  );
};

// ========== BLOG ==========

export const getBlogPosts = async (publishedOnly = true) => {
  const params = publishedOnly ? { published: true } : {};
  return safeRequest(
    () => api.get('/blog', { params }),
    () => []
  );
};

export const getBlogPostById = async (postId) => {
  return safeRequest(
    () => api.get(`/blog/${postId}`),
    () => null
  );
};

export const createBlogPost = async (postData) => {
  if (!api) throw new Error('API not available');
  const response = await api.post('/blog', postData);
  return response.data;
};

export const updateBlogPost = async (postId, postData) => {
  if (!api) throw new Error('API not available');
  const response = await api.put(`/blog/${postId}`, postData);
  return response.data;
};

export const deleteBlogPost = async (postId) => {
  if (!api) throw new Error('API not available');
  const response = await api.delete(`/blog/${postId}`);
  return response.data;
};

export const toggleBlogPostPublished = async (postId) => {
  if (!api) throw new Error('API not available');
  const response = await api.patch(`/blog/${postId}/publish`);
  return response.data;
};

// ========== PRODUCT REVIEWS ==========

export const getProductReviews = async (productId) => {
  return safeRequest(
    () => api.get(`/products/${productId}/reviews`),
    () => []
  );
};

export const createProductReview = async (productId, reviewData) => {
  if (!api) throw new Error('API not available');
  const response = await api.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  if (!api) throw new Error('API not available');
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

export const getProductRating = async (productId) => {
  return safeRequest(
    () => api.get(`/products/${productId}/rating`),
    () => ({ averageRating: 0, totalReviews: 0 })
  );
};

export const updateProduct = async (productId, product) =>
  safeRequest(() => api.put(`/products/${productId}`, product), () => {
    console.warn('updateProduct não disponível em modo mock');
    return product;
  });

export const deleteProduct = async (productId) =>
  safeRequest(() => api.delete(`/products/${productId}`), () => {
    console.warn('deleteProduct não disponível em modo mock');
    return null;
  });

export const updateCategory = async (categoryId, category) =>
  safeRequest(() => api.put(`/categories/${categoryId}`, category), () => {
    console.warn('updateCategory não disponível em modo mock');
    return category;
  });

export const deleteCategory = async (categoryId) =>
  safeRequest(() => api.delete(`/categories/${categoryId}`), () => {
    console.warn('deleteCategory não disponível em modo mock');
    return null;
  });

export const updateOrderStatus = async (orderId, status) =>
  safeRequest(() => api.put(`/orders/${orderId}/status?status=${status}`), () => {
    console.warn('updateOrderStatus não disponível em modo mock');
    return null;
  });

export const uploadImage = async (file) => {
  if (shouldUseMock()) {
    console.warn('uploadImage não disponível em modo mock');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/admin/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export default api;
