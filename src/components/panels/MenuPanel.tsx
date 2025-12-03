import { Wine, Martini, Sparkles } from 'lucide-react';

interface MenuPanelProps {
  onSelectCategory: (category: string) => void;
}

const menuCategories = [
  {
    id: 'classics',
    title: "Simona's Classics",
    description: "Timeless cocktails crafted with precision and artistry",
    icon: Martini,
    color: 'from-gold-400/20 to-gold-400/5'
  },
  {
    id: 'paloma',
    title: "Paloma List",
    description: "A curated selection of tequila and mezcal creations",
    icon: Wine,
    color: 'from-mist-300/10 to-mist-300/5'
  },
  {
    id: 'spirit',
    title: "Spirit of the City",
    description: "Innovative drinks inspired by urban energy",
    icon: Sparkles,
    color: 'from-accent/20 to-accent/5'
  }
];

const MenuPanel = ({ onSelectCategory }: MenuPanelProps) => {
  return (
    <section className="snap-section min-h-screen bg-ink-900 py-20 px-6">
      <div className="section-content container mx-auto max-w-7xl">
        <h2 className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-16">
          Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br p-8 text-left transition-all duration-700 hover:scale-[1.02] hover:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400"
                style={{
                  animation: `fadeInScale 600ms cubic-bezier(.16,1,.3,1) forwards`,
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                  background: `linear-gradient(135deg, var(--ink-700) 0%, var(--ink-900) 100%)`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <Icon size={40} className="text-gold-400" />
                    <span className="text-mist-300/50 group-hover:text-gold-400 transition-colors duration-500">→</span>
                  </div>
                  
                  <h3 className="text-3xl font-display text-mist-100 group-hover:text-gold-400 transition-colors duration-500">
                    {category.title}
                  </h3>
                  
                  <p className="text-mist-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-mist-300/70 text-sm">
            Each menu is powered by Google Sheets for easy updates
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default MenuPanel;
