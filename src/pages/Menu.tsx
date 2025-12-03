import { useParams } from 'react-router-dom';
import { MENU_SOURCES } from '@/config/menuConfig';
import SimonaGathersSection from '@/components/menu/SimonaGathersSection';
import MenuSquare from '@/components/menu/MenuSquare';
import MenuDetailSection from '@/components/menu/MenuDetailSection';

const Menu = () => {
  const { menuId } = useParams<{ menuId?: string }>();
  
  // Find active config if viewing a specific menu
  const activeConfig = menuId
    ? MENU_SOURCES.find((s) => s.id === menuId)
    : null;

  // Get the 3 square menu sources (exclude simona-gathers)
  const squareMenus = MENU_SOURCES.filter(source => source.id !== 'simona-gathers');

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 bg-ink-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-8">
          Menu
        </h1>

        {activeConfig ? (
          // Detail view for a single menu
          <MenuDetailSection config={activeConfig} />
        ) : (
          <>
            {/* Top Rectangle - Simona gathers */}
            <SimonaGathersSection />

            {/* 3 Squares Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {squareMenus.map((config, index) => (
                <MenuSquare 
                  key={config.id} 
                  config={config} 
                  index={index}
                />
              ))}
            </section>
          </>
        )}
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
      `}</style>
    </div>
  );
};

export default Menu;
