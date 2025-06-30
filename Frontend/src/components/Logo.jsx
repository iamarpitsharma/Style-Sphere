import React from "react";
import { Link } from "react-router-dom"; // If you use React Router

export default function Logo({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-3xl",
    xlarge: "text-4xl",
  };

  return (
    <Link to="/" className={`font-bold ${sizeClasses[size]} ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Logo Icon */}
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center transform rotate-12">
            <div className="w-4 h-4 bg-white rounded-sm transform -rotate-12"></div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        </div>

        {/* Logo Text */}
        <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold tracking-tight">
          Style<span className="text-gray-800">Sphere</span>
        </span>
      </div>
    </Link>
  );
}
