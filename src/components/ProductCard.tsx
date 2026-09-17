import { useState } from 'react';
import { ShoppingBag, ChevronDown, Check, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedLength: string, price: number, originalPrice: number) => void;
  onQuickView: (product: Product) => void;
  isFeaturedRow?: boolean;
}

export default function ProductCard({ product, onAddToCart, onQuickView, isFeaturedRow = false }: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(product.defaultLengthIndex);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentOption = product.lengthOptions[selectedIndex] || product.lengthOptions[0];

  const handleAdd = () => {
    onAddToCart(product, currentOption.length, currentOption.price, currentOption.originalPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        isFeaturedRow
          ? 'border-pink-200/80 shadow-lg hover:shadow-2xl hover:border-[#D91B5C] relative'
          : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
      }`}
    >
      {/* Top Header tab strip if featured card */}
      {isFeaturedRow && (
        <div className="bg-[#D91B5C] text-white text-[11px] font-black uppercase tracking-wider py-1.5 px-4 text-center">
          Featured Deal • Camden In-Stock
        </div>
      )}

      {/* Product Image & Badges */}
      <div className="relative w-full h-56 sm:h-60 bg-slate-50 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#D91B5C] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
            {product.tag}
          </span>
          {product.badge && (
            <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-[#D91B5C] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Rating overlay */}
        <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviewCount})</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category breadcrumb */}
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {product.categoryName}
          </span>

          {/* Product Title matching screenshot uppercase */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-[#D91B5C] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          {/* Bundle Length / Variant Selector Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Select Length / Option:
            </label>
            <div className="relative">
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D91B5C] focus:border-transparent transition-colors cursor-pointer pr-8"
              >
                {product.lengthOptions.map((opt, idx) => (
                  <option key={opt.length} value={idx}>
                    Length: {opt.length} — ${opt.price}.00
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Pricing Row: Strikethrough original -> Bold vibrant sale price */}
          <div className="flex items-baseline justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-400 line-through">
                ${currentOption.originalPrice}.00
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#D91B5C] tracking-tight">
                ${currentOption.price}.00
              </span>
            </div>
            <span className="text-[10px] font-bold bg-pink-50 text-[#D91B5C] border border-pink-200 px-2 py-0.5 rounded">
              Save ${currentOption.originalPrice - currentOption.price}
            </span>
          </div>

          {/* Add To Cart CTA Button */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-[#D91B5C] active:scale-98 text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
