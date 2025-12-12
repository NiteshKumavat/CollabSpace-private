import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

function Header() {
  const { authUser } = useAuthStore();

  if (!authUser) return null; 

  const { fullName, _id, image } = authUser;

  const initials = fullName?.charAt(0).toUpperCase();

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="/logo-removebg-preview.png"
            alt="logo"
            className="w-18 sm:w-20 md:w-22 lg:w-24 object-contain cursor-pointer drop-shadow-md transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-center space-x-10 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white transition-all">
        <Link
          to="/"
          className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl transition"
        >
          Home
        </Link>

        <Link
          to="/developers"
          className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl transition"
        >
          Developers
        </Link>

        <Link
          to="/chats"
          className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl transition"
        >
          Chats
        </Link>

        {/* Profile */}
        <Link
          to={`/profile/${_id}`}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Avatar */}
          {image ? (
            <img
              src={image}
              alt="profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white/30 shadow-md group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 rounded-full font-bold text-black group-hover:scale-105 transition">
              {initials}
            </div>
          )}

          <span className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl transition">
            {fullName}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
