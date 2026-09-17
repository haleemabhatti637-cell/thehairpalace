import { useState } from 'react';
import { ShoppingBag, ChevronDown, Menu, X, MapPin, Phone, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { STORE_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: 'all' | 'bundles' | 'wigs' | 'supplies' | 'fashion') => void;
  onOpenDeals: () => void;
}

export default function Navbar({ cartCount, onOpenCart, onSelectCategory, onOpenDeals }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (sectionId: string, category?: 'all' | 'bundles' | 'wigs' | 'supplies' | 'fashion') => {
    if (category) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* 1. Sticky Store Announcement Top Bar */}
      <div id="store-status-banner" className="bg-[#1E3A8A] text-white text-xs md:text-sm font-semibold tracking-wide py-2 px-4 text-center border-b border-blue-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-amber-300 font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>Camden, NJ</span>
          </span>
          <span className="hidden sm:inline text-blue-300">•</span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-400/30">
            Open 8AM-9PM EVERY DAY
          </span>
          <span className="hidden sm:inline text-blue-300">•</span>
          <span className="text-white/95 font-medium hidden md:inline">
            Shop Everything Beauty
          </span>
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="ml-2 inline-flex items-center gap-1 text-[11px] bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full transition-colors font-bold"
          >
            <Phone className="w-3 h-3 text-amber-300" />
            <span>(856) 555-HAIR</span>
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-8 py-3 transition-all duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-xs uppercase tracking-wider text-slate-800">
            <div className="relative group">
              <button
                id="nav-shop-bundles"
                onClick={() => handleNavClick('featured-categories', 'bundles')}
                className="flex items-center gap-1 py-2 hover:text-[#D91B5C] transition-colors"
              >
                <span>Shop Bundles</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D91B5C] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-52">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 space-y-1 text-slate-700 text-xs font-semibold normal-case">
                  <button
                    onClick={() => handleNavClick('featured-categories', 'bundles')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    100% Virgin Body Wave
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'bundles')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    Exotic Deep Wave & Curls
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'bundles')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    613 Russian Blonde Bundles
                  </button>
                  <button
                    onClick={() => handleNavClick('bundle-deals-section')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-pink-100 text-[#D91B5C] font-bold transition-colors"
                  >
                    🔥 3-Bundle Special Deals
                  </button>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button
                id="nav-hd-lace-wigs"
                onClick={() => handleNavClick('featured-categories', 'wigs')}
                className="flex items-center gap-1 py-2 hover:text-[#D91B5C] transition-colors"
              >
                <span>HD Lace Wigs</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D91B5C] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-52">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 space-y-1 text-slate-700 text-xs font-semibold normal-case">
                  <button
                    onClick={() => handleNavClick('featured-categories', 'wigs')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    13x6 HD Swiss Frontals
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'wigs')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    Glueless Wear & Go Wigs
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'wigs')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    Pre-Plucked Full Density Wigs
                  </button>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button
                id="nav-beauty-supplies"
                onClick={() => handleNavClick('featured-categories', 'supplies')}
                className="flex items-center gap-1 py-2 hover:text-[#D91B5C] transition-colors"
              >
                <span>Beauty Supplies</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D91B5C] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-52">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 space-y-1 text-slate-700 text-xs font-semibold normal-case">
                  <button
                    onClick={() => handleNavClick('featured-categories', 'supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    Lace Glues & Tint Mousses
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    24-Hr Edge Tamer & Wax
                  </button>
                  <button
                    onClick={() => handleNavClick('featured-categories', 'supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 hover:text-[#D91B5C] transition-colors"
                  >
                    Cosmetics & Lip Essentials
                  </button>
                </div>
              </div>
            </div>

            <button
              id="nav-daily-deals"
              onClick={() => handleNavClick('bundle-deals-section')}
              className="flex items-center gap-1 py-2 text-[#D91B5C] hover:text-[#b41249] transition-colors font-extrabold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily Deals</span>
            </button>

            <button
              id="nav-visit-store"
              onClick={() => handleNavClick('visit-store-section')}
              className="py-2 hover:text-[#1E3A8A] transition-colors"
            >
              Visit Store
            </button>
          </nav>

          {/* Right Actions: CTA & Cart */}
          <div className="flex items-center gap-3">
            {/* CTA Button: "SHOP ALL DEALS" as in screenshot */}
            <button
              id="btn-shop-all-deals"
              onClick={onOpenDeals}
              className="hidden sm:inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#c49f2b] active:scale-95 text-slate-950 font-black text-xs md:text-sm tracking-wider uppercase px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200"
            >
              Shop All Deals
            </button>

            {/* Shopping Cart Drawer Toggle */}
            <button
              id="cart-drawer-toggle"
              onClick={onOpenCart}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 text-slate-700 hover:text-[#D91B5C] bg-slate-100 hover:bg-pink-50 rounded-xl transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#D91B5C] text-white text-[11px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-sm text-slate-800">
            <button
              onClick={() => handleNavClick('featured-categories', 'bundles')}
              className="flex items-center justify-between py-2 border-b border-slate-100 text-left font-bold"
            >
              <span>Virgin Bundles Deals</span>
              <span className="text-xs text-[#D91B5C] font-extrabold">From $28</span>
            </button>
            <button
              onClick={() => handleNavClick('featured-categories', 'wigs')}
              className="flex items-center justify-between py-2 border-b border-slate-100 text-left font-bold"
            >
              <span>HD Lace Frontal Wigs</span>
              <span className="text-xs text-[#D91B5C] font-extrabold">Swiss Lace</span>
            </button>
            <button
              onClick={() => handleNavClick('featured-categories', 'supplies')}
              className="flex items-center justify-between py-2 border-b border-slate-100 text-left font-bold"
            >
              <span>Beauty Supplies & Melt Kits</span>
              <span className="text-xs text-amber-600 font-extrabold">Best Sellers</span>
            </button>
            <button
              onClick={() => handleNavClick('featured-categories', 'fashion')}
              className="flex items-center justify-between py-2 border-b border-slate-100 text-left font-bold"
            >
              <span>Fashion, Bonnets & Tools</span>
              <span className="text-xs text-slate-500 font-extrabold">Essentials</span>
            </button>
            <button
              onClick={() => handleNavClick('bundle-deals-section')}
              className="flex items-center justify-between py-2.5 text-[#D91B5C] font-black border-b border-slate-100 text-left"
            >
              <span>🔥 3-Bundle Special Deals</span>
              <span className="text-xs bg-pink-100 px-2 py-0.5 rounded">Up to $80 OFF</span>
            </button>
            <button
              onClick={() => handleNavClick('visit-store-section')}
              className="flex items-center justify-between py-2 text-slate-700 text-left font-bold"
            >
              <span>📍 Camden, NJ Store Visit & Hours</span>
              <span className="text-xs text-emerald-600 font-bold">Open 8AM-9PM</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeals();
                }}
                className="w-full bg-[#D4AF37] hover:bg-[#c49f2b] text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider text-sm shadow text-center"
              >
                Shop All Deals
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
