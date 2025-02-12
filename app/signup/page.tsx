"use client";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../lib/auth";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-8 lg:flex justify-center items-center w-full">
      <div className="lg:w-2/5">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <form onSubmit={handleSignup} className="mt-4 space-y-4 grid gap-4">
          {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" /> */}
          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#F9DDB1] border mt-1 px-2 py-4 w-full rounded-lg" />
          </div>
          
        <div>
          <label htmlFor="password" className="text-sm font-semibold">Password</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#F9DDB1] border mt-1 px-2 py-4 w-full rounded-lg" />
        
        </div>

        <button type="submit" className="bg-pry text-white px-2 py-4 w-full rounded-lg">Signup</button>

          <p className="text-sm text-center pt-4">Already have an account? <Link href="../login" className="text-pry font-semibold">Sign in here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
