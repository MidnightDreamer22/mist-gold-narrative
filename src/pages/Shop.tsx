const Shop = () => {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* Eyebrow label */}
        <span className="text-sm font-sans tracking-[0.2em] uppercase text-gold-400 mb-4 block">
          Shop
        </span>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl font-display text-mist-100 mb-6">
          Coming soon
        </h1>
        
        {/* Supporting text */}
        <p className="text-lg md:text-xl text-mist-300 leading-relaxed">
          Ask our bartenders to whisper to you what we'll have soon… Cheers!
        </p>
      </div>
    </div>
  );
};

export default Shop;
