"use client";

import { useAuthStore } from "../../store/authStore";
import Link from "next/link";
import { FaShoppingBag, FaUser, FaHeart } from "react-icons/fa";

export default function WelcomeBanner() {
  const { user } = useAuthStore();

  if (!user) return null;

  const getFirstName = (email: string | undefined) => {
    if (!email) return "Friend";
    return email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
  };

  return (
    <div className="bg-gradient-to-r from-pry to-orange-400 text-white py-8 px-8 lg:px-24 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {getFirstName(user.email)}! 👋
            </h2>
            <p className="text-white/90 text-lg">
              Discover our latest furniture collections and exclusive deals
            </p>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/products" 
              className="bg-white text-pry px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <FaShoppingBag />
              Shop Now
            </Link>
            <Link 
              href="/account" 
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <FaUser />
              My Account
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link href="/cart" className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <FaShoppingBag className="text-2xl" />
              <div>
                <p className="font-semibold">My Cart</p>
                <p className="text-sm text-white/80">View your items</p>
              </div>
            </div>
          </Link>

          <Link href="/products" className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <FaHeart className="text-2xl" />
              <div>
                <p className="font-semibold">Browse Products</p>
                <p className="text-sm text-white/80">Find your style</p>
              </div>
            </div>
          </Link>

          <Link href="/account" className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <FaUser className="text-2xl" />
              <div>
                <p className="font-semibold">My Account</p>
                <p className="text-sm text-white/80">Manage profile</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

