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
      // Get environment variables based on category
      const sheetIds = {
        classics: import.meta.env.VITE_SHEETS_DOC_ID_SIMONA_CLASSICS,
        paloma: import.meta.env.VITE_SHEETS_DOC_ID_PALOMA_LIST,
        spirit: import.meta.env.VITE_SHEETS_DOC_ID_SPIRIT_CITY
      };

      const apiKey = import.meta.env.VITE_SHEETS_API_KEY;
      const sheetId = sheetIds[categoryId as keyof typeof sheetIds];

      if (!apiKey || !sheetId) {
        throw new Error('Google Sheets configuration missing. Please set VITE_SHEETS_API_KEY and sheet document IDs in your environment variables.');
      }

      // Fetch from Google Sheets API
      const range = 'Sheet1!A:H'; // Adjust range as needed
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
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
      const headers = rows[0];
      const drinkData = rows.slice(1).map((row: string[]) => ({
        category: row[0] || '',
        drink_name: row[1] || '',
        price: row[2] || '',
        short_desc: row[3] || '',
        ingredients: row[4] || '',
        abv: row[5] || '',
        image_url: row[6] || '',
        is_featured: row[7]?.toUpperCase() === 'TRUE'
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
        <div className="text-center max-w-md">
          <p className="text-destructive text-lg mb-4">{error}</p>
          <div className="space-y-4">
            <Button onClick={fetchDrinks} variant="outline" className="mr-2">
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
                style={{
                  animation: `fadeInUp 480ms cubic-bezier(.16,1,.3,1) forwards`,
                  animationDelay: `${index * 40}ms`,
                  opacity: 0
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {drink.image_url && (
                    <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0">
                      <img
                        src={drink.image_url}
                        alt={drink.drink_name}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-display text-mist-100">
                        {drink.drink_name}
                        {drink.is_featured && (
                          <span className="ml-2 text-sm text-gold-400">★ Featured</span>
                        )}
                      </h3>
                      <span className="text-xl text-gold-400 font-semibold whitespace-nowrap">
                        ${drink.price}
                      </span>
                    </div>
                    
                    {drink.short_desc && (
                      <p className="text-mist-300 mb-3">{drink.short_desc}</p>
                    )}
                    
                    {drink.ingredients && (
                      <p className="text-sm text-mist-300/70 italic">
                        {drink.ingredients}
                      </p>
                    )}
                    
                    {drink.abv && (
                      <p className="text-sm text-mist-300/50 mt-2">
                        ABV: {drink.abv}%
                      </p>
                    )}
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
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MenuDetailPanel;
