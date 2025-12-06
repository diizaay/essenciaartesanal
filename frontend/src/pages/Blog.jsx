import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { getBlogPosts } from '../services/api';

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            setLoading(true);
            const posts = await getBlogPosts(true); // Only published posts
            setBlogPosts(posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique categories from posts
    const categories = ['Todos', ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = selectedCategory === 'Todos'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin border-4 border-solid border-[var(--color-primary)] border-r-transparent mb-4"></div>
                    <p className="text-[var(--color-text)] font-['Poppins']">A carregar artigos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            BLOG
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Histórias, Dicas e Inspiração
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Explora o nosso blog para descobrir dicas úteis, histórias inspiradoras e tudo sobre<br />o mundo dos produtos artesanais.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b-2 border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-[var(--color-primary)]" />
                    <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Filtrar por Categoria
                    </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 font-semibold transition-all duration-300 ${selectedCategory === category
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'border-2 border-[var(--color-border)] text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                }`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group bg-white border-2 border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            {/* Image */}
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-48 w-full object-cover border-b-2 border-[var(--color-border)] group-hover:opacity-90 transition-opacity duration-300"
                                />
                            ) : (
                                <div className="h-48 bg-[var(--color-bg-soft)] flex items-center justify-center border-b-2 border-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                                    <Tag className="h-16 w-16 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {/* Category & Date */}
                                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <Tag className="h-4 w-4" />
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <Calendar className="h-4 w-4" />
                                        {new Date(post.date).toLocaleDateString('pt-PT', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-[var(--color-primary)] mb-3 group-hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {post.excerpt}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                                    <User className="h-4 w-4" />
                                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>{post.author}</span>
                                </div>

                                {/* Read More Link */}
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all duration-300"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Ler Mais
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[var(--color-primary)] text-white py-16 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Recebe as Nossas Novidades
                    </h2>
                    <p className="text-lg mb-8 text-white/90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Subscreve a nossa newsletter e fica a par das últimas novidades, dicas e promoções exclusivas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="O teu email"
                            className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                        <button
                            className="bg-white text-[var(--color-primary)] px-8 py-4 font-bold transition-all duration-300 hover:bg-[var(--color-accent)] whitespace-nowrap"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Subscrever
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
