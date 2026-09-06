import {  createContext, useContext, useEffect, useState  } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  auth,
  googleProvider,
  db,
  handleFirestoreError,
  OperationType,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from '../lib/firebase';

export const ADMIN_EMAIL = 'kpugazhmani21@gmail.com';

export interface UserProfileData {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  savedProjects: string[];
  savedRoadmaps: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthErrorDetails {
  code: string;
  message: string;
  actionHint?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSigningIn: boolean;
  isAdmin: boolean;
  userProfile: UserProfileData | null;
  authError: AuthErrorDetails | null;
  signInWithGoogle: (preferredMode?: 'popup' | 'redirect') => Promise<void>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
  devBypassSignIn: () => void;
  toggleSaveProject: (slug: string) => Promise<void>;
  toggleSaveRoadmap: (slug: string) => Promise<void>;
  isProjectSaved: (slug: string) => boolean;
  isRoadmapSaved: (slug: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Format Firebase Auth errors into actionable, user-friendly messages
 */
function parseAuthError(error: unknown): AuthErrorDetails {
  const errCode = (error as { code?: string })?.code || 'auth/unknown';
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  switch (errCode) {
    case 'auth/unauthorized-domain':
      return {
        code: errCode,
        message: `Domain '${currentHost}' is not authorized in your Firebase Project.`,
        actionHint: `To fix: Open Firebase Console > Authentication > Settings > Authorized Domains and add '${currentHost}'.`,
      };
    case 'auth/operation-not-allowed':
      return {
        code: errCode,
        message: 'Google Sign-In is not enabled in your Firebase Project.',
        actionHint: 'To fix: Open Firebase Console > Authentication > Sign-in method and enable Google.',
      };
    case 'auth/popup-blocked':
      return {
        code: errCode,
        message: 'Sign-in popup was blocked by your browser settings.',
        actionHint: 'Please allow popups for this site or use "Sign in with Redirect".',
      };
    case 'auth/popup-closed-by-user':
      return {
        code: errCode,
        message: 'The Google sign-in window was closed before completion.',
        actionHint: 'Click "Sign In" again to authenticate.',
      };
    case 'auth/cancelled-popup-request':
      return {
        code: errCode,
        message: 'A sign-in request is already in progress.',
        actionHint: 'Please check your other open browser windows or tabs.',
      };
    case 'auth/network-request-failed':
      return {
        code: errCode,
        message: 'Network connection error while communicating with Firebase.',
        actionHint: 'Please verify your internet connection and DNS settings.',
      };
    case 'auth/internal-error':
      return {
        code: errCode,
        message: 'Firebase internal authentication error.',
        actionHint: 'Please check your API key and OAuth Client ID in firebase-applet-config.json.',
      };
    default:
      return {
        code: errCode,
        message: error instanceof Error ? error.message : String(error),
        actionHint: 'Check the browser developer console for detailed network logs.',
      };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [authError, setAuthError] = useState<AuthErrorDetails | null>(null);

  // Check if admin by email
  const isAdmin = Boolean(
    user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  // Check for redirect result on page mount
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          setAuthError(null);
        }
      })
      .catch((err) => {
        console.warn('Firebase getRedirectResult error:', err);
        setAuthError(parseAuthError(err));
      });
  }, []);

  // Sync user profile from Firestore on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserProfile(userSnap.data() as UserProfileData);
          } else {
            // First time login: create initial profile
            const initialData: UserProfileData = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Engineer',
              photoURL: (currentUser.photoURL || '').slice(0, 500),
              savedProjects: [],
              savedRoadmaps: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, initialData);
            setUserProfile(initialData);
          }
        } catch (err) {
          console.warn('Could not sync user profile from Firestore:', err);
          // Fallback profile if Firestore permissions are restricted
          setUserProfile({
            userId: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Engineer',
            photoURL: currentUser.photoURL || '',
            savedProjects: [],
            savedRoadmaps: [],
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (preferredMode: 'popup' | 'redirect' = 'popup') => {
    setIsSigningIn(true);
    setAuthError(null);

    if (preferredMode === 'redirect') {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (err) {
        setIsSigningIn(false);
        const parsed = parseAuthError(err);
        setAuthError(parsed);
        console.error('Firebase signInWithRedirect failed:', err);
      }
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
      setAuthError(null);
    } catch (error) {
      console.error('Firebase signInWithPopup failed:', error);
      const parsed = parseAuthError(error);

      // If popup was blocked, automatically attempt redirect sign-in
      if (parsed.code === 'auth/popup-blocked') {
        console.info('Popup was blocked by browser. Automatically falling back to signInWithRedirect...');
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          setAuthError(parseAuthError(redirectErr));
        }
      } else {
        setAuthError(parsed);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setAuthError(null);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  /**
   * Developer / Offline bypass login for local testing only
   * SECURITY: This is disabled in production environments
   */
  const devBypassSignIn = () => {
    // SECURITY: Only allow dev bypass in development environments
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isDev = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local');
      if (!isDev) {
        console.error('Dev bypass sign-in is disabled in production');
        return;
      }
    }

    const mockUser = {
      uid: 'dev-admin-uid-12345',
      email: ADMIN_EMAIL,
      displayName: 'Pugazhmani K (Dev Mode)',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      providerId: 'google.com',
    } as unknown as User;

    setUser(mockUser);
    setUserProfile({
      userId: 'dev-admin-uid-12345',
      email: ADMIN_EMAIL,
      displayName: 'Pugazhmani K (Dev Admin)',
      savedProjects: [],
      savedRoadmaps: [],
    });
    setAuthError(null);
  };

  const toggleSaveProject = async (slug: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    const currentSaved = userProfile?.savedProjects || [];
    const updated = currentSaved.includes(slug)
      ? currentSaved.filter((s) => s !== slug)
      : [...currentSaved, slug];

    setUserProfile((prev) => (prev ? { ...prev, savedProjects: updated } : null));

    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        savedProjects: updated,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const toggleSaveRoadmap = async (slug: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    const currentSaved = userProfile?.savedRoadmaps || [];
    const updated = currentSaved.includes(slug)
      ? currentSaved.filter((s) => s !== slug)
      : [...currentSaved, slug];

    setUserProfile((prev) => (prev ? { ...prev, savedRoadmaps: updated } : null));

    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        savedRoadmaps: updated,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const isProjectSaved = (slug: string) => {
    return Boolean(userProfile?.savedProjects?.includes(slug));
  };

  const isRoadmapSaved = (slug: string) => {
    return Boolean(userProfile?.savedRoadmaps?.includes(slug));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSigningIn,
        isAdmin,
        userProfile,
        authError,
        signInWithGoogle,
        signOutUser,
        clearAuthError,
        devBypassSignIn,
        toggleSaveProject,
        toggleSaveRoadmap,
        isProjectSaved,
        isRoadmapSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
