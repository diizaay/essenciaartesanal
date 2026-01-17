import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getBlogPostById } from '../services/api';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const data = await getBlogPostById(id);
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin border-4 border-solid border-[var(--color-primary)] border-r-transparent mb-4"></div>
                    <p className="text-[var(--color-text)] font-['Poppins']">A carregar artigo...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-['Poppins'] font-bold text-[var(--color-primary)] mb-4">
                        Artigo Não Encontrado
                    </h1>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-['Poppins']"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-['Poppins'] mb-6 transition-all hover:gap-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao Blog
                    </Link>

                    <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase font-['Poppins']">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6 font-['Poppins']">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-[var(--color-muted)] font-['Poppins']">
                        <span className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {new Date(post.date).toLocaleDateString('pt-PT', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {post.image && (
                <div className="max-w-[1200px] mx-auto px-4 -mt-10 mb-12">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-[400px] object-cover border-4 border-white shadow-xl"
                    />
                </div>
            )}

            {/* Content */}
            <div className="max-w-[800px] mx-auto px-4 pb-16">
                <div
                    className="prose prose-lg max-w-none font-['Poppins'] whitespace-pre-wrap"
                    style={{
                        color: 'var(--color-text)',
                    }}
                >
                    {post.content}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[var(--color-primary)] text-white py-16 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
                        Gostou deste Artigo?
                    </h2>
                    <p className="text-lg mb-8 text-white/90 font-['Poppins']">
                        Descubra mais sobre os nossos produtos artesanais únicos
                    </p>
                    <Link
                        to="/produtos"
                        className="inline-block bg-white text-[var(--color-primary)] px-8 py-4 font-bold transition-all duration-300 hover:bg-[var(--color-accent)] font-['Poppins'] uppercase tracking-wide"
                    >
                        Ver Produtos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
