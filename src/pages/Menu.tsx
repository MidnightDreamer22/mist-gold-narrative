import MenuCategoryCard from '@/components/menu/MenuCategoryCard';

const Menu = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-6 bg-ink-950">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-display text-mist-100 text-center">
          Menu
        </h1>

        {/* 3 categories */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MenuCategoryCard
            title="Wine & Spirit"
            subtitle="Bottles, pours and neat serves."
            href="/menus/simona-spirits-menu.pdf"
          />
          <MenuCategoryCard
            title="Cocktails"
            subtitle="Signatures and reimagined classics."
            href="/menus/simona-cocktail-menu.pdf"
          />
          <MenuCategoryCard
            title="Food & Snacks"
            subtitle="Small plates and late-night bites."
            href="/menus/simona-food-menu.pdf"
          />
        </section>
      </div>
    </div>
  );
};

export default Menu;
