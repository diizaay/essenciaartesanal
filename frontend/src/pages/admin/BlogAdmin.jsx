import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Calendar, Eye } from 'lucide-react';
import { getBlogPosts, deleteBlogPost, toggleBlogPostPublished } from '../../services/api';

const BlogAdmin = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await getBlogPosts(false); // Get all posts (published and unpublished)
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Erro ao carregar artigos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId, postTitle) => {
        if (!window.confirm(`Tem certeza que deseja eliminar "${postTitle}"?`)) {
            return;
        }

        try {
            await deleteBlogPost(postId);
            setPosts(posts.filter(p => p.id !== postId));
            toast.success('Artigo eliminado com sucesso');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Erro ao eliminar artigo');
        }
    };

    const togglePublished = async (postId) => {
        try {
            const result = await toggleBlogPostPublished(postId);
            setPosts(posts.map(p =>
                p.id === postId ? { ...p, published: result.published } : p
            ));
            toast.success('Status atualizado');
        } catch (error) {
            console.error('Error toggling publish:', error);
            toast.error('Erro ao atualizar status');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                        <p className="mt-4 text-[var(--color-text)] font-['Poppins']">A carregar artigos...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">Gestão de Blog</h1>
                    <p className="text-[var(--color-muted)] font-['Poppins'] mt-1">{posts.length} artigos</p>
                </div>
                <button
                    onClick={() => navigate('/admin/blog/novo')}
                    className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide font-['Poppins']"
                >
                    <Plus className="w-5 h-5" />
                    Novo Artigo
                </button>
            </div>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--color-border)] flex flex-col md:flex-row"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full md:w-64 h-48 object-cover"
                        />
                        <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-['Poppins'] font-bold text-[var(--color-primary)] mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-muted)] font-['Poppins'] mb-4">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-['Poppins'] font-semibold ${post.published
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {post.published ? 'Publicado' : 'Rascunho'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-[var(--color-muted)] font-['Poppins'] mb-4">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.date).toLocaleDateString('pt-PT')}
                                </span>
                                <span>por {post.author}</span>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => navigate(`/blog/${post.id}`)}
                                    className="inline-flex items-center gap-2 bg-gray-100 text-[var(--color-text)] px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-gray-200 uppercase tracking-wide font-['Poppins']"
                                >
                                    <Eye className="w-4 h-4" />
                                    Ver
                                </button>
                                <button
                                    onClick={() => navigate(`/admin/blog/editar/${post.id}`)}
                                    className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wide font-['Poppins']"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => togglePublished(post.id)}
                                    className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white uppercase tracking-wide font-['Poppins']"
                                >
                                    {post.published ? 'Despublicar' : 'Publicar'}
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id, post.title)}
                                    className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-wide font-['Poppins']"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default BlogAdmin;
