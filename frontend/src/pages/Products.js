import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { getProducts, getCategories } from '../services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Products = () => {
  const STORE_SLUG = 'essencia-artesanal-studio';
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(categoryParam ? { category: categoryParam } : {}),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryParam]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - manter ordem original
        break;
    }

    return filtered;
  }, [products, sortBy]);

  const currentCategory = categoryParam
    ? categories.find(c => c.slug === categoryParam)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Products Grid Section */}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-6 border-b-2 border-[var(--color-border)]">
          {/* Category Filter */}
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-[var(--color-primary)]" />
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Categorias
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!categoryParam ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchParams({})}
                className={!categoryParam ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white' : 'border border-[var(--color-border)] hover:border-[var(--color-primary)]'}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Todos
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={categoryParam === cat.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSearchParams({ categoria: cat.slug })}
                  className={categoryParam === cat.slug ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white' : 'border border-[var(--color-border)] hover:border-[var(--color-primary)]'}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 bg-[var(--color-bg-soft)] px-6 py-3 border border-[var(--color-border)]">
            <Filter className="h-5 w-5 text-[var(--color-primary)]" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[220px] border-0 focus:ring-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent style={{ fontFamily: 'Poppins, sans-serif' }}>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[var(--color-bg-soft)] mx-auto mb-6 flex items-center justify-center border border-[var(--color-border)]">
              <Package className="h-12 w-12 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Não há produtos disponíveis nesta categoria no momento.
            </p>
            <Button
              onClick={() => setSearchParams({})}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Ver Todos os Produtos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
