import { useState, useMemo } from 'react';
import { Sparkles, Search, Filter, Layers, Flame, Check } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

interface CategoryTabsProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onAddToCart: (product: Product, selectedLength: string, price: number, originalPrice: number) => void;
  onQuickView: (product: Product) => void;
}

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
}: CategoryTabsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Top 3 featured spotlight cards corresponding directly to screenshot
  const spotlightProducts = useMemo(() => {
    return [
      PRODUCTS.find((p) => p.id === 'virgin-body-wave-bundles')!,
      PRODUCTS.find((p) => p.id === 'hd-lace-frontal-wig')!,
      PRODUCTS.find((p) => p.id === 'beauty-supplies-pro-kit')!,
    ].filter(Boolean);
  }, []);

  const categories = [
    { id: 'all' as CategoryId, label: 'All Products', icon: Layers },
    { id: 'bundles' as CategoryId, label: 'Virgin Bundles Deals', icon: Sparkles },
    { id: 'wigs' as CategoryId, label: 'HD Lace Wigs', icon: Flame },
    { id: 'supplies' as CategoryId, label: 'Beauty Supplies', icon: Filter },
    { id: 'fashion' as CategoryId, label: 'Fashion & Essentials', icon: Sparkles },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="featured-categories" className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* 1. Spotlight 3-Card Row Directly Matching Screenshot */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D91B5C]" />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-800">
              FEATURED INSTORE SPECIALS • CAMDEN, NJ
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#D91B5C] bg-pink-50 px-3 py-1 rounded-full border border-pink-100 hidden sm:inline">
            In-Stock Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {spotlightProducts.map((product) => (
            <ProductCard
              key={`spotlight-${product.id}`}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isFeaturedRow={true}
            />
          ))}
        </div>
      </div>

      {/* 2. Category Filter Tabs & Inventory Browser */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D91B5C] uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Camden Retail Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight">
              BROWSE EVERYTHING BEAUTY
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Select length options, compare prices, or reserve for in-store pickup.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bundles, wigs, glue..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D91B5C] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-4 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-base font-bold text-slate-700">No items match your search "{searchQuery}"</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for "Body Wave", "Lace", or "Blonde"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
