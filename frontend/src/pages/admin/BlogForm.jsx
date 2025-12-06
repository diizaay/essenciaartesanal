import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { uploadImage, createBlogPost, updateBlogPost, getBlogPostById } from '../../services/api';
import { toast } from 'sonner';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        category: 'Dicas',
        published: false,
    });

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const post = await getBlogPostById(id);
            if (post) {
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    image: post.image || '',
                    category: post.category,
                    published: post.published,
                });
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error('Erro ao carregar artigo');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const result = await uploadImage(file);
            setFormData(prev => ({
                ...prev,
                image: result.url
            }));
            toast.success('Imagem carregada com sucesso');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Erro ao carregar imagem');
        } finally {
            setUploadingImage(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error('Por favor, adicione uma imagem de destaque');
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await updateBlogPost(id, formData);
                toast.success('Artigo atualizado com sucesso!');
            } else {
                await createBlogPost(formData);
                toast.success('Artigo criado com sucesso!');
            }
            navigate('/admin/blog');
        } catch (error) {
            console.error('Error saving blog post:', error);
            toast.error(id ? 'Erro ao atualizar artigo' : 'Erro ao criar artigo');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Dicas', 'Produtos', 'Sobre Nós', 'Tendências', 'Bastidores'];

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/admin/blog')}
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-['Poppins'] mb-4 transition-all hover:gap-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para blog
                    </button>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">
                        {id ? 'Editar Artigo' : 'Novo Artigo'}
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 space-y-6 border-2 border-[var(--color-border)]">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Título *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Slug (URL)
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            readOnly
                            className="w-full px-4 py-3 border-2 border-[var(--color-border)] font-['Poppins'] bg-gray-50"
                        />
                        <p className="text-xs text-[var(--color-muted)] mt-1 font-['Poppins']">Gerado automaticamente</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Categoria *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] font-['Poppins']"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Resumo *
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Conteúdo *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="10"
                            className="w-full px-4 py-3 border-2 border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] resize-none"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Imagem de Destaque *
                        </label>

                        <label className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg font-['Poppins'] font-medium cursor-pointer uppercase tracking-wide">
                            <Upload className="w-5 h-5" />
                            {uploadingImage ? 'A carregar...' : 'Carregar Imagem'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="hidden"
                            />
                        </label>

                        {formData.image && (
                            <div className="mt-4 relative inline-block group">
                                <img
                                    src={formData.image}
                                    alt="Destaque"
                                    className="w-full max-w-md h-48 object-cover border-2 border-[var(--color-border)] transition-transform duration-300 hover:scale-105"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Published */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="w-5 h-5 border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <span className="font-['Poppins'] text-[var(--color-text)]">Publicar artigo</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || uploadingImage}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90 uppercase tracking-wide font-['Poppins'] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'A guardar...' : id ? 'Atualizar Artigo' : 'Criar Artigo'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default BlogForm;
