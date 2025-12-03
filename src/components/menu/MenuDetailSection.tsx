import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { MenuSourceConfig } from '@/config/menuConfig';
import { fetchMenuBySource, CocktailItem } from '@/lib/menu-sheets';

interface MenuDetailSectionProps {
  config: MenuSourceConfig;
}

const MenuDetailSection = ({ config }: MenuDetailSectionProps) => {
  const [items, setItems] = useState<CocktailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        console.error('Failed to load menu detail', err);
        if (!cancelled) setError('Menu unavailable');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [config.id, config.gid, config.sheetName]);

  return (
    <section 
      className="space-y-6"
      style={{
        animation: 'fadeInScale 600ms cubic-bezier(.16,1,.3,1) forwards',
        opacity: 0
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-display text-gold-400">
            {config.label}
          </h2>
          {config.description && (
            <p className="text-sm text-mist-300/70 mt-1">
              {config.description}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2 text-mist-200 hover:border-gold-400 hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all menus
        </button>
      </div>

      <div className="bg-ink-800/50 border border-border rounded-lg p-6 md:p-8">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        )}

        {!loading && (error || items.length === 0) && (
          <p className="text-mist-300/70 text-center py-4">
            {error ?? 'Menu will be updated soon.'}
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-border/50 last:border-b-0 pb-6 last:pb-0"
                style={{
                  animation: `fadeInUp 400ms cubic-bezier(.16,1,.3,1) forwards`,
                  animationDelay: `${index * 50}ms`,
                  opacity: 0
                }}
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-display text-mist-100">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-mist-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.price && (
                  <div className="text-lg md:text-xl text-gold-400 font-semibold md:text-right whitespace-nowrap">
                    {item.price}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuDetailSection;
