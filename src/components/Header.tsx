import {  useState  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Instagram, Menu, X, ExternalLink, ShieldCheck, LogIn, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LearnWithPugazhLogo } from './LearnWithPugazhLogo';

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signInWithGoogle, signOutUser, isSigningIn } = useAuth();

  const navLinks = [
    { label: 'Learn', to: '/learn' },
    { label: 'Roadmaps', to: '/roadmaps' },
    { label: 'Labs', to: '/labs' },
    { label: 'Projects', to: '/projects' },
    { label: 'Portfolio & Bio', to: '/about' },
  ];

  if (isAdmin) {
    navLinks.push({ label: 'Admin', to: '/admin' });
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brandmark */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            id="brand-logo-link"
            className="group flex items-center py-1 px-2 -ml-2 rounded-2xl hover:bg-zinc-100/70 transition-all focus:outline-hidden focus:ring-2 focus:ring-[#3D5AFA]/30"
            aria-label="LearnWithPugazh Home"
          >
            <LearnWithPugazhLogo
              size="md"
              showText={true}
              showTagline={false}
              withContainer="modern"
              badge="LABS"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 pl-2">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    active
                      ? 'text-zinc-950 bg-zinc-100 font-bold border border-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05)]'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Search + Instagram Badge + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Button (3D White / Zinc border) */}
          <button
            id="global-search-trigger"
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-600 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-400 rounded-xl transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] focus:outline-hidden focus:ring-2 focus:ring-zinc-400"
            aria-label="Search curriculum"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline font-medium">Search deep dives...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded-md border border-zinc-200 shadow-2xs font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Admin Direct Button (if admin) */}
          {isAdmin && (
            <Link
              to="/admin"
              id="header-admin-portal-link"
              title="Open Admin Portal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/30 hover:bg-blue-500/20 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}

          {/* User Auth Profile / Login */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1">
              <Link
                to="/admin"
                title={`Signed in as ${user.email}`}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-lg object-cover border border-zinc-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-xs border border-zinc-300">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </Link>
              <button
                type="button"
                onClick={() => signOutUser()}
                title="Sign out"
                className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isSigningIn}
              onClick={() => signInWithGoogle()}
              id="header-google-signin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-all shadow-2xs disabled:opacity-60"
            >
              {isSigningIn ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#3D5AFA]" />
              ) : (
                <LogIn className="w-3.5 h-3.5 text-[#3D5AFA]" />
              )}
              <span>{isSigningIn ? 'Connecting...' : 'Sign In'}</span>
            </button>
          )}

          {/* Instagram Follower Hub 3D Graphite Button */}
          <a
            id="nav-instagram-link"
            href="https://instagram.com/learnwithpugazh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow LearnWithPugazh on Instagram"
            className="btn-3d-primary hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Instagram className="w-3.5 h-3.5" />
            <span className="font-mono">@learnwithpugazh</span>
            <ExternalLink className="w-3 h-3 text-zinc-400 ml-0.5" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  active
                    ? 'text-zinc-950 bg-zinc-100 border border-zinc-300 font-bold'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#3D5AFA] text-white flex items-center justify-center font-bold text-[10px]">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="font-mono text-zinc-700 truncate max-w-[180px]">
                    {user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => signOutUser()}
                  className="text-rose-500 font-semibold px-2 py-1 rounded-lg hover:bg-rose-500/10"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={isSigningIn}
                onClick={() => signInWithGoogle()}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-xs border border-zinc-200 disabled:opacity-60"
              >
                {isSigningIn ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-[#3D5AFA]" />
                ) : (
                  <LogIn className="w-4 h-4 text-[#3D5AFA]" />
                )}
                <span>{isSigningIn ? 'Connecting to Google...' : 'Sign In with Google'}</span>
              </button>
            )}

            <a
              href="https://instagram.com/learnwithpugazh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-primary flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-white" />
                <span className="font-mono text-xs">@learnwithpugazh on Instagram</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase bg-white/20 text-white px-2 py-0.5 rounded-md">
                Follow
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
