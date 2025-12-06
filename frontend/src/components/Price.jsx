import React from 'react';

const Price = ({ price, discount }) => {
  const hasDiscount = Boolean(discount);
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  // Formatar para moeda angolana (KZ)
  const formatKZ = (value) => {
    return `${value.toLocaleString('pt-PT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} KZ`;
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-base font-semibold text-[var(--color-primary)]">
        {formatKZ(finalPrice)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-[var(--color-muted)] line-through">
          {formatKZ(price)}
        </span>
      )}
    </div>
  );
};

export default Price;
