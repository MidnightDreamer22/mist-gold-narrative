import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchSimonaGathersMenu, CocktailItem } from '@/lib/menu-sheets';

const SimonaGathersSection = () => {
  const [items, setItems] = useState<CocktailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSimonaGathersMenu();
        setItems(data);
      } catch (err) {
        console.error('Failed to load Simona gathers menu', err);
        setError('Menu temporarily unavailable');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section 
      className="space-y-4"
      style={{
        animation: 'fadeInScale 600ms cubic-bezier(.16,1,.3,1) forwards',
        opacity: 0
      }}
    >
      <h2 className="text-3xl md:text-4xl font-display text-gold-400 tracking-wide">
        Simona gathers
      </h2>

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

export default SimonaGathersSection;
