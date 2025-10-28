import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  signature?: boolean;
  fullDescription?: string;
  ingredients?: string[];
  flavorNotes?: string;
  allergens?: string[];
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    name: 'Signature Cocktails',
    items: [
      { 
        name: 'Midnight Negroni', 
        description: 'Gin, Campari, sweet vermouth, house bitters', 
        price: 16, 
        signature: true,
        fullDescription: 'Our signature take on the classic Italian aperitivo. We use barrel-aged gin and a proprietary blend of house bitters that adds depth and complexity to this timeless cocktail.',
        ingredients: ['Barrel-aged gin', 'Campari', 'Carpano Antica Formula', 'House orange bitters', 'Orange peel'],
        flavorNotes: 'Bitter, aromatic, perfectly balanced with notes of orange and spice',
        allergens: ['Contains alcohol']
      },
      { 
        name: 'Velvet Smoke', 
        description: 'Mezcal, elderflower, fresh lime, agave, smoked salt', 
        price: 17, 
        signature: true,
        fullDescription: 'A smoky and floral masterpiece that transports you to the agave fields of Oaxaca. The rim of smoked salt enhances the natural smokiness of the mezcal.',
        ingredients: ['Del Maguey Vida Mezcal', 'St-Germain elderflower liqueur', 'Fresh lime juice', 'Agave nectar', 'Smoked Maldon salt'],
        flavorNotes: 'Smoky, floral, citrus-forward with a savory finish',
        allergens: ['Contains alcohol']
      },
      { 
        name: 'Golden Hour', 
        description: 'Bourbon, saffron honey, lemon, egg white', 
        price: 16, 
        signature: true,
        fullDescription: 'Inspired by the magical light of dusk. The saffron-infused honey adds a luxurious golden hue and exotic floral notes, while the egg white creates a silky texture.',
        ingredients: ['Buffalo Trace bourbon', 'House saffron honey syrup', 'Fresh lemon juice', 'Egg white', 'Angostura bitters'],
        flavorNotes: 'Rich, silky, with floral honey notes and bourbon warmth',
        allergens: ['Contains alcohol', 'Contains egg']
      },
      { 
        name: 'The Alchemist', 
        description: 'Rum blend, passionfruit, vanilla, cinnamon bark', 
        price: 18, 
        signature: true,
        fullDescription: 'A tropical journey combining aged and white rums with exotic passionfruit and warming spices. The cinnamon bark is torched tableside for a dramatic presentation.',
        ingredients: ['Aged Jamaican rum', 'White rum', 'Fresh passionfruit purée', 'Vanilla syrup', 'Cinnamon bark', 'Lime'],
        flavorNotes: 'Tropical, spiced, complex with layers of vanilla and fruit',
        allergens: ['Contains alcohol']
      },
    ],
  },
  {
    name: 'Classic Cocktails',
    items: [
      { 
        name: 'Old Fashioned', 
        description: 'Bourbon or rye, demerara, Angostura bitters', 
        price: 15,
        fullDescription: 'The quintessential whiskey cocktail, stirred to perfection with demerara sugar and aromatic bitters. Served over a single large ice sphere.',
        ingredients: ['Your choice of bourbon or rye', 'Demerara syrup', 'Angostura bitters', 'Orange peel', 'Luxardo cherry'],
        flavorNotes: 'Spirit-forward, rich, slightly sweet with aromatic complexity',
        allergens: ['Contains alcohol']
      },
      { 
        name: 'Martini', 
        description: 'Gin or vodka, dry vermouth, olive or twist', 
        price: 14,
        fullDescription: 'Elegance in a glass. Stirred or shaken, dry or dirty—we make it exactly how you like it. Choose your spirit and garnish.',
        ingredients: ['Premium gin or vodka', 'Dry vermouth', 'Your choice: olives or lemon twist'],
        flavorNotes: 'Clean, crisp, botanical or neutral depending on your preference',
        allergens: ['Contains alcohol']
      },
      { 
        name: 'Manhattan', 
        description: 'Rye whiskey, sweet vermouth, bitters', 
        price: 15,
        fullDescription: 'A New York classic. Our Manhattan uses high-rye whiskey for spice and complexity, balanced with sweet vermouth and a dash of bitters.',
        ingredients: ['Rittenhouse rye whiskey', 'Carpano Antica Formula', 'Angostura bitters', 'Luxardo cherry'],
        flavorNotes: 'Spicy, smooth, perfectly balanced with rich vermouth notes',
        allergens: ['Contains alcohol']
      },
      { 
        name: 'Margarita', 
        description: 'Tequila, Cointreau, fresh lime, agave', 
        price: 14,
        fullDescription: 'Fresh, bright, and never from a mix. We use 100% agave tequila, fresh-squeezed lime juice, and real Cointreau for the perfect margarita.',
        ingredients: ['100% agave tequila', 'Cointreau', 'Fresh lime juice', 'Agave nectar', 'Optional salt rim'],
        flavorNotes: 'Bright, citrusy, perfectly balanced sweet and tart',
        allergens: ['Contains alcohol']
      },
    ],
  },
  {
    name: 'Wine Selection',
    items: [
      { 
        name: 'Champagne', 
        description: 'Moët & Chandon Impérial Brut', 
        price: 24,
        fullDescription: 'The world\'s most loved champagne. Bright, elegant, and celebratory with fine bubbles and notes of citrus and white flowers.',
        ingredients: ['Champagne, France'],
        flavorNotes: 'Crisp, elegant, with notes of pear and citrus',
        allergens: ['Contains alcohol', 'Contains sulfites']
      },
      { 
        name: 'White', 
        description: 'Sancerre, Loire Valley', 
        price: 16,
        fullDescription: 'Classic Sauvignon Blanc from France\'s Loire Valley. Crisp, mineral-driven, with bright acidity.',
        ingredients: ['Sancerre, Loire Valley, France'],
        flavorNotes: 'Bright citrus, mineral, grassy notes with crisp acidity',
        allergens: ['Contains alcohol', 'Contains sulfites']
      },
      { 
        name: 'Rosé', 
        description: 'Provence, Côtes de Provence', 
        price: 14,
        fullDescription: 'Pale pink perfection from Provence. Dry, refreshing, with delicate notes of strawberry and melon.',
        ingredients: ['Rosé, Provence, France'],
        flavorNotes: 'Dry, crisp, with red berry and melon notes',
        allergens: ['Contains alcohol', 'Contains sulfites']
      },
      { 
        name: 'Red', 
        description: 'Châteauneuf-du-Pape', 
        price: 18,
        fullDescription: 'Rich and complex blend from the Southern Rhône. Full-bodied with notes of dark fruit, earth, and spice.',
        ingredients: ['Châteauneuf-du-Pape, Rhône Valley, France'],
        flavorNotes: 'Full-bodied, rich with dark fruit, earth, and spice',
        allergens: ['Contains alcohol', 'Contains sulfites']
      },
    ],
  },
  {
    name: 'Small Bites',
    items: [
      { 
        name: 'Charcuterie Board', 
        description: 'Selection of cured meats, aged cheeses, accompaniments', 
        price: 28,
        fullDescription: 'An artfully curated selection of imported and domestic cured meats, artisanal cheeses, seasonal accompaniments, and house-made preserves.',
        ingredients: ['Prosciutto di Parma', 'Manchego', 'Aged cheddar', 'Seasonal fruits', 'Honey', 'Crackers'],
        flavorNotes: 'Savory, rich, balanced with sweet and salty elements',
        allergens: ['Contains dairy', 'Contains gluten', 'Contains pork']
      },
      { 
        name: 'Truffle Fries', 
        description: 'Hand-cut fries, truffle oil, parmesan, herbs', 
        price: 12,
        fullDescription: 'Twice-fried potato perfection finished with white truffle oil, aged parmesan, and fresh herbs.',
        ingredients: ['Yukon Gold potatoes', 'White truffle oil', 'Parmigiano-Reggiano', 'Fresh parsley', 'Sea salt'],
        flavorNotes: 'Crispy, earthy, umami-rich with truffle aroma',
        allergens: ['Contains dairy']
      },
      { 
        name: 'Oysters', 
        description: 'Fresh East Coast oysters, mignonette, lemon', 
        price: 18,
        fullDescription: 'Six fresh oysters shucked to order, served with classic mignonette and lemon. Selection varies based on availability.',
        ingredients: ['Fresh East Coast oysters', 'Champagne mignonette', 'Lemon wedges'],
        flavorNotes: 'Briny, clean, ocean-fresh with bright acidity',
        allergens: ['Contains shellfish']
      },
      { 
        name: 'Bruschetta', 
        description: 'Heirloom tomatoes, basil, garlic, olive oil', 
        price: 14,
        fullDescription: 'Grilled artisan bread topped with marinated heirloom tomatoes, fresh basil, garlic, and premium olive oil.',
        ingredients: ['Heirloom tomatoes', 'Fresh basil', 'Garlic', 'Extra virgin olive oil', 'Balsamic reduction', 'Grilled bread'],
        flavorNotes: 'Fresh, bright, herbaceous with sweet tomato notes',
        allergens: ['Contains gluten']
      },
    ],
  },
];

