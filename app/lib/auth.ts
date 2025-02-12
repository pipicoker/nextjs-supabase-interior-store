import { supabase } from "./supabaseClient";

// Sign up with email and password
export const signUp = async (email: string, password: string,) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    
  });
  if (error) throw error;
  return data;
};

// Login with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// Logout
export const signOut = async () => {
  await supabase.auth.signOut();
};


