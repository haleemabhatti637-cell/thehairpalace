import { Instagram, MapPin, Phone, Clock, Mail, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { STORE_INFO } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: 'all' | 'bundles' | 'wigs' | 'supplies' | 'fashion') => void;
  onOpenDeals: () => void;
}

export default function Footer({ onSelectCategory, onOpenDeals }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1936] text-white pt-16 pb-12 border-t-4 border-[#D91B5C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo light={true} />
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
              The premier retail destination for 100% Virgin Hair bundles, HD Swiss lace front wigs, adhesives, and everyday beauty supplies in Camden, New Jersey.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{STORE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Open 8:00 AM – 9:00 PM (Every Day)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-3">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D91B5C] hover:bg-[#b8144b] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: {STORE_INFO.handle}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Virgin Hair Inventory */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D4AF37] mb-4">
              Virgin Hair Inventory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bundles');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Body Wave Virgin Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bundles');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Exotic Deep Wave & Curls
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bundles');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  613 Russian Blonde Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bundles');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Double Drawn Bone Straight
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeals}
                  className="text-pink-400 font-bold hover:text-pink-300 transition-colors text-left flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>3-Bundle Deal Matrices</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Wigs & Beauty Supplies */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D4AF37] mb-4">
              Wigs & Essentials
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('wigs');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  13x6 HD Swiss Lace Wigs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('wigs');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Glueless Wear & Go Units
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('supplies');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Lace Tint & Melting Mousse
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('supplies');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  24-Hour Edge Slayer & Glue
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('fashion');
                    scrollTo('featured-categories');
                  }}
                  className="hover:text-[#D91B5C] transition-colors text-left"
                >
                  Silk Bonnets & Hot Combs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Camden Store Hours */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D4AF37] mb-4">
              Camden Storefront
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-2">
              <div className="text-slate-200 font-bold">Store Hours:</div>
              <div className="text-emerald-400 font-black">8:00 AM – 9:00 PM</div>
              <div className="text-[11px] text-slate-400">Open 7 Days a Week</div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-[11px] text-amber-300 font-bold block">15-Min Local Pick-up</span>
                <span className="text-[10px] text-slate-400">Available during all store hours</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tag */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} The Hair Palace New Jersey. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Raw Virgin Hair</span>
            <span>•</span>
            <span>Camden, NJ 08102</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">Open 8AM - 9PM Everyday</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
