import { AlertTriangle, RefreshCw, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthModal() {
  const { authError, clearAuthError, signInWithGoogle, devBypassSignIn, isSigningIn } = useAuth();

  if (!authError) return null;

  const isUnauthorizedDomain = authError.code === 'auth/unauthorized-domain';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative text-zinc-900">
        {/* Close Button */}
        <button
          onClick={clearAuthError}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-lg font-bold text-zinc-900">
              Authentication Notice
            </h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {authError.code}
            </p>
          </div>
        </div>

        {/* Error Message */}
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 text-sm leading-relaxed">
          <p className="text-zinc-800 font-medium">
            {authError.message}
          </p>
          {authError.actionHint && (
            <p className="text-xs text-zinc-600 pt-1 border-t border-zinc-200/80">
              💡 <strong>Next Step:</strong> {authError.actionHint}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Fallback to Redirect Sign-in */}
          <button
            type="button"
            disabled={isSigningIn}
            onClick={() => signInWithGoogle('redirect')}
            className="btn-3d-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
          >
            {isSigningIn ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>Try Sign In with Redirect (Full Window)</span>
          </button>

          {/* Retry Popup */}
          <button
            type="button"
            disabled={isSigningIn}
            onClick={() => signInWithGoogle('popup')}
            className="btn-3d-white w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>Retry Sign In with Popup</span>
          </button>

          {/* Dev Bypass Option (if localhost or unauthorized domain) */}
          {(isUnauthorizedDomain || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
            <div className="pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={devBypassSignIn}
                className="w-full py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors border border-dashed border-zinc-300"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dev Mode: Sign In as Admin (kpugazhmani21@gmail.com)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
