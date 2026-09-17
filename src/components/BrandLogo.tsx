export default function BrandLogo({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <a href="#hero" id="brand-logo-link" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Royal Crown Icon SVG */}
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 48 40"
          className="w-10 h-8 md:w-11 md:h-9 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Crown Shadow / glow */}
          <path
            d="M5 33C5 31.8954 5.89543 31 7 31H41C42.1046 31 43 31.8954 43 33V35C43 36.1046 42.1046 37 41 37H7C5.89543 37 5 36.1046 5 35V33Z"
            fill={light ? '#FBBF24' : '#1E3A8A'}
          />
          {/* Crown Jewels on Base */}
          <circle cx="12" cy="34" r="1.5" fill={light ? '#FFFFFF' : '#D91B5C'} />
          <circle cx="24" cy="34" r="1.8" fill={light ? '#FFFFFF' : '#D4AF37'} />
          <circle cx="36" cy="34" r="1.5" fill={light ? '#FFFFFF' : '#D91B5C'} />
          {/* Crown Peaks */}
          <path
            d="M6 30L9 14L18 24L24 8L30 24L39 14L42 30H6Z"
            fill={light ? '#FFFFFF' : '#1E3A8A'}
          />
          {/* Accent Royal Magenta inlay */}
          <path
            d="M18 24L24 14L30 24L24 28L18 24Z"
            fill="#D91B5C"
          />
          {/* Ball Tips on the 5 Peaks */}
          <circle cx="9" cy="12" r="2.8" fill={light ? '#FBBF24' : '#D4AF37'} />
          <circle cx="18" cy="22" r="2.2" fill={light ? '#FBBF24' : '#D91B5C'} />
          <circle cx="24" cy="6" r="3.2" fill={light ? '#FBBF24' : '#D4AF37'} />
          <circle cx="30" cy="22" r="2.2" fill={light ? '#FBBF24' : '#D91B5C'} />
          <circle cx="39" cy="12" r="2.8" fill={light ? '#FBBF24' : '#D4AF37'} />
        </svg>
      </div>

      {/* Brand Text Stack */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`text-xs md:text-sm font-black tracking-tight ${light ? 'text-white' : 'text-[#1E3A8A]'}`}>
            THE
          </span>
          <span className="text-sm md:text-base font-black tracking-tighter text-[#D91B5C]">
            HAIR
          </span>
          <span className={`text-xs md:text-sm font-black tracking-tight ${light ? 'text-white' : 'text-[#1E3A8A]'}`}>
            PALACE
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[9px] md:text-[10px] font-extrabold tracking-[0.22em] ${light ? 'text-blue-200' : 'text-[#1E3A8A]'}`}>
            NEW JERSEY
          </span>
        </div>
        <span className={`text-[7px] md:text-[8px] font-medium tracking-wider uppercase ${light ? 'text-white/75' : 'text-slate-500'}`}>
          Shop Everything Beauty
        </span>
      </div>
    </a>
  );
}
