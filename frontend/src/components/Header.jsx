import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../hooks/useAuth';
import { getCategories } from '../services/api';
import SearchModal from './SearchModal';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Categorias', to: '/categorias' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contacto', to: '/contacto' },
];

const Header = () => {
  const { totalQty } = useCart();
  const { totalFavorites } = useFavorites();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Erro ao carregar categorias:', e);
      }
    })();
  }, []);

  const isActive = (to) =>
    location.pathname === new URL(to, 'https://dummy').pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-border-soft)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
            <img src="logo.png" alt="Essência Artesanal" className="h-12 w-auto" />
          </Link>

          {/* Navigation - centered */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <React.Fragment key={item.label}>
                <Link
                  to={item.to}
                  className={[
                    'px-3 text-[15px] transition-colors font-medium',
                    isActive(item.to)
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
                {i < navItems.length - 1 && (
                  <span aria-hidden className="text-[var(--color-muted)] px-1">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Pesquisar"
              className="h-11 w-11 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:shadow-sm hover:-translate-y-0.5 transition"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/favoritos"
              aria-label={`Favoritos (${totalFavorites} itens)`}
              className="relative h-11 w-11 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:shadow-sm hover:-translate-y-0.5 transition"
            >
              <Heart className="h-5 w-5" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 grid place-items-center rounded-full bg-[var(--color-primary)] text-white text-[10px] font-semibold">
                  {totalFavorites}
                </span>
              )}
            </Link>
            <Link
              to="/carrinho"
              aria-label={`Carrinho (${totalQty} itens)`}
              className="relative h-11 w-11 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:shadow-sm hover:-translate-y-0.5 transition"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 grid place-items-center rounded-full bg-[var(--color-primary)] text-white text-[10px] font-semibold">
                  {totalQty}
                </span>
              )}
            </Link>
            <Link
              to="/conta"
              aria-label="Minha conta"
              className="h-11 w-11 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:shadow-sm hover:-translate-y-0.5 transition"
            >
              <User className="h-5 w-5" />
            </Link>
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sair"
                className="h-11 w-11 grid place-items-center rounded-full bg-white border border-[var(--color-border-soft)] text-[var(--color-text)] hover:text-red-600 hover:shadow-sm hover:-translate-y-0.5 transition"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Mobile icons and menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Pesquisar"
              className="h-10 w-10 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)]"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/carrinho"
              aria-label={`Carrinho (${totalQty} itens)`}
              className="relative h-10 w-10 grid place-items-center bg-white border border-[var(--color-border-soft)] text-[var(--color-text)]"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 grid place-items-center rounded-full bg-[var(--color-primary)] text-white text-[10px] font-semibold">
                  {totalQty}
                </span>
              )}
            </Link>

            <button
              className="h-10 w-10 grid place-items-center border border-[var(--color-border-soft)] text-[var(--color-primary)]"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border-soft)] bg-[var(--color-bg-soft)] px-6 py-6 space-y-4 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="border-t border-[var(--color-border-soft)] my-4"></div>

          {/* Account link */}
          <Link
            to="/conta"
            className="flex items-center gap-3 text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <User className="h-5 w-5" />
            Minha Conta
          </Link>

          {/* Favorites link */}
          <Link
            to="/favoritos"
            className="flex items-center gap-3 text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Heart className="h-5 w-5" />
            Favoritos
            {totalFavorites > 0 && (
              <span className="ml-auto h-6 min-w-[24px] px-2 grid place-items-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                {totalFavorites}
              </span>
            )}
          </Link>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
