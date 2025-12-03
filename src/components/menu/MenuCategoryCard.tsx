import React from 'react';

interface MenuCategoryCardProps {
  title: string;
  subtitle?: string;
}

const MenuCategoryCard: React.FC<MenuCategoryCardProps> = ({ title, subtitle }) => {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-border bg-ink-900/70 px-5 py-6 hover:border-gold-400/60 transition-colors">
      <div>
        <h2 className="text-xl md:text-2xl font-display text-mist-100 group-hover:text-gold-400 transition-colors">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-mist-300/70">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="text-xs uppercase tracking-wide border border-border rounded-full px-3 py-1.5 text-mist-200 group-hover:border-gold-400 group-hover:text-gold-300 transition-colors"
        >
          View menu (coming soon)
        </button>
      </div>
    </div>
  );
};

export default MenuCategoryCard;
