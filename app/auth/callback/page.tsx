"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useToastStore } from "../../store/toastStore";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastStore();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check for error in URL params (OAuth failure)
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (errorParam) {
          console.error("OAuth Error:", errorDescription || errorParam);
          setError(errorDescription || errorParam);
          // Redirect to login after 3 seconds
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        // Get the code from URL if present (PKCE flow)
        const code = searchParams.get('code');
        
        if (code) {
          // Exchange code for session
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error("Session exchange error:", exchangeError.message);
            setError(exchangeError.message);
            setTimeout(() => router.push("/login"), 3000);
            return;
          }
        }

        // Verify we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError.message);
          setError(sessionError.message);
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to products with success toast
          addToast("Welcome! You're now logged in", "success");
          router.push("/products");
        } else {
          // No session found
          setError("No session found. Please try logging in again.");
          addToast("No session found. Please try logging in again.", "error");
          setTimeout(() => router.push("/login"), 3000);
        }
      } catch (err) {
        console.error("Unexpected error during OAuth callback:", err);
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleOAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {error ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">Authentication Error</h2>
            <p>{error}</p>
          </div>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-lg">Completing authentication...</p>
        </div>
      )}
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
