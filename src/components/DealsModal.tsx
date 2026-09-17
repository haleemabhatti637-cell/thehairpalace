import { X, Sparkles, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { BUNDLE_DEAL_TIERS } from '../data/products';
import { BundleDealTier } from '../types';

interface DealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeal: (deal: BundleDealTier) => void;
}

export default function DealsModal({ isOpen, onClose, onAddDeal }: DealsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#0F2454] text-white flex items-center justify-between border-b border-blue-900">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#D91B5C] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Camden Storefront Flash Promotions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              ALL ACTIVE BUNDLE & WIG DEALS
            </h3>
            <p className="text-xs text-blue-200">
              Save up to $81 on multi-length bundle sets. Available for pickup or fast delivery.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUNDLE_DEAL_TIERS.map((deal) => (
              <div
                key={deal.id}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#D91B5C] bg-white transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase">3-Bundle Combo</span>
                    {deal.popular && (
                      <span className="text-[10px] font-black bg-[#D91B5C] text-white px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-black text-slate-900 font-mono tracking-tight">
                    {deal.lengths}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{deal.texture}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through">${deal.retailPrice}.00</span>
                    <span className="text-xl font-black text-[#D91B5C]">${deal.dealPrice}.00</span>
                  </div>
                  <button
                    onClick={() => {
                      onAddDeal(deal);
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-[#D91B5C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👑</span>
              <div>
                <div className="text-xs font-black uppercase text-[#D91B5C]">
                  Camden Storefront VIP Guarantee
                </div>
                <div className="text-xs text-slate-600">
                  Every bundle is 100% human hair, zero tangling, full ends, and ready to dye.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Camden Store Hours: 8:00 AM – 9:00 PM Daily</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 font-bold rounded-lg text-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
