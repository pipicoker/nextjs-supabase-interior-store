import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user: User | null) => set({ user }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Check session on initial load (only in browser)
if (typeof window !== 'undefined') {
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
}
