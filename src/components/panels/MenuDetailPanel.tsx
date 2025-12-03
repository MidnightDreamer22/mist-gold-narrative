import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Drink {
  category?: string;
  drink_name: string;
  price: string | number;
  short_desc?: string;
  ingredients?: string;
  abv?: string | number;
  image_url?: string;
  is_featured?: boolean;
}

interface MenuDetailPanelProps {
  categoryId: string;
  categoryTitle: string;
  onBack: () => void;
}

const MenuDetailPanel = ({ categoryId, categoryTitle, onBack }: MenuDetailPanelProps) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrinks();
  }, [categoryId]);

  const fetchDrinks = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch from Google Sheets API with corrected endpoint
      const url = 'https://sheets.googleapis.com/v4/spreadsheets/1R7sEBpCqVkWeZnxWXfG0S7CwCDVRMBI40F1N5pig4hQ/values/Ararat%20brandy%20menu?key=AIzaSyDBYUuK8aEDri_w8KYvEnWmWpm2geGHHMA';
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch menu data from Google Sheets');
      }

      const data = await response.json();
      const rows = data.values || [];

      if (rows.length === 0) {
        setDrinks([]);
        return;
      }

      // Parse rows (skip header)
      // Sheet structure: Column 0 = Cocktail Name, Column 5 = Price, Column 6 = Description
      const drinkData = rows
        .slice(1) // Skip header row
        .filter((row: string[]) => {
          // Only include rows with a cocktail name (column 0) and filter out empty/incomplete rows
          return row[0] && row[0].trim() !== '' && row[6] && row[5];
        })
        .map((row: string[]) => ({
          drink_name: row[0].trim(),
          short_desc: row[6].trim(), // Description is in column 6
          price: row[5].trim(), // Price is in column 5
          category: '',
          ingredients: '',
          abv: '',
          image_url: '',
          is_featured: false
        }));

      setDrinks(drinkData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-mist-300">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
        <div 
          className="text-center max-w-md"
          style={{
            animation: 'fadeIn 240ms var(--easing-enter) forwards'
          }}
        >
          <p className="text-destructive text-lg mb-4">{error}</p>
          <div className="flex gap-2 justify-center mb-8">
            <Button onClick={fetchDrinks} variant="outline">
              Retry
            </Button>
            <Button onClick={onBack} variant="ghost">
              <ArrowLeft size={16} className="mr-2" />
              Back to Menu
            </Button>
          </div>
          <div className="mt-8 p-4 bg-ink-700 rounded border border-border text-left text-sm text-mist-300">
            <p className="font-semibold mb-2">Setup Instructions:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Create a Google Sheet with columns: category, drink_name, price, short_desc, ingredients, abv, image_url, is_featured</li>
              <li>Make the sheet publicly viewable</li>
              <li>Add environment variables in your deployment settings</li>
              <li>Set VITE_SHEETS_API_KEY and sheet document IDs</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 text-mist-300 hover:text-gold-400"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Menu
        </Button>

        <h2 className="text-5xl md:text-6xl font-display text-mist-100 mb-12">
          {categoryTitle}
        </h2>

        {drinks.length === 0 ? (
          <p className="text-center text-mist-300 text-lg">No drinks available yet.</p>
        ) : (
          <div className="space-y-8">
            {drinks.map((drink, index) => (
              <div
                key={index}
                className="border-b border-border pb-8 last:border-0"
                data-motion
                style={{
                  animation: `fadeInUp var(--timing-enter) var(--easing-enter) forwards`,
                  animationDelay: `${Math.min(index * 60, 280)}ms`,
                  opacity: 0
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {drink.image_url && (
                    <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0">
                      <img
                        src={drink.image_url}
                        alt={drink.drink_name}
                        className="w-full h-full object-cover rounded transition-opacity duration-200"
                        style={{ opacity: 0 }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.opacity = '1';
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-3xl font-display text-mist-100 font-bold">
                        {drink.drink_name}
                      </h3>
                    </div>
                    
                    <p className="text-mist-300 mb-4 leading-relaxed">
                      {drink.short_desc}
                    </p>
                    
                    <div className="flex justify-end">
                      <span className="text-2xl text-gold-400 font-semibold">
                        {drink.price} AMD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuDetailPanel;
