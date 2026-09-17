import { useState, useMemo } from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle2, Store, Car, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function StoreLocation() {
  const [directionsCopied, setDirectionsCopied] = useState(false);

  // Dynamic store status based on Camden local time
  const isOpen = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 8 && hour < 21;
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText?.(STORE_INFO.fullAddress);
    setDirectionsCopied(true);
    setTimeout(() => setDirectionsCopied(false), 2000);
  };

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The Hair Palace, Camden, NJ')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="visit-store-section" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1E3A8A] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Brick & Mortar Retail Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
            VISIT OUR CAMDEN, NJ STORE
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Feel the raw texture in person, match your exact lace tone, or pick up your online order in under 15 minutes.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours, Info & Action Buttons */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col justify-between">
            <div>
              {/* Live Status Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                      {isOpen ? '🟢 OPEN RIGHT NOW' : '🟡 CURRENTLY CLOSED'}
                    </span>
                    <span className="text-xs text-slate-500">
                      Open 8:00 AM – 9:00 PM • 7 Days a Week
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold bg-white text-[#1E3A8A] border border-blue-200 px-3 py-1 rounded-full shadow-xs">
                  Every Day
                </span>
              </div>

              {/* Detail Blocks */}
              <div className="space-y-6 mt-6">
                
                {/* Address Block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Store Address
                    </h4>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {STORE_INFO.fullAddress}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Conveniently located in Camden, New Jersey with storefront street parking.
                    </p>
                  </div>
                </div>

                {/* Operating Hours Block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#D91B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Store Hours
                    </h4>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      8:00 AM – 9:00 PM
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        Monday through Sunday (No Days Off)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Click-to-Call Phone Block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Store Inquiries & Pickup Phone
                    </h4>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {STORE_INFO.phone}
                    </p>
                    <p className="text-xs text-slate-500">
                      Call our Camden hair specialists directly for stock availability.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="get-directions-gmaps-btn"
                onClick={handleOpenGoogleMaps}
                className="w-full py-3 px-4 bg-[#1E3A8A] hover:bg-[#162a64] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Get Directions</span>
              </button>

              <a
                id="click-to-call-btn"
                href={`tel:${STORE_INFO.phone}`}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Storefront</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Interactive Map Module & In-Store Perks */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Interactive Map Visual Mockup Card */}
            <div className="bg-[#1E3A8A] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-blue-900">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D91B5C] flex items-center justify-center font-bold text-white text-sm">
                    👑
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      The Hair Palace Storefront
                    </div>
                    <div className="text-[11px] text-blue-200">
                      Camden, New Jersey
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                  15-Min Pick-up
                </span>
              </div>

              {/* Map Canvas Visual Area */}
              <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-800 border border-white/20 group">
                <iframe
                  title="The Hair Palace Camden NJ Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48995.14840899011!2d-75.14324546416174!3d39.932977799513364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8e312f275e7%3A0x6e8fbe5998f82215!2sCamden%2C%20NJ!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0 grayscale-[20%] contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Pin Overlay Banner */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 p-3 rounded-xl shadow-lg flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D91B5C] flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-black">Central Camden, NJ</div>
                      <div className="text-[10px] text-slate-500">Minutes from Ben Franklin Bridge & Ferry Ave</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors"
                  >
                    {directionsCopied ? 'Copied!' : 'Copy Address'}
                  </button>
                </div>
              </div>

              {/* Store Perks Ticker */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Car className="w-4 h-4 mx-auto text-amber-300 mb-1" />
                  <div className="text-[10px] font-bold">Curbside Pick-up</div>
                </div>
                <div className="bg-white/10 p-2 rounded-xl">
                  <Sparkles className="w-4 h-4 mx-auto text-pink-300 mb-1" />
                  <div className="text-[10px] font-bold">Lace Color Match</div>
                </div>
                <div className="bg-white/10 p-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
                  <div className="text-[10px] font-bold">Touch & Inspect</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
