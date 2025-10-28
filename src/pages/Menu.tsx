import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  signature?: boolean;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    name: 'Signature Cocktails',
    items: [
      { name: 'Midnight Negroni', description: 'Gin, Campari, sweet vermouth, house bitters', price: 16, signature: true },
      { name: 'Velvet Smoke', description: 'Mezcal, elderflower, fresh lime, agave, smoked salt', price: 17, signature: true },
      { name: 'Golden Hour', description: 'Bourbon, saffron honey, lemon, egg white', price: 16, signature: true },
      { name: 'The Alchemist', description: 'Rum blend, passionfruit, vanilla, cinnamon bark', price: 18, signature: true },
    ],
  },
  {
    name: 'Classic Cocktails',
    items: [
      { name: 'Old Fashioned', description: 'Bourbon or rye, demerara, Angostura bitters', price: 15 },
      { name: 'Martini', description: 'Gin or vodka, dry vermouth, olive or twist', price: 14 },
      { name: 'Manhattan', description: 'Rye whiskey, sweet vermouth, bitters', price: 15 },
      { name: 'Margarita', description: 'Tequila, Cointreau, fresh lime, agave', price: 14 },
    ],
  },
  {
    name: 'Wine Selection',
    items: [
      { name: 'Champagne', description: 'Moët & Chandon Impérial Brut', price: 24 },
      { name: 'White', description: 'Sancerre, Loire Valley', price: 16 },
      { name: 'Rosé', description: 'Provence, Côtes de Provence', price: 14 },
      { name: 'Red', description: 'Châteauneuf-du-Pape', price: 18 },
    ],
  },
  {
    name: 'Small Bites',
    items: [
      { name: 'Charcuterie Board', description: 'Selection of cured meats, aged cheeses, accompaniments', price: 28 },
      { name: 'Truffle Fries', description: 'Hand-cut fries, truffle oil, parmesan, herbs', price: 12 },
      { name: 'Oysters', description: 'Fresh East Coast oysters, mignonette, lemon', price: 18 },
      { name: 'Bruschetta', description: 'Heirloom tomatoes, basil, garlic, olive oil', price: 14 },
    ],
  },
];

const Menu = () => {
  useScrollReveal();

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
                        className="flex justify-between items-start gap-4 animate-fade-in"
                        style={{ animationDelay: `${itemIndex * 40}ms` }}
                      >
                        <div className={`flex-1 ${item.signature ? 'border-l-2 border-gold-400 pl-4' : ''}`}>
                          <h3 className="font-display text-xl text-mist-100 mb-1">
                            {item.name}
                            {item.signature && (
                              <span className="ml-2 text-gold-400 text-sm">★</span>
                            )}
                          </h3>
                          <p className="font-sans text-sm text-mist-300/80">
                            {item.description}
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
            ★ Indicates house signature cocktail
          </p>
        </div>
      </div>
    </main>
  );
};

export default Menu;
