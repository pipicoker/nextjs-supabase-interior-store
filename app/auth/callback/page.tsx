"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useToastStore } from "../../store/toastStore";

// Force dynamic rendering for this OAuth callback page
export const dynamic = 'force-dynamic';

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
          addToast(errorDescription || errorParam, "error");
          // Redirect to login after 3 seconds
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        // For @supabase/ssr, the PKCE flow is handled automatically
        // Just verify the session was created
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError.message);
          setError(sessionError.message);
          addToast(sessionError.message, "error");
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to products with success toast
          addToast("Welcome! You're now logged in", "success");
          router.push("/products");
        } else {
          // No session found - try to handle hash fragment auth (fallback)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          
          if (accessToken) {
            // Session should be set automatically, give it a moment
            await new Promise(resolve => setTimeout(resolve, 500));
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            
            if (retrySession) {
              addToast("Welcome! You're now logged in", "success");
              router.push("/products");
              return;
            }
          }
          
          setError("No session found. Please try logging in again.");
          addToast("No session found. Please try logging in again.", "error");
          setTimeout(() => router.push("/login"), 3000);
        }
      } catch (err) {
        console.error("Unexpected error during OAuth callback:", err);
        setError("An unexpected error occurred. Please try again.");
        addToast("An unexpected error occurred. Please try again.", "error");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleOAuthCallback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
