import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { createCategory, updateCategory, getCategories, uploadImage } from '../../services/api';
import { toast } from 'sonner';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image: '',
    });

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const categories = await getCategories();
            const category = categories.find(cat => cat.id === id);
            if (category) {
                setFormData({
                    name: category.name,
                    slug: category.slug,
                    image: category.image || '',
                });
            }
        } catch (error) {
            console.error('Error fetching category:', error);
            toast.error('Erro ao carregar categoria');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-generate slug from name
        if (name === 'name') {
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
        setFormData(prev => ({
            ...prev,
            image: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error('Por favor adicione uma imagem');
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await updateCategory(id, formData);
                toast.success('Categoria atualizada com sucesso!');
            } else {
                await createCategory(formData);
                toast.success('Categoria criada com sucesso!');
            }

            navigate('/admin/categorias');
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error(id ? 'Erro ao atualizar categoria' : 'Erro ao criar categoria');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/admin/categorias')}
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-['Poppins'] mb-4 transition-all hover:gap-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para categorias
                    </button>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">
                        {id ? 'Editar Categoria' : 'Nova Categoria'}
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6 border border-[var(--color-border)]">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Nome da Categoria *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] transition-colors"
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
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] bg-gray-50"
                            readOnly
                        />
                        <p className="text-xs text-[var(--color-muted)] mt-1 font-['Poppins']">Gerado automaticamente a partir do nome</p>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Imagem *
                        </label>

                        {/* Upload Button */}
                        <label className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg font-['Poppins'] font-medium cursor-pointer uppercase tracking-wide">
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

                        {/* Image Preview */}
                        {formData.image && (
                            <div className="mt-4 relative inline-block group">
                                <img
                                    src={formData.image}
                                    alt="Categoria"
                                    className="w-full max-w-sm h-48 object-cover rounded-lg border border-[var(--color-border)] transition-transform duration-300 hover:scale-105"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || uploadingImage}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-['Poppins']"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'A guardar...' : id ? 'Atualizar Categoria' : 'Criar Categoria'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CategoryForm;
