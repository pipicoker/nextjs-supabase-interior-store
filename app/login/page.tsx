"use client";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { signIn } from "../lib/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useToastStore } from "../store/toastStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { addToast } = useToastStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signIn(email, password);
      // Show success toast
      addToast("Welcome back! Login successful", "success");
      // Wait a bit for auth state to propagate
      await new Promise(resolve => setTimeout(resolve, 500));
      // Redirect to products page instead of home
      router.push("/products");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        addToast(error.message, "error");
      } else{
        setError("Error logging in");
        addToast("Error logging in", "error");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const signInWithGoogle = async () => {
    setLoading(true);
    setError("");
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          skipBrowserRedirect: false,
        }
      });
    
      if (error) {
        console.error("Google Sign-In Error:", error.message);
        setError(error.message);
        addToast(error.message, "error");
        setLoading(false);
      }
      // Don't set loading to false or redirect here - OAuth will redirect to Google
    } catch {
      setError("Failed to initiate Google sign-in");
      addToast("Failed to initiate Google sign-in", "error");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:flex justify-center items-center w-full">
      <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold text-center">Login </h2>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="mt-4 space-y-4 grid gap-4">

          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className=" rounded-lg border mt-1 px-2 py-4 w-full" 
              required
              disabled={loading}
            />
          </div>
         
         <div>
           <label htmlFor="password" className="text-sm font-semibold">Password</label>
           <input 
             type="password" 
             placeholder="Password" 
             value={password} 
             onChange={(e) => setPassword(e.target.value)} 
             className=" rounded-lg border mt-1 px-2 py-4 w-full" 
             required
             disabled={loading}
           />
         </div>
          
          <button 
            type="submit" 
            className="bg-pry text-white px-2 py-4  w-full rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center my-6 text-gray-400 text-sm">-------------- or sign up with -------------- </div>
        <button 
          onClick={signInWithGoogle} 
          className="mt-4 bg-[#D0D0D0]  p-2 w-full flex justify-center items-center gap-3 text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <FcGoogle />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <div className="text-center mt-6 text-gray-400 font-bold text-sm">
          Dont have an account yet? <Link href="../signup" className="underline">Create an account</Link>
        </div>
          
        </div>
    </div>
  );
};

export default LoginPage;
