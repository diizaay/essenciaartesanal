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

export const getAddresses = async () => {
  const response = await api.get('/addresses');
  return response.data;
};

export const createAddress = async (address) => {
  const response = await api.post('/addresses', address);
  return response.data;
};

export const updateAddress = async (addressId, address) => {
  const response = await api.put(`/addresses/${addressId}`, address);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await api.delete(`/addresses/${id}`);
  return response.data;
};

// ========== FAVORITES ==========

export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addFavorite = async (productId) => {
  const response = await api.post('/favorites', { productId });
  return response.data;
};

export const removeFavorite = async (productId) => {
  const response = await api.delete(`/favorites/${productId}`);
  return response.data;
};

export const checkFavorite = async (productId) => {
  const response = await api.get(`/favorites/check/${productId}`);
  return response.data;
};

// ========== CART ==========

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart/items', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/items/${productId}?quantity=${quantity}`);
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

// Get product by ID
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Categories
export const getCategories = async (store) => {
  const response = await api.get('/categories', { params: store ? { store } : {} });
  return response.data;
};

export const createCategory = async (category) => {
  const response = await api.post('/categories', category);
  return response.data;
};

// Products
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.featured !== undefined) params.append('featured', filters.featured);
  if (filters.store) params.append('store', filters.store);
  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

// Orders
export const createOrder = async (order) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const createWhatsappOrder = async (order) => {
  const response = await api.post('/orders/whatsapp', order);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Seed (development only)
export const seedDatabase = async () => {
  const response = await api.post('/seed');
  return response.data;
};

// ========== ADMIN ROUTES ==========

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getAllOrdersAdmin = async (status = null) => {
  const params = status ? { status } : {};
  const response = await api.get('/admin/orders', { params });
  return response.data;
};

// ========== BLOG ==========

export const getBlogPosts = async (publishedOnly = true) => {
  const params = publishedOnly ? '?published=true' : '';
  const response = await api.get(`/blog${params}`);
  return response.data;
};

export const getBlogPostById = async (postId) => {
  const response = await api.get(`/blog/${postId}`);
  return response.data;
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
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
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
  const response = await api.get(`/products/${productId}/rating`);
  return response.data;
};

export const updateProduct = async (productId, product) => {
  const response = await api.put(`/products/${productId}`, product);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

export const updateCategory = async (categoryId, category) => {
  const response = await api.put(`/categories/${categoryId}`, category);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status?status=${status}`);
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/admin/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export default api;
