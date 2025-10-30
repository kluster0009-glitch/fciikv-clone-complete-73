import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AUTH_ENABLED } from '@/config';
import { OnboardingModal } from '@/components/OnboardingModal';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!AUTH_ENABLED) {
      setUser({ id: 'dev-user', email: 'dev@example.com' } as User);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle login counter and onboarding
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            handleUserLogin(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserLogin = async (userId: string) => {
    try {
      // Fetch current profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('login_counter')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      // Increment login counter
      const newCount = (profile?.login_counter || 0) + 1;
      await supabase
        .from('profiles')
        .update({ login_counter: newCount })
        .eq('id', userId);

      // Show onboarding for first-time users
      if (newCount === 1) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error handling user login:', error);
    }
  };

  const signOut = async () => {
    if (AUTH_ENABLED) {
      await supabase.auth.signOut();
    } else {
      // In dev mode, we just clear the user state
      setUser(null);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showOnboarding && user && (
        <OnboardingModal
          open={showOnboarding}
          userId={user.id}
          userEmail={user.email || ''}
        />
      )}
    </AuthContext.Provider>
  );
};