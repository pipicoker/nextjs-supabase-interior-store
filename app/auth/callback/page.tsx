"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthResponse = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("OAuth Error:", error.message);
      }
      if (data?.session) {
        router.push("/"); // Redirect after successful login
      }
    };

    handleOAuthResponse();
  }, [router]);

  return <p>Redirecting...</p>;
};

export default AuthCallback;
