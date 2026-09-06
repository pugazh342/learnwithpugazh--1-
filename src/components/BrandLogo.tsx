
interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  taglineText?: string;
  className?: string;
  monochrome?: boolean;
}

/**
 * Official LearnWithPugazh Brand Logo Component
 * Faithfully implemented from the LearnWithPugazh Brand Identity Presentation V2.0:
 * - Refined 3D Ribbon "P" Mark with Primary Sapphire (#3D5AFA) & Deep Violet (#511CC5)
 * - Charcoal Navy (#1F212E) and Primary Sapphire wordmark lockup
 * - Slate Grey (#7A6181) "Learn. Build. Share." tagline
 */
export function BrandLogoMark({
  size = 36,
  className = '',
  monochrome = false,
  idPrefix = 'lwp',
}: {
  size?: number;
  className?: string;
  monochrome?: boolean;
  idPrefix?: string;
}) {
  if (monochrome) {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="currentColor"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <path d="M22 22C22 17.5817 25.5817 14 30 14H62C75.2548 14 86 24.7452 86 38C86 51.2548 75.2548 62 62 62H42V88C42 92.4183 38.4183 96 34 96C29.5817 96 26 92.4183 26 88V22ZM42 30V46H62C66.4183 46 70 42.4183 70 38C70 33.5817 66.4183 30 62 30H42Z" />
      </svg>
    );
  }

  const loopId = `${idPrefix}-sapphire-loop`;
  const foldId = `${idPrefix}-violet-fold`;
  const stemId = `${idPrefix}-stem-grad`;
  const specularId = `${idPrefix}-specular`;
  const shadowId = `${idPrefix}-shadow`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 drop-shadow-xs ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Top Outer Ribbon (Cyan to Primary Sapphire #3D5AFA) */}
        <linearGradient id={loopId} x1="24" y1="14" x2="88" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="35%" stopColor="#3D5AFA" />
          <stop offset="75%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Lower Loop Inward Fold (Deep Violet #511CC5) */}
        <linearGradient id={foldId} x1="88" y1="36" x2="38" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#511CC5" />
          <stop offset="100%" stopColor="#311082" />
        </linearGradient>

        {/* Vertical Stem (Sapphire to Indigo) */}
        <linearGradient id={stemId} x1="28" y1="14" x2="36" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3D5AFA" />
          <stop offset="55%" stopColor="#3149E2" />
          <stop offset="100%" stopColor="#511CC5" />
        </linearGradient>

        {/* Specular Light Reflection */}
        <linearGradient id={specularId} x1="26" y1="14" x2="80" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Soft Ambient Shadow */}
        <filter id={shadowId} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1F212E" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        {/* 1. Left Vertical Stem */}
        <path
          d="M22 24C22 18.4772 26.4772 14 32 14H40V88C40 93.5228 35.5228 98 30 98C24.4772 98 22 93.5228 22 88V24Z"
          fill={`url(#${stemId})`}
        />

        {/* 2. Bottom Loop Under-Ribbon (Deep Violet) */}
        <path
          d="M40 46H62C70.8366 46 78 39.732 78 32C78 24.268 70.8366 18 62 18H40V14H62C78.5685 14 92 24.7452 92 38C92 51.2548 78.5685 62 62 62H40V46Z"
          fill={`url(#${foldId})`}
        />

        {/* 3. Top Outer Ribbon (Sapphire Gradient) */}
        <path
          d="M30 14H62C78.5685 14 92 24.7452 92 38C92 45.8 87.5 52.6 80.5 56.8L63.5 39.8C64.4 39.1 65 38.1 65 37C65 31.4772 60.5228 27 55 27H40V14H30Z"
          fill={`url(#${loopId})`}
        />

        {/* 4. 3D Overlapping Fold Crease */}
        <path
          d="M63.5 39.8L80.5 56.8C75.8 59.8 70.2 62 62 62H40V46H54C58.2 46 61.8 43.6 63.5 39.8Z"
          fill={`url(#${foldId})`}
        />

        {/* 5. Precision Top Specular Highlight */}
        <path
          d="M26 16C26 15 28 14.5 32 14.5H62C75 14.5 87 23.5 88.5 35"
          stroke={`url(#${specularId})`}
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function BrandLogo({
  variant = 'horizontal',
  size = 'md',
  showTagline = false,
  taglineText = 'Learn. Build. Share.',
  className = '',
  monochrome = false,
}: BrandLogoProps) {
  // Dimensions per size preset
  const sizeMap = {
    xs: { markSize: 22, textClass: 'text-[13px]', subClass: 'text-[9px]', gap: 'gap-2' },
    sm: { markSize: 28, textClass: 'text-[15px]', subClass: 'text-[10px]', gap: 'gap-2.5' },
    md: { markSize: 34, textClass: 'text-[17px]', subClass: 'text-[10px]', gap: 'gap-2.5' },
    lg: { markSize: 46, textClass: 'text-2xl', subClass: 'text-xs', gap: 'gap-3.5' },
    xl: { markSize: 64, textClass: 'text-3xl sm:text-4xl', subClass: 'text-xs sm:text-sm', gap: 'gap-4' },
  };

  const current = sizeMap[size];

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <BrandLogoMark size={current.markSize} monochrome={monochrome} />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${current.gap} ${className}`}>
        <BrandLogoMark size={current.markSize} monochrome={monochrome} />
        <div className="flex flex-col items-center">
          <div className={`${current.textClass} font-black tracking-tight font-sans leading-none`}>
            <span className="text-zinc-950">LearnWith</span>
            <span className="ml-0.5 bg-gradient-to-r from-[#3D5AFA] via-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">Pugazh</span>
          </div>
          {showTagline && (
            <div className={`mt-1 font-mono uppercase tracking-widest text-[#7A6181] font-semibold ${current.subClass}`}>
              {taglineText}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={`flex items-center ${current.gap} ${className}`}>
      <BrandLogoMark size={current.markSize} monochrome={monochrome} />
      <div className="flex flex-col justify-center">
        <div className={`${current.textClass} font-black tracking-tight font-sans leading-none flex items-center`}>
          <span className="text-zinc-950">LearnWith</span>
          <span className="ml-0.5 bg-gradient-to-r from-[#3D5AFA] via-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">Pugazh</span>
        </div>
        {showTagline && (
          <span className={`mt-0.5 font-mono tracking-wider uppercase text-[#7A6181] font-semibold leading-none ${current.subClass}`}>
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
}
