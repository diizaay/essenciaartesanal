import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductVariants from '../../components/admin/ProductVariants';
import ProductDetails from '../../components/admin/ProductDetails';
import { createProduct, updateProduct, getProductById, getCategories, uploadImage } from '../../services/api';
import { toast } from 'sonner';
import { Save, ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: '',
        price: '',
        description: '',
        images: [],
        inStock: true,
        featured: false,
        isNew: false,
        variants: [],  // Product variants
        details: [],   // Product details/specifications
    });

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const product = await getProductById(id);
            setFormData({
                name: product.name,
                slug: product.slug,
                category: product.category,
                price: product.price,
                description: product.description,
                images: product.images || [],
                inStock: product.inStock,
                featured: product.featured,
                isNew: product.isNew || false,
                variants: product.variants || [],
                details: product.details || [],
            });
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Erro ao carregar produto');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
        const files = Array.from(e.target.files);

        for (const file of files) {
            try {
                setUploadingImage(true);
                const result = await uploadImage(file);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, result.url]
                }));
                toast.success(`Imagem ${file.name} carregada com sucesso`);
            } catch (error) {
                console.error('Upload error:', error);
                toast.error(`Erro ao carregar ${file.name}`);
            } finally {
                setUploadingImage(false);
            }
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.images.length === 0) {
            toast.error('Por favor adicione pelo menos uma imagem');
            return;
        }

        setLoading(true);
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
            };

            if (id) {
                await updateProduct(id, productData);
                toast.success('Produto atualizado com sucesso!');
            } else {
                await createProduct(productData);
                toast.success('Produto criado com sucesso!');
            }

            navigate('/admin/produtos');
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(id ? 'Erro ao atualizar produto' : 'Erro ao criar produto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/admin/produtos')}
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-['Poppins'] mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para produtos
                    </button>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-text)]">
                        {id ? 'Editar Produto' : 'Novo Produto'}
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white  shadow-md p-8 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Nome do Produto *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[var(--color-border)]  focus:outline-none focus:border-[var(--color-primary)] font-['Poppins']"
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
                            className="w-full px-4 py-2 border border-[var(--color-border)]  focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] bg-gray-50"
                            readOnly
                        />
                        <p className="text-xs text-[var(--color-muted)] mt-1 font-['Poppins']">Gerado automaticamente a partir do nome</p>
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                                Categoria *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[var(--color-border)]  focus:outline-none focus:border-[var(--color-primary)] font-['Poppins']"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                                Preço (AOA) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border border-[var(--color-border)]  focus:outline-none focus:border-[var(--color-primary)] font-['Poppins']"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Descrição *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-[var(--color-border)]  focus:outline-none focus:border-[var(--color-primary)] font-['Poppins'] resize-none"
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-['Poppins'] font-medium text-[var(--color-text)] mb-2">
                            Imagens * (mínimo 1)
                        </label>

                        {/* Upload Button */}
                        <label className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)]  hover:opacity-90 transition-opacity font-['Poppins'] font-medium cursor-pointer">
                            <Upload className="w-5 h-5" />
                            {uploadingImage ? 'A carregar...' : 'Carregar Imagem'}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="hidden"
                            />
                        </label>

                        {/* Image Preview Grid */}
                        {formData.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={img}
                                            alt={`Produto ${index + 1}`}
                                            className="w-full h-32 object-cover  border border-[var(--color-border)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1  opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.images.length === 0 && (
                            <div className="mt-4 border border-dashed border-[var(--color-border)]  p-8 text-center">
                                <ImageIcon className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-2" />
                                <p className="text-[var(--color-muted)] font-['Poppins']">Nenhuma imagem adicionada</p>
                            </div>
                        )}
                    </div>

                    {/* Product Variants */}
                    <div>
                        <ProductVariants
                            variants={formData.variants}
                            setVariants={(variants) => setFormData({ ...formData, variants })}
                        />
                    </div>

                    {/* Product Details/Specifications */}
                    <div>
                        <ProductDetails
                            details={formData.details}
                            setDetails={(details) => setFormData({ ...formData, details })}
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                                className="w-5 h-5 border border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <span className="font-['Poppins'] text-[var(--color-text)]">Produto em stock</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-5 h-5 border border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <span className="font-['Poppins'] text-[var(--color-text)]">Produto em destaque</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isNew"
                                checked={formData.isNew}
                                onChange={handleChange}
                                className="w-5 h-5 border border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <span className="font-['Poppins'] text-[var(--color-text)]">Novidade (aparece em "Adicionados Recentemente")</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || uploadingImage}
                            className="flex-1 bg-[var(--color-primary)] text-white py-3 px-6  font-['Poppins'] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'A guardar...' : id ? 'Atualizar Produto' : 'Criar Produto'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProductForm;
