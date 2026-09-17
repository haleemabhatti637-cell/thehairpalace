import { useState, useEffect } from 'react';
import { Sparkles, Clock, ShoppingBag, CheckCircle, ShieldCheck, Instagram, ArrowRight } from 'lucide-react';
import { BUNDLE_DEAL_TIERS, STORE_INFO } from '../data/products';
import { BundleDealTier } from '../types';

interface BundlePromoBannerProps {
  onAddDealToCart: (deal: BundleDealTier) => void;
}

export default function BundlePromoBanner({ onAddDealToCart }: BundlePromoBannerProps) {
  // Live Countdown Timer (e.g. daily flash deal resetting)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 48, seconds: 23 });
  const [selectedDeal, setSelectedDeal] = useState<BundleDealTier>(BUNDLE_DEAL_TIERS[1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="bundle-deals-section" className="py-12 bg-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hot Magenta Active Bundle Deal Ribbon (matching screenshot bottom bar) */}
        <div className="bg-[#D91B5C] text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden mb-8 border border-pink-400/40">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left: Circular Seal & Deal Headline */}
            <div className="flex items-center gap-4 text-left w-full lg:w-auto">
              {/* Circular Certified Seal */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 border-2 border-white/40 flex-shrink-0 flex flex-col items-center justify-center text-center p-1 shadow-inner">
                <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-300 leading-tight">100% VIRGIN</span>
                <span className="text-xs sm:text-sm font-black text-white">11A/12A</span>
                <span className="text-[9px] font-bold text-pink-100">CAMDEN</span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-black/20 text-pink-100 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Limited Time Storefront Promo</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
                  ACTIVE BUNDLE DEALS!
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 font-medium max-w-xl">
                  Come visit at our Camden store or order online for exclusive 3-Bundle deals!
                </p>
              </div>
            </div>

            {/* Middle: Active Countdown Timer */}
            <div className="flex items-center gap-3 bg-black/25 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20">
              <Clock className="w-5 h-5 text-amber-300 animate-pulse flex-shrink-0" />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-pink-200 font-bold block">
                  Today's Deal Ends In:
                </span>
                <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-white">
                  <span className="bg-white/20 px-2 py-0.5 rounded">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-amber-300">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Add to Cart / Quick Claim */}
            <button
              id="active-bundle-add-to-cart-btn"
              onClick={() => onAddDealToCart(selectedDeal)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2e] active:scale-95 text-slate-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>CLAIM 3-BUNDLE DEAL (${selectedDeal.dealPrice})</span>
            </button>

          </div>
        </div>

        {/* 2. 3-Bundle Pricing Matrix Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D91B5C]">
                Official Camden Retail Matrix
              </span>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                3-BUNDLE COMBO SPECIALS BY LENGTH
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
              All sets include 3 full 100g wefts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {BUNDLE_DEAL_TIERS.map((deal) => {
              const isSelected = selectedDeal.id === deal.id;
              return (
                <div
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#D91B5C] bg-pink-50/40 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {deal.popular && (
                    <span className="absolute -top-3 right-4 bg-[#D91B5C] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                      Best Value
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        Lengths Included:
                      </span>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Save ${deal.savings}
                      </span>
                    </div>

                    <div className="text-xl font-black text-slate-900 mt-1 font-mono tracking-tight">
                      {deal.lengths}
                    </div>

                    <div className="text-xs font-semibold text-slate-500 mt-1">
                      {deal.texture}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-400 line-through">
                        ${deal.retailPrice}.00
                      </span>
                      <span className="text-2xl font-black text-[#D91B5C]">
                        ${deal.dealPrice}.00
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddDealToCart(deal);
                      }}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-[#D91B5C] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Add Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar matching screenshot: Gold Seals + Instagram handle */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Gold Trust Seals (as shown in screenshot bottom right) */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#D4AF37] p-0.5 flex items-center justify-center bg-amber-50">
                  <div className="w-full h-full rounded-full bg-[#D4AF37] text-white font-black text-[9px] flex flex-col items-center justify-center leading-none text-center shadow-sm">
                    <span>100%</span>
                    <span className="text-[7px]">QUALITY</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase text-slate-800">
                    100% Guaranteed
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Grade 11A Raw Cuticle Aligned
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#D4AF37] p-0.5 flex items-center justify-center bg-amber-50">
                  <div className="w-full h-full rounded-full bg-[#1E3A8A] text-white font-black text-[9px] flex flex-col items-center justify-center leading-none text-center shadow-sm">
                    <span>CAMDEN</span>
                    <span className="text-[7px] text-amber-300">STORE</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase text-slate-800">
                    Open Every Day
                  </div>
                  <div className="text-[11px] text-slate-500">
                    8:00 AM – 9:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Tag Badge (@thehairpalacenj) */}
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:opacity-95 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {STORE_INFO.handle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
