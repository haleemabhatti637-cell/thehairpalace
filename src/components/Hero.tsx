import { Sparkles, Navigation, CheckCircle2, Award, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeroProps {
  onExploreDeals: () => void;
  onGetDirections: () => void;
}

export default function Hero({ onExploreDeals, onGetDirections }: HeroProps) {
  return (
    <section id="hero" className="relative bg-[#0F2454] text-white pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D91B5C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Status Badges & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Camden Local Retail Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-full w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Camden, NJ • Storefront & Online Inventory
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-[1.08] text-white mb-4">
              <span>THE LARGEST </span>
              <span className="text-[#D91B5C] drop-shadow-sm">VIRGIN HAIR </span>
              <br className="hidden sm:inline" />
              <span>& BEAUTY SUPPLY STORE</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-200 font-normal max-w-2xl leading-relaxed mb-6">
              Shop top-grade 100% Virgin Hair bundles, lace front wigs, cosmetics, and beauty essentials in Camden, NJ.
            </p>

            {/* Status Badges Row (as specified in prompt & screenshot) */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl w-fit mb-8 text-xs sm:text-sm font-semibold text-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="text-base">👑</span>
                <span>Premium Virgin Hair</span>
              </span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-base">🛍️</span>
                <span>Daily Deals</span>
              </span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <span className="text-base">🚚</span>
                <span>Fast Local Pick-up</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-deals-btn"
                onClick={onExploreDeals}
                className="inline-flex items-center justify-center gap-2 bg-[#D91B5C] hover:bg-[#b8144b] active:scale-95 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase px-7 py-3.5 rounded-xl shadow-lg shadow-pink-900/40 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-pink-200" />
                <span>EXPLORE BUNDLE DEALS</span>
              </button>

              <button
                id="hero-get-directions-btn"
                onClick={onGetDirections}
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2e] active:scale-95 text-slate-950 font-extrabold text-sm sm:text-base tracking-wider uppercase px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <Navigation className="w-5 h-5 text-slate-950" />
                <span>GET DIRECTIONS</span>
              </button>
            </div>

            {/* Store Hours & Guarantee pill */}
            <div className="mt-8 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Open 8:00 AM – 9:00 PM Every Day</span>
              </div>
              <span className="text-slate-500">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Grade 11A / 12A Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bento Collage Grid matching screenshot */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3 sm:p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              
              {/* Tile 1: Virgin Bundles with Pink Ribbons (Top Left) */}
              <div className="relative col-span-1 h-28 sm:h-36 rounded-2xl overflow-hidden group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80"
                  alt="Virgin Hair Bundles"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white px-1.5 py-0.5 rounded text-center">
                  100% Raw Bundles
                </div>
              </div>

              {/* Tile 2: Makeup & Cosmetics (Top Middle) */}
              <div className="relative col-span-1 h-28 sm:h-36 rounded-2xl overflow-hidden group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80"
                  alt="Cosmetics and Lip Glazes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white px-1.5 py-0.5 rounded text-center">
                  Cosmetics Glam
                </div>
              </div>

              {/* Tile 3: Blonde 613 & Highlight Bundles (Top Right) */}
              <div className="relative col-span-1 h-28 sm:h-36 rounded-2xl overflow-hidden group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=400&q=80"
                  alt="613 Blonde Bundles"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 left-1 right-1 bg-[#D91B5C]/90 text-[9px] font-bold text-white px-1.5 py-0.5 rounded text-center">
                  #613 Blonde
                </div>
              </div>

              {/* Center Main Feature: Voluminous Model Hair Glam (spanning 2 columns) */}
              <div className="relative col-span-2 h-44 sm:h-56 rounded-2xl overflow-hidden group shadow-xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                  alt="Model with Body Wave HD Lace Wig"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#D91B5C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      HD Swiss Lace
                    </span>
                    <span className="bg-[#D4AF37] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      200% Full Body
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white mt-1">
                    Seamless Scalp Melt Collection
                  </p>
                </div>
              </div>

              {/* Tile 5: Fashion, Trench & Accessories (spanning 1 column, 2 rows) */}
              <div className="relative col-span-1 h-44 sm:h-56 rounded-2xl overflow-hidden group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1595955793665-c146e39265ff?auto=format&fit=crop&w=400&q=80"
                  alt="Beauty Fashion and Stylist Outfits"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white px-1.5 py-0.5 rounded text-center">
                  Fashion & Style
                </div>
              </div>

            </div>

            {/* Floating Royal Crown Badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#1E3A8A] border-2 border-[#D4AF37] rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 text-white">
              <div className="w-10 h-10 rounded-xl bg-[#D91B5C] flex items-center justify-center font-black text-lg text-white shadow-inner">
                👑
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#D4AF37] tracking-wider">
                  The Hair Palace NJ
                </div>
                <div className="text-[11px] font-semibold text-slate-200">
                  Camden's #1 Virgin Hair Store
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
