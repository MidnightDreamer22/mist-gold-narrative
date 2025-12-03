import MenuPanel from '@/components/panels/MenuPanel';
import MenuDetailPanel from '@/components/panels/MenuDetailPanel';
import { useState } from 'react';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryTitle = (id: string) => {
    const titles: Record<string, string> = {
      classics: "Simona's Classics",
      paloma: "Paloma List",
      spirit: "Spirit of the City"
    };
    return titles[id] || id;
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 bg-ink-950">
      <div className="max-w-4xl mx-auto">
        {selectedCategory ? (
          <MenuDetailPanel 
            categoryId={selectedCategory}
            categoryTitle={getCategoryTitle(selectedCategory)}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <MenuPanel onSelectCategory={setSelectedCategory} />
        )}
      </div>
    </div>
  );
};

export default Menu;
