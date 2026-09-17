import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'shipping'>('pickup');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalSavings = originalSubtotal - subtotal;
  const promoDiscount = (subtotal * discountPercent) / 100;
  const shippingFee = deliveryMethod === 'pickup' ? 0 : subtotal > 100 ? 0 : 9.99;
  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'CAMDEN' || couponCode.trim().toUpperCase() === 'QUEEN10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      alert('Try promo code: CAMDEN or QUEEN10 for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  const handleFinishOrder = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* 1. Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D91B5C]" />
              <h2 className="text-base font-black uppercase text-slate-900 tracking-tight">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Order Placed Success View */}
          {orderComplete ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900 mb-1">
                ORDER CONFIRMED!
              </h3>
              <p className="text-sm text-slate-600 mb-4 max-w-xs">
                {deliveryMethod === 'pickup'
                  ? 'Your items are being packed right now at our Camden, NJ storefront! Ready in 15 minutes.'
                  : 'Your order has been received and will ship out priority today!'}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Order Ref:</span>
                  <span className="font-mono text-[#D91B5C]">#HP-CAMDEN-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfillment:</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryMethod === 'pickup' ? 'Storefront Pickup (Camden, NJ)' : 'Express Priority Shipping'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Store Hours:</span>
                  <span className="font-semibold text-slate-900">8:00 AM – 9:00 PM Daily</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Paid:</span>
                  <span className="text-[#D91B5C] font-black">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFinishOrder}
                className="w-full py-3 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* 3. Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#D91B5C] mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold text-slate-800">Your bag is currently empty</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Browse our virgin hair bundles, HD lace wigs, or beauty supplies to add items.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Camden pickup perk notification */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                      <span className="text-base">📍</span>
                      <div>
                        <span className="font-bold">Fast Camden Storefront Pickup:</span> Ready at the counter in 15 minutes!
                      </div>
                    </div>

                    {/* Delivery method selector */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          deliveryMethod === 'pickup'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        🏬 In-Store Pick-up (Free)
                      </button>
                      <button
                        onClick={() => setDeliveryMethod('shipping')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          deliveryMethod === 'shipping'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        🚚 Fast Shipping
                      </button>
                    </div>

                    {/* Product List */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black uppercase text-slate-900 truncate">
                              {item.name}
                            </h4>
                            <div className="text-[11px] text-slate-500 font-semibold">
                              {item.length}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-black text-[#D91B5C]">
                                ${item.price}.00
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  ${item.originalPrice}.00
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity adjuster */}
                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold px-2">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* 4. Footer & Calculations */}
              {items.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                  {/* Coupon Input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try CAMDEN)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-[#D91B5C] bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-900"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Bundle Retail Savings</span>
                        <span>-${totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                    {couponApplied && (
                      <div className="flex justify-between text-[#D91B5C] font-semibold">
                        <span>Camden Promo (10% OFF)</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Fulfillment ({deliveryMethod === 'pickup' ? 'Camden Pickup' : 'Shipping'})</span>
                      <span className="font-semibold text-slate-900">
                        {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total</span>
                      <span className="text-[#D91B5C]">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 px-4 bg-[#D91B5C] hover:bg-[#b8144b] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-900/20 transition-all cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <span>Processing Camden Order...</span>
                    ) : (
                      <>
                        <span>
                          {deliveryMethod === 'pickup'
                            ? 'Reserve for In-Store Pick-up'
                            : 'Proceed to Secure Checkout'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Secure Checkout • 100% Guaranteed Raw Hair • Camden, NJ</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
