import { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedLength: string, price: number, originalPrice: number) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  if (!product) return null;

  const [selectedIndex, setSelectedIndex] = useState(product.defaultLengthIndex);
  const [added, setAdded] = useState(false);

  const currentOption = product.lengthOptions[selectedIndex] || product.lengthOptions[0];

  const handleAdd = () => {
    onAddToCart(product, currentOption.length, currentOption.price, currentOption.originalPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full shadow transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 sm:h-full bg-slate-100 min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#D91B5C] text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow">
                {product.tag}
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                {product.categoryName} • Camden, NJ
              </span>
              <h3 className="text-xl font-black uppercase text-slate-900 mt-1 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400 font-medium">({product.reviewCount} reviews)</span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Feature bullets */}
              <div className="mt-4 space-y-1.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Length selector & purchase */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Length Option:
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {product.lengthOptions.map((opt, idx) => (
                  <button
                    key={opt.length}
                    onClick={() => setSelectedIndex(idx)}
                    className={`px-2.5 py-2 text-xs rounded-lg font-bold border transition-all ${
                      selectedIndex === idx
                        ? 'border-[#D91B5C] bg-pink-50 text-[#D91B5C]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>{opt.length}</div>
                    <div className="text-[11px] font-semibold">${opt.price}.00</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-2">
                    ${currentOption.originalPrice}.00
                  </span>
                  <span className="text-2xl font-black text-[#D91B5C]">
                    ${currentOption.price}.00
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  In-Stock Camden
                </span>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D91B5C] hover:bg-[#b8144b] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${currentOption.price}.00</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
