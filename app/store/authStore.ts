import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

interface AuthState {
  user: any;
  loading: boolean
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Check session on initial load
supabase.auth.getSession().then(({ data }) => {
  useAuthStore.setState({ 
    user: data.session?.user || null,
    loading: false // Set loading to false after check
  });
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({ 
    user: session?.user || null,
    loading: false 
  });
});