const Menu = () => {
  useScrollReveal();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <main className="min-h-screen pt-20 pb-16 bg-ink-900">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12" data-reveal>
          <h1 className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
            Menu
          </h1>
          <p className="font-sans text-lg text-mist-300 max-w-2xl mx-auto mb-2">
            Crafted with intention, served with care
          </p>
          <p className="font-sans text-sm text-mist-300/70">
            A 20% service charge is added to all orders
          </p>
        </div>

        {/* Menu Accordion */}
        <div data-reveal>
          <Accordion type="single" collapsible className="space-y-6">
            {menuData.map((category, catIndex) => (
              <AccordionItem 
                key={catIndex} 
                value={`item-${catIndex}`}
                className="border-border/20 frost-panel rounded-sm overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-ink-700/50">
                  <span className="font-display text-display-md text-mist-100">
                    {category.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <div className="space-y-6">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        onClick={() => setSelectedItem(item)}
                        className="flex justify-between items-start gap-4 animate-fade-in cursor-pointer hover:bg-ink-700/30 p-4 -mx-4 rounded-sm transition-all group"
                        style={{ animationDelay: `${itemIndex * 40}ms` }}
                      >
                        <div className={`flex-1 ${item.signature ? 'border-l-2 border-gold-400 pl-4' : ''}`}>
                          <h3 className="font-display text-xl text-mist-100 mb-1 group-hover:text-gold-400 transition-colors">
                            {item.name}
                            {item.signature && (
                              <span className="ml-2 text-gold-400 text-sm">★</span>
                            )}
                          </h3>
                          <p className="font-sans text-sm text-mist-300/80">
                            {item.description}
                          </p>
                          <p className="font-sans text-xs text-gold-400/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Tap to view details
                          </p>
                        </div>
                        <span className="font-sans text-lg text-gold-400 font-semibold flex-shrink-0">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Legend */}
        <div className="mt-8 text-center" data-reveal>
          <p className="font-sans text-sm text-mist-300/70">
            ★ Indicates house signature cocktail • Click any item for details
          </p>
        </div>
      </div>

      {/* Fullscreen Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-ink-900 border-border/30 text-mist-300 p-0">
          {selectedItem && (
            <>
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-ink-700/80 hover:bg-ink-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-mist-300" />
              </button>

              <div className="p-8 md:p-12">
                {/* Header */}
                <DialogHeader className="mb-8">
                  <DialogTitle className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
                    {selectedItem.name}
                    {selectedItem.signature && (
                      <span className="ml-3 text-gold-400">★</span>
                    )}
                  </DialogTitle>
                  <p className="font-sans text-xl text-mist-300">
                    {selectedItem.description}
                  </p>
                  <div className="mt-4 inline-block">
                    <span className="font-display text-3xl text-gold-400">${selectedItem.price}</span>
                  </div>
                </DialogHeader>

                {/* Full Description */}
                {selectedItem.fullDescription && (
                  <div className="mb-8">
                    <h3 className="font-display text-display-md text-gold-400 mb-3">The Story</h3>
                    <p className="font-sans text-mist-300 leading-relaxed text-lg">
                      {selectedItem.fullDescription}
                    </p>
                  </div>
                )}

                {/* Ingredients */}
                {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-display text-display-md text-gold-400 mb-3">Ingredients</h3>
                    <ul className="space-y-2">
                      {selectedItem.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="font-sans text-mist-300 flex items-center">
                          <span className="w-2 h-2 bg-gold-400 rounded-full mr-3 flex-shrink-0"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Flavor Notes */}
                {selectedItem.flavorNotes && (
                  <div className="mb-8">
                    <h3 className="font-display text-display-md text-gold-400 mb-3">Flavor Profile</h3>
                    <p className="font-sans text-mist-300 text-lg italic">
                      {selectedItem.flavorNotes}
                    </p>
                  </div>
                )}

                {/* Allergens */}
                {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                  <div className="pt-6 border-t border-border/20">
                    <h3 className="font-display text-sm text-mist-300/70 mb-2">Allergen Information</h3>
                    <p className="font-sans text-sm text-mist-300/70">
                      {selectedItem.allergens.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Menu;
