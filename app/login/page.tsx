"use client";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { signIn } from "../lib/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
  

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  
    if (error) {
      console.error("Google Sign-In Error:", error.message);
      return;
    }
  
    router.push("/"); // Redirect after login
  };

  return (
    <div className="p-8 lg:flex justify-center items-center w-full">
      <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold text-center">Login </h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4 grid gap-4">

          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className=" rounded-lg border mt-1 px-2 py-4 w-full" />
          </div>
         
         <div>
           <label htmlFor="password" className="text-sm font-semibold">Password</label>
           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className=" rounded-lg border mt-1 px-2 py-4 w-full" />
         </div>
          
          <button type="submit" className="bg-pry text-white px-2 py-4  w-full rounded-lg">Login</button>
        </form>

        <div className="text-center my-6 text-gray-400 text-sm">-------------- or sign up with -------------- </div>
        <button onClick={signInWithGoogle} className="mt-4 bg-[#D0D0D0]  p-2 w-full flex justify-center items-center gap-3 text-lg rounded-lg">
        <FcGoogle />

          Sign in with Google</button>

        <div className="text-center mt-6 text-gray-400 font-bold text-sm">
          Dont have an account yet? <Link href="../signup" className="underline">Create an account</Link>
        </div>
          
        </div>
    </div>
  );
};

export default LoginPage;
