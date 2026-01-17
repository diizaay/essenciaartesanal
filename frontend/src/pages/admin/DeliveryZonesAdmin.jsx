import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDeliveryZones, createDeliveryZone, updateDeliveryZone, deleteDeliveryZone } from '../../services/api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

const DeliveryZonesAdmin = () => {
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingZone, setEditingZone] = useState(null);
    const [formData, setFormData] = useState({
        province: '',
        city: '',
        fee: '',
        estimatedDays: '1-3 dias',
        isActive: true
    });

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = async () => {
        try {
            setLoading(true);
            const data = await getDeliveryZones();
            setZones(data);
        } catch (error) {
            console.error('Error fetching delivery zones:', error);
            toast.error('Erro ao carregar zonas de entrega');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const zoneData = {
                ...formData,
                fee: parseFloat(formData.fee)
            };

            if (editingZone) {
                await updateDeliveryZone(editingZone.id, zoneData);
                toast.success('Zona atualizada com sucesso');
            } else {
                await createDeliveryZone(zoneData);
                toast.success('Zona criada com sucesso');
            }

            setShowModal(false);
            setEditingZone(null);
            resetForm();
            fetchZones();
        } catch (error) {
            console.error('Error saving zone:', error);
            toast.error(error.response?.data?.detail || 'Erro ao salvar zona');
        }
    };

    const handleEdit = (zone) => {
        setEditingZone(zone);
        setFormData({
            province: zone.province,
            city: zone.city,
            fee: zone.fee.toString(),
            estimatedDays: zone.estimatedDays || '1-3 dias',
            isActive: zone.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (zoneId, zoneName) => {
        if (!window.confirm(`Tem certeza que deseja eliminar a zona "${zoneName}"?`)) {
            return;
        }

        try {
            await deleteDeliveryZone(zoneId);
            toast.success('Zona eliminada com sucesso');
            fetchZones();
        } catch (error) {
            console.error('Error deleting zone:', error);
            toast.error('Erro ao eliminar zona');
        }
    };

    const resetForm = () => {
        setFormData({
            province: '',
            city: '',
            fee: '',
            estimatedDays: '1-3 dias',
            isActive: true
        });
    };

    const handleNewZone = () => {
        setEditingZone(null);
        resetForm();
        setShowModal(true);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                        <p className="mt-4 text-[var(--color-text)] font-['Poppins']">A carregar zonas...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-['Poppins'] font-bold text-[var(--color-primary)]">Zonas de Entrega</h1>
                    <p className="text-[var(--color-muted)] font-['Poppins'] mt-1">{zones.length} zonas</p>
                </div>
                <button
                    onClick={handleNewZone}
                    className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide rounded-lg font-['Poppins']"
                >
                    <Plus className="w-5 h-5" />
                    Nova Zona
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-[var(--color-border)]">
                <table className="w-full">
                    <thead className="bg-[var(--color-bg-soft)]">
                        <tr className="text-left">
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Província</th>
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Município</th>
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Taxa</th>
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Prazo</th>
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Status</th>
                            <th className="px-6 py-4 text-sm font-bold text-[var(--color-primary)] font-['Poppins']">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                        {zones.map((zone) => (
                            <tr key={zone.id} className="hover:bg-[var(--color-bg-soft)] transition-colors">
                                <td className="px-6 py-4 font-semibold text-[var(--color-text)] font-['Poppins']">{zone.province}</td>
                                <td className="px-6 py-4 text-[var(--color-text)] font-['Poppins']">{zone.city}</td>
                                <td className="px-6 py-4 font-semibold text-[var(--color-primary)] font-['Poppins']">{zone.fee.toFixed(2)} KZ</td>
                                <td className="px-6 py-4 text-[var(--color-text)] font-['Poppins']">{zone.estimatedDays}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold font-['Poppins'] ${zone.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {zone.isActive ? 'Ativa' : 'Inativa'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(zone)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                                        >
                                            <Edit className="w-4 h-4 inline mr-1" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(zone.id, `${zone.province} - ${zone.city}`)}
                                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                        >
                                            <Trash2 className="w-4 h-4 inline mr-1" />
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                        <div className="p-6 border-b-2 border-[var(--color-border)]">
                            <h2 className="text-xl font-bold text-[var(--color-primary)] font-['Poppins']">
                                {editingZone ? 'Editar Zona' : 'Nova Zona de Entrega'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 font-['Poppins']">Província *</label>
                                <input
                                    type="text"
                                    value={formData.province}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="Ex: Luanda"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 font-['Poppins']">Município *</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="Ex: Viana"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 font-['Poppins']">Taxa de Entrega (KZ) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.fee}
                                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="500.00"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2 font-['Poppins']">Prazo de Entrega</label>
                                <input
                                    type="text"
                                    value={formData.estimatedDays}
                                    onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
                                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="1-3 dias"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5"
                                />
                                <label htmlFor="isActive" className="text-sm font-semibold text-[var(--color-text)] font-['Poppins']">Zona ativa</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingZone(null);
                                        resetForm();
                                    }}
                                    className="flex-1 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-soft)] transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                                >
                                    {editingZone ? 'Atualizar' : 'Criar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default DeliveryZonesAdmin;
