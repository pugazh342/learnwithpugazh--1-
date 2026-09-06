import { useId } from 'react';

export interface LearnWithPugazhLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'color' | 'monochrome' | 'white';
  showText?: boolean;
  showTagline?: boolean;
  taglineText?: string;
  withContainer?: boolean | 'dark' | 'light' | 'modern';
  badge?: string;
  className?: string;
}

/**
 * Official LearnWithPugazh Brand Logo Component
 * Modernized with high-contrast dual-theme visibility & 3D dimensional depth.
 * 
 * Palette:
 * - Primary Sapphire: #3D5AFA
 * - Deep Violet:      #511CC5
 * - Light Mist:        #EFECF8
 * - Charcoal Navy:     #1F212E
 * - Slate Grey:        #7A6181
 */
export function LearnWithPugazhLogo({
  size = 'md',
  variant = 'color',
  showText = true,
  showTagline = false,
  taglineText = 'Learn. Build. Share.',
  withContainer = false,
  badge,
  className = '',
}: LearnWithPugazhLogoProps) {
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, '');

  // Size mapping
  const sizeConfig = {
    xs: { icon: 'w-6 h-6', markSize: 22, text: 'text-[13px]', tagline: 'text-[8.5px]', gap: 'gap-2' },
    sm: { icon: 'w-8 h-8', markSize: 28, text: 'text-[15px]', tagline: 'text-[9.5px]', gap: 'gap-2.5' },
    md: { icon: 'w-9 h-9 sm:w-10 sm:h-10', markSize: 34, text: 'text-[16px] sm:text-[17px]', tagline: 'text-[10px]', gap: 'gap-2.5 sm:gap-3' },
    lg: { icon: 'w-12 h-12', markSize: 44, text: 'text-xl', tagline: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 'w-16 h-16', markSize: 58, text: 'text-2xl sm:text-3xl', tagline: 'text-xs sm:text-sm', gap: 'gap-4' },
    '2xl': { icon: 'w-24 h-24', markSize: 84, text: 'text-3xl sm:text-4xl', tagline: 'text-sm sm:text-base', gap: 'gap-5' },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  // Container styling
  const isModernContainer = withContainer === 'modern';
  const isDarkContainer = withContainer === true || withContainer === 'dark';
  const isLightContainer = withContainer === 'light';

  const containerClasses = isModernContainer
    ? 'rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1C2033] via-[#161826] to-[#0E101A] p-1.5 sm:p-2 border border-[#2D334D] shadow-[0_4px_14px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] group-hover:border-[#3D5AFA]/60 group-hover:shadow-[0_4px_18px_rgba(61,90,250,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all shrink-0'
    : isDarkContainer
    ? 'rounded-2xl bg-[#1F212E] p-2 shadow-[0_8px_20px_rgba(31,33,46,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] border border-[#2A2E40] shrink-0'
    : isLightContainer
    ? 'rounded-2xl bg-[#EFECF8] p-2 shadow-[0_4px_14px_rgba(61,90,250,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#DFDAF5] shrink-0'
    : '';

  return (
    <div className={`inline-flex items-center ${current.gap} ${className}`}>
      {/* 3D Geometric Folded Ribbon "P" Mark */}
      <div
        className={`${current.icon} shrink-0 flex items-center justify-center transition-transform ${containerClasses}`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
          aria-hidden="true"
        >
          <defs>
            {/* Top Outer Ribbon: Vibrant Cyan to Primary Sapphire (#3D5AFA) */}
            <linearGradient
              id={`p-ribbon-${uniqueId}`}
              x1="22"
              y1="14"
              x2="90"
              y2="46"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#3D5AFA" />
              <stop offset="70%" stopColor="#314BE4" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>

            {/* Inner Fold & Underside: Deep Violet (#511CC5) */}
            <linearGradient
              id={`p-fold-${uniqueId}`}
              x1="90"
              y1="40"
              x2="40"
              y2="66"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="45%" stopColor="#511CC5" />
              <stop offset="100%" stopColor="#2E0854" />
            </linearGradient>

            {/* Left Stem: Sapphire to Deep Violet */}
            <linearGradient
              id={`p-stem-${uniqueId}`}
              x1="28"
              y1="14"
              x2="32"
              y2="96"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#3D5AFA" />
              <stop offset="55%" stopColor="#3149E2" />
              <stop offset="100%" stopColor="#511CC5" />
            </linearGradient>

            {/* 3D Specular Highlight on Ribbon Ridge */}
            <linearGradient
              id={`p-specular-${uniqueId}`}
              x1="26"
              y1="14"
              x2="78"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {variant === 'white' ? (
            /* Solid White Mark */
            <g fill="#FFFFFF">
              <path d="M22 22C22 17.5817 25.5817 14 30 14H40V88C40 92.4183 36.4183 96 32 96C27.5817 96 22 92.4183 22 88V22Z" />
              <path d="M30 14H64C78.3594 14 90 25.6406 90 40C90 54.3594 78.3594 66 64 66H40V48H64C68.4183 48 72 44.4183 72 40C72 35.5817 68.4183 32 64 32H30V14Z" />
            </g>
          ) : variant === 'monochrome' ? (
            /* Solid Dark Mark: Charcoal Navy (#1F212E) */
            <g fill="#1F212E">
              <path d="M22 22C22 17.5817 25.5817 14 30 14H40V88C40 92.4183 36.4183 96 32 96C27.5817 96 22 92.4183 22 88V22Z" />
              <path d="M30 14H64C78.3594 14 90 25.6406 90 40C90 54.3594 78.3594 66 64 66H40V48H64C68.4183 48 72 44.4183 72 40C72 35.5817 68.4183 32 64 32H30V14Z" />
            </g>
          ) : (
            /* Refined 3D Ribbon Logo Mark with Deep Violet Fold & Sapphire Highlights */
            <g>
              {/* 1. Left Vertical Pillar / Stem */}
              <path
                d="M22 24C22 18.4772 26.4772 14 32 14H40V88C40 93.5228 35.5228 98 30 98C24.4772 98 22 93.5228 22 88V24Z"
                fill={`url(#p-stem-${uniqueId})`}
              />

              {/* 2. Lower Loop Under-Fold (Deep Violet Ribbon) */}
              <path
                d="M40 46H64C72.8366 46 80 39.732 80 32C80 24.268 72.8366 18 64 18H40V14H64C78.3594 14 90 25.6406 90 40C90 54.3594 78.3594 66 64 66H40V46Z"
                fill={`url(#p-fold-${uniqueId})`}
              />

              {/* 3. Top Outer Ribbon (Sapphire Gradient with Smooth Bevel) */}
              <path
                d="M30 14H64C78.3594 14 90 25.6406 90 40C90 47.5 85.5 54 78.5 58.5L62.5 42C63.4 41.2 64 40.1 64 39C64 33.4772 59.5228 29 54 29H40V14H30Z"
                fill={`url(#p-ribbon-${uniqueId})`}
              />

              {/* 4. 3D Diagonal Fold Crease / Twist */}
              <path
                d="M62.5 42L78.5 58.5C74.4 61.8 69.4 64 64 64H40V48H55C58.8 48 61.2 45.4 62.5 42Z"
                fill={`url(#p-fold-${uniqueId})`}
              />

              {/* 5. Precision Top Edge Specular Lighting */}
              <path
                d="M26 16C26 15 28 14.5 32 14.5H64C76 14.5 87 23 88 35"
                stroke={`url(#p-specular-${uniqueId})`}
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Modern High-Contrast Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div
            className={`font-sans tracking-tight ${current.text} flex items-center flex-nowrap`}
          >
            {/* LearnWith: High contrast pitch black in light mode, pure crisp white in dark mode */}
            <span className="text-zinc-950 font-black tracking-tight drop-shadow-2xs">
              LearnWith
            </span>

            {/* Pugazh: Radiant Sapphire to Indigo 3D Gradient */}
            <span className="ml-0.5 font-black tracking-tight bg-gradient-to-r from-[#3D5AFA] via-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">
              Pugazh
            </span>

            {/* Optional Modern Architectural Badge */}
            {badge && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-mono font-extrabold uppercase tracking-wider bg-indigo-50 text-[#3D5AFA] border border-indigo-200/80 shadow-2xs ml-1.5">
                {badge}
              </span>
            )}
          </div>

          {showTagline && (
            <span
              className={`mt-1 font-mono uppercase tracking-widest text-[#7A6181] font-semibold ${current.tagline}`}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
