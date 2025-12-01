import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { MenuSourceConfig } from '@/config/menuConfig';
import { fetchMenuBySource, CocktailItem } from '@/lib/menu-sheets';

interface MenuSquareProps {
  config: MenuSourceConfig;
  index: number;
}

const MenuSquare = ({ config, index }: MenuSquareProps) => {
  const [items, setItems] = useState<CocktailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!config) {
    console.error('MenuSquare: missing config for index', index);
    return null;
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMenuBySource(config);
        if (!cancelled) {
          setItems(data);
        }
      } catch (err) {
        console.error(`Failed to load menu: ${config.id}`, err);
        if (!cancelled) {
          setError('Unavailable');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [config.id, config.gid, config.sheetName]);

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-border bg-ink-800/50 p-6 transition-all duration-500 hover:border-gold-400/50"
      style={{
        animation: `fadeInScale 600ms cubic-bezier(.16,1,.3,1) forwards`,
        animationDelay: `${index * 80}ms`,
        opacity: 0
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-display text-mist-100 group-hover:text-gold-400 transition-colors">
          {config.label}
        </h3>
        {config.description && (
          <p className="text-sm text-mist-300/70 mt-1">
            {config.description}
          </p>
        )}
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
        </div>
      )}
      
      {!loading && (error || items.length === 0) && (
        <p className="text-mist-300/50 text-sm py-4">
          {error ?? 'Coming soon'}
        </p>
      )}
      
      {!loading && !error && items.length > 0 && (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-border/30 last:border-b-0 pb-3 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-mist-100 font-medium">{item.name}</span>
                {item.price && (
                  <span className="text-gold-400 text-sm whitespace-nowrap">
                    {item.price}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-mist-300/60 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSquare;
