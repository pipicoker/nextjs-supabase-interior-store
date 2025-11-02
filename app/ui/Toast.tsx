"use client";

import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  const icons = {
    success: <AiOutlineCheckCircle className="w-6 h-6" />,
    error: <AiOutlineCloseCircle className="w-6 h-6" />,
    info: <AiOutlineInfoCircle className="w-6 h-6" />,
    warning: <AiOutlineWarning className="w-6 h-6" />,
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`${styles[type]} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        {icons[type]}
        <p className="flex-1 font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

