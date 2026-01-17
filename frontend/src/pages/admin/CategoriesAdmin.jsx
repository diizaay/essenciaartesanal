import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getCategories, deleteCategory } from '../../services/api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CategoriesAdmin = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Erro ao carregar categorias');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (categoryId, categoryName) => {
        if (!window.confirm(`Tem certeza que deseja eliminar a categoria "${categoryName}"?`)) {
            return;
        }

        try {
            await deleteCategory(categoryId);
            toast.success('Categoria eliminada com sucesso');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Erro ao eliminar categoria');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                        <p className="mt-4 text-[var(--color-text)] font-['Poppins']">A carregar categorias...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">Gestão de Categorias</h1>
                    <p className="text-[var(--color-muted)] font-['Poppins'] mt-1">{categories.length} categorias</p>
                </div>
                <button
                    onClick={() => navigate('/admin/categorias/nova')}
                    className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide rounded-lg font-['Poppins']"
                >
                    <Plus className="w-5 h-5" />
                    Nova Categoria
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[var(--color-border)]">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-['Poppins'] font-bold text-[var(--color-primary)] mb-2">{category.name}</h3>
                            <p className="text-sm text-[var(--color-muted)] font-['Poppins'] mb-4">Slug: {category.slug}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/categorias/editar/${category.id}`)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white uppercase tracking-wide rounded-lg font-['Poppins']"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-wide rounded-lg font-['Poppins']"
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

export default CategoriesAdmin;
