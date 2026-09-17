import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import BundlePromoBanner from './components/BundlePromoBanner';
import StoreLocation from './components/StoreLocation';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import DealsModal from './components/DealsModal';
import { Product, CartItem, CategoryId, BundleDealTier } from './types';
import { STORE_INFO } from './data/products';
import { MessageCircle, Phone, Download, Code, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial demo cart item for instant gratification
    return [
      {
        id: 'initial-item-1',
        productId: 'virgin-body-wave-bundles',
        name: 'VIRGIN BUNDLES DEALS',
        length: '18" - 24"',
        price: 32,
        originalPrice: 42,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
        quantity: 1,
        tag: 'Best blands',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isDealsModalOpen, setIsDealsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showStandaloneModal, setShowStandaloneModal] = useState(false);
  const [htmlCopied, setHtmlCopied] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (
    product: Product,
    selectedLength: string,
    price: number,
    originalPrice: number
  ) => {
    const itemKey = `${product.id}-${selectedLength}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          name: product.name,
          length: selectedLength,
          price,
          originalPrice,
          image: product.image,
          quantity: 1,
          tag: product.tag,
        },
      ];
    });
    showToast(`Added ${product.name} (${selectedLength}) to bag!`);
  };

  const handleAddDealToCart = (deal: BundleDealTier) => {
    const itemKey = `deal-${deal.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: deal.id,
          name: `3-BUNDLE SPECIAL: ${deal.lengths}`,
          length: `3 Full Wefts (${deal.texture})`,
          price: deal.dealPrice,
          originalPrice: deal.retailPrice,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
          quantity: 1,
          tag: '3-Bundle Promo',
        },
      ];
    });
    showToast(`Added 3-Bundle Special (${deal.lengths}) to bag!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleExploreDeals = () => {
    const el = document.getElementById('bundle-deals-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetDirections = () => {
    const el = document.getElementById('visit-store-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadStandaloneHtml = async () => {
    try {
      const response = await fetch('/thehairpalacenj.html');
      const text = await response.text();
      const blob = new Blob([text], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'thehairpalacenj.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/thehairpalacenj.html', '_blank');
    }
  };

  const handleCopyStandaloneCode = async () => {
    try {
      const response = await fetch('/thehairpalacenj.html');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setHtmlCopied(true);
      setTimeout(() => setHtmlCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 font-['Poppins',sans-serif]">
      {/* 1. Sticky Navigation & Store Status */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('featured-categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDeals={() => setIsDealsModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section (with bento collage & badges) */}
        <Hero
          onExploreDeals={handleExploreDeals}
          onGetDirections={handleGetDirections}
        />

        {/* 3. Featured Categories & Tabbed Inventory Browser */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 4. Special Promotions & 3-Bundle Pricing Matrix */}
        <BundlePromoBanner onAddDealToCart={handleAddDealToCart} />

        {/* 5. Camden, NJ Storefront Location, Hours & Map */}
        <StoreLocation />
      </main>

      {/* 6. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('featured-categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDeals={() => setIsDealsModalOpen(true)}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Deals Modal */}
      <DealsModal
        isOpen={isDealsModalOpen}
        onClose={() => setIsDealsModalOpen(false)}
        onAddDeal={handleAddDealToCart}
      />

      {/* Standalone Single-File HTML Exporter Floating Pill */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setShowStandaloneModal(true)}
          className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-3.5 rounded-full shadow-xl border border-blue-400/30 transition-transform hover:scale-105"
        >
          <Code className="w-3.5 h-3.5 text-amber-300" />
          <span>Standalone Single HTML File</span>
        </button>
      </div>

      {/* Standalone HTML Info Modal */}
      {showStandaloneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#D91B5C] text-white flex items-center justify-center font-bold text-sm">
                  👑
                </div>
                <h3 className="font-black text-slate-900 text-base uppercase">
                  Standalone Single HTML Code
                </h3>
              </div>
              <button
                onClick={() => setShowStandaloneModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 my-4 leading-relaxed">
              As requested, this entire high-converting retail website is also compiled into a self-contained, single-file HTML5 document with standalone Tailwind CSS (via CDN) and vanilla JavaScript. You can download the file or open it directly in any browser offline.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 mb-5 space-y-1">
              <div>📁 Saved in workspace: <span className="font-bold text-[#D91B5C]">thehairpalacenj.html</span></div>
              <div>⚡ Standalone Tailwind CSS via CDN</div>
              <div>🛍️ Interactive Cart Drawer + Length Selectors</div>
              <div>📍 Camden, NJ Store Hours: 8AM-9PM Every Day</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyStandaloneCode}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                {htmlCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Code className="w-4 h-4" />
                    <span>Copy HTML Code</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadStandaloneHtml}
                className="py-2.5 px-4 bg-[#D91B5C] hover:bg-[#b8144b] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download .html</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Camden Store Quick Contact / WhatsApp button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <a
          href={`tel:${STORE_INFO.phone}`}
          aria-label="Call Camden Store"
          className="w-13 h-13 rounded-full bg-[#1E3A8A] hover:bg-blue-900 text-white flex items-center justify-center shadow-xl border-2 border-white transition-transform hover:scale-105 group relative"
        >
          <Phone className="w-5 h-5 text-amber-300" />
          <span className="absolute right-15 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Call Store: {STORE_INFO.phone}
          </span>
        </a>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
