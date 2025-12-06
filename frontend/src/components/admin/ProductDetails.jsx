import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ProductDetails = ({ details, setDetails }) => {
    const [newDetail, setNewDetail] = React.useState({ label: '', value: '' });

    const handleAddDetail = () => {
        if (!newDetail.label.trim() || !newDetail.value.trim()) {
            return;
        }

        const detail = {
            label: newDetail.label.trim(),
            value: newDetail.value.trim()
        };

        setDetails([...details, detail]);
        setNewDetail({ label: '', value: '' });
    };

    const handleDeleteDetail = (index) => {
        setDetails(details.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Detalhes do Produto (Opcional)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                    Adicione especificações como materiais, dimensões, localização, etc.
                </p>
            </div>

            {/* Add Detail Form */}
            <div className="bg-gray-50 border-2 border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <input
                            type="text"
                            placeholder="Título (ex: Materiais)"
                            value={newDetail.label}
                            onChange={(e) => setNewDetail({ ...newDetail, label: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:border-[var(--color-primary)] outline-none text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Valor (ex: Prata de lei, 14k banhado a ouro)"
                            value={newDetail.value}
                            onChange={(e) => setNewDetail({ ...newDetail, value: e.target.value })}
                            className="flex-1 px-3 py-2 border-2 border-gray-300 focus:border-[var(--color-primary)] outline-none text-sm"
                        />
                        <button
                            type="button"
                            onClick={handleAddDetail}
                            className="bg-[var(--color-primary)] text-white px-4 py-2 hover:opacity-90 flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            {/* Details List */}
            {details.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-semibold">Detalhes Adicionados:</p>
                    {details.map((detail, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-white border-2 border-gray-200 p-3"
                        >
                            <div className="flex-1">
                                <span className="font-semibold text-sm">{detail.label}:</span>
                                <span className="text-gray-700 ml-2 text-sm">{detail.value}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleDeleteDetail(index)}
                                className="text-red-600 hover:text-red-700 p-2"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
