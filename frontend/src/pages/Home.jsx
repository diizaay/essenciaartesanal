import React, { useEffect, useState } from 'react';
import Features from '../components/Features';
import GiftIdeasBanner from '../components/GiftIdeasBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryGrid from '../components/CategoryGrid';
import Newsletter from '../components/Newsletter';
import ProductGrid from '../components/ProductGrid';
import AboutStrip from '../components/AboutStrip';
import { getCategories, getProducts } from '../services/api';
import Hero from '../components/Hero';

const STORE_SLUG = 'essencia-artesanal-studio';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const [loadedCategories, loadedProducts] = await Promise.all([
        getCategories(),
        getProducts({ featured: true }),
      ]);
      setCategories(Array.isArray(loadedCategories) ? loadedCategories : []);
      setProducts(Array.isArray(loadedProducts) ? loadedProducts : []);
    })();
  }, []);

  return (
    <div className="space-y-24">
      <Hero />
      <Features />
      <GiftIdeasBanner />
      <FeaturedProducts products={products} />
      <CategoryGrid categories={categories} />
      <Newsletter />
      <ProductGrid products={products} />
      <AboutStrip />
    </div>
  );
};

export default Home;
