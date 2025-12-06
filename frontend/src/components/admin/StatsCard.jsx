import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-[var(--color-primary)] text-white',
        accent: 'bg-[var(--color-accent)] text-[var(--color-primary)]',
        success: 'bg-green-500 text-white',
        warning: 'bg-amber-500 text-white',
        info: 'bg-blue-500 text-white',
    };

    return (
        <div className={`${colorClasses[color]} shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[var(--color-border)]`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-['Poppins'] font-medium mb-1 opacity-90">{title}</p>
                    <p className="text-3xl font-['Poppins'] font-bold">{value}</p>
                    {trend && (
                        <p className="text-xs mt-2 font-['Poppins'] opacity-90">
                            <span className={trend > 0 ? 'text-green-100' : 'text-red-100'}>
                                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                            {trendLabel && <span className="ml-1">{trendLabel}</span>}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className="bg-white/20 p-4 backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
