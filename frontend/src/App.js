import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Account from "./pages/Account";
import Favoritos from "./pages/Favoritos";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import AdminCategories from "./pages/admin/CategoriesAdmin";
import CategoryForm from "./pages/admin/CategoryForm";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogForm from "./pages/admin/BlogForm";
import DeliveryZonesAdmin from "./pages/admin/DeliveryZonesAdmin";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App min-h-screen flex flex-col bg-[var(--color-bg)]">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/envios" element={<Shipping />} />
          <Route path="/devolucoes" element={<Returns />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/ajuda" element={<Help />} />
          <Route path="/conta" element={<Account />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/produtos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/produtos/novo"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/produtos/editar/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias/nova"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CategoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias/editar/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CategoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/utilizadores"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BlogAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/novo"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/editar/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/entregas"
            element={
              <ProtectedRoute requireAdmin={true}>
                <DeliveryZonesAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
