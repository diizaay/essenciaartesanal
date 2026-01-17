import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import Badge from './Badge';
import Price from './Price';

const ProductCard = ({ product, featured, hideTags = false }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const image = product.images?.[0] || product.image;
  const tags = product.tags || (product.featured ? ['top', 'bestseller'] : []);
  const favorited = isFavorite(product.id);

  const handleAdd = (event) => {
    event.preventDefault();
    addItem({ ...product, image });
  };

  const handleFavorite = (event) => {
    event.preventDefault();
    toggleFavorite({ ...product, image });
  };

  return (
    <article
      onClick={() => navigate(`/produtos/${product.id}`)}
      className="group relative border border-[var(--color-accent)]/30 bg-white overflow-hidden transition-all hover-lift h-full flex flex-col cursor-pointer"
    >
      <div className="relative">
        <img
          src={image}
          alt={product.name}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!hideTags && product.discount && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="default">-{product.discount}%</Badge>
          </div>
        )}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 opacity-0 translate-y-3 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); handleAdd(e); }}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 text-[12px] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ShoppingBag className="h-4 w-4" />
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleFavorite(e); }}
            className={`h-10 w-10 grid place-items-center rounded-full border transition-all shadow-sm ${favorited ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-[var(--color-primary)] border-[var(--color-accent)]/30 hover:border-[var(--color-accent)]'
              }`}
            aria-label="Adicionar aos favoritos"
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="space-y-2 px-5 py-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-800 flex-1 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</h3>
        {/* Show lowest price if has variants, otherwise normal price */}
        {product.variants && product.variants.length > 0 ? (
          <div>
            <p className="text-xs text-gray-500 mb-1">A partir de</p>
            <Price price={Math.min(...product.variants.map(v => v.price))} discount={product.discount} />
          </div>
        ) : (
          <Price price={product.price} discount={product.discount} />
        )}
      </div>
    </article>
  );
};

export default ProductCard;
