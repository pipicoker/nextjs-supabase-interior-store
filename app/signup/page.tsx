"use client";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useToastStore } from "../store/toastStore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { addToast } = useToastStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      await signUp(email, password);
      setSuccess(true);
      addToast("Account created successfully! Please log in", "success");
      // Wait 2 seconds to show success message, then redirect
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Failed to create account");
      addToast(error.message || "Failed to create account", "error");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:flex justify-center items-center w-full">
      <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Account created successfully! Redirecting to login...
          </div>
        )}
        
        <form onSubmit={handleSignup} className="mt-4 space-y-4 grid gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-[#F9DDB1] border mt-1 px-2 py-4 w-full rounded-lg" 
              required
              disabled={loading || success}
            />
          </div>
          
        <div>
          <label htmlFor="password" className="text-sm font-semibold">Password</label>
        <input 
          type="password" 
          placeholder="Password (min 6 characters)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="bg-[#F9DDB1] border mt-1 px-2 py-4 w-full rounded-lg" 
          required
          minLength={6}
          disabled={loading || success}
        />
        
        </div>

        <button 
          type="submit" 
          className="bg-pry text-white px-2 py-4 w-full rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || success}
        >
          {loading ? "Creating account..." : success ? "Success!" : "Signup"}
        </button>

          <p className="text-sm text-center pt-4">Already have an account? <Link href="../login" className="text-pry font-semibold">Sign in here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
