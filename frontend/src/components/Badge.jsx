import React from "react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.25em] uppercase transition-colors";
  const variants = {
    default: "bg-[#CA1818] text-white",
    accent: "bg-[#FEB7B0] text-[#CA1818]",
    outline: "border border-[#ead9ce] text-[#777777]",
  };

  const variantClasses = variants[variant] ?? variants.default;

  return (
    <span className={`${base} ${variantClasses} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default Badge;
