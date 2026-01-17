import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ProductVariants = ({ variants, setVariants }) => {
    const [newVariant, setNewVariant] = React.useState({ name: '', price: '' });

    const handleAddVariant = () => {
        if (!newVariant.name.trim() || !newVariant.price) {
            return;
        }

        const variant = {
            id: `variant-${Date.now()}`,
            name: newVariant.name.trim(),
            price: parseFloat(newVariant.price)
        };

        setVariants([...variants, variant]);
        setNewVariant({ name: '', price: '' });
    };

    const handleDeleteVariant = (variantId) => {
        setVariants(variants.filter(v => v.id !== variantId));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Variantes do Produto (Opcional)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                    Para brincos, adicione opções como "Brinco Normal", "Base Antialérgica", etc.
                </p>
            </div>

            {/* Add Variant Form */}
            <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <input
                            type="text"
                            placeholder="Nome da variante (ex: Brinco Normal)"
                            value={newVariant.name}
                            onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 focus:border-[var(--color-primary)] outline-none text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Preço (KZ)"
                            value={newVariant.price}
                            onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                            className="flex-1 px-3 py-2 border border-gray-300 focus:border-[var(--color-primary)] outline-none text-sm"
                            step="0.01"
                            min="0"
                        />
                        <button
                            type="button"
                            onClick={handleAddVariant}
                            className="bg-[var(--color-primary)] text-white px-4 py-2 hover:opacity-90 flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            {/* Variants List */}
            {variants.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-semibold">Variantes Adicionadas:</p>
                    {variants.map((variant) => (
                        <div
                            key={variant.id}
                            className="flex items-center justify-between bg-white border border-gray-200 p-3"
                        >
                            <div>
                                <span className="font-semibold">{variant.name}</span>
                                <span className="text-gray-600 ml-3">
                                    {Number.isInteger(variant.price)
                                        ? `${variant.price.toLocaleString('pt-PT')} KZ`
                                        : `${variant.price.toFixed(2)} KZ`}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleDeleteVariant(variant.id)}
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

export default ProductVariants;
