"use client";

import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useToastStore } from "../store/toastStore";

export default function AccountPage() {
  const { user, logout, loading } = useAuthStore();
  const router = useRouter();
  const { addToast } = useToastStore();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      addToast("You've been logged out successfully", "info");
      router.push("/");
    } catch {
      addToast("Error logging out. Please try again", "error");
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pry mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const getDisplayName = (email: string | undefined) => {
    if (!email) return "User";
    return email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-pry rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {getDisplayName(user.email)}
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <FaEnvelope className="text-pry" />
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaUser className="text-pry text-xl" />
                <div>
                  <p className="font-semibold text-gray-700">Display Name</p>
                  <p className="text-gray-600">{getDisplayName(user.email)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-pry text-xl" />
                <div>
                  <p className="font-semibold text-gray-700">Email Address</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaUser className="text-pry text-xl" />
                <div>
                  <p className="font-semibold text-gray-700">Account ID</p>
                  <p className="text-gray-600 text-sm truncate">{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/cart" 
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-pry hover:text-white transition-colors group"
            >
              <FaShoppingCart className="text-2xl text-pry group-hover:text-white" />
              <div>
                <p className="font-semibold">My Cart</p>
                <p className="text-sm text-gray-600 group-hover:text-white/80">View your shopping cart</p>
              </div>
            </Link>

            <Link 
              href="/products" 
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-pry hover:text-white transition-colors group"
            >
              <FaHeart className="text-2xl text-pry group-hover:text-white" />
              <div>
                <p className="font-semibold">Browse Products</p>
                <p className="text-sm text-gray-600 group-hover:text-white/80">Explore our collection</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Actions</h2>
          <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSignOutAlt />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

