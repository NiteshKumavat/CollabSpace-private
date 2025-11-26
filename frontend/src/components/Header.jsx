import React from 'react'

function Header() {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-3 ">

      <div className="flex items-center space-x-2 sm:space-x-3">
        <img src="logo-removebg-preview.png" alt="logo" className="w-18 sm:w-20 md:w-22 lg:w-24 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"/>
      </div>

      <div className="flex items-center justify-center space-x-10 sm:space-x-15 bg-white/10 backdrop-blur-md px-4 sm:px-12 md:px-15 py-1.9 sm:py-3 rounded-2xl text-white text-sm sm:text-base md:text-lg transition-all">
        <a href="/" className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl">Home</a>
        <a href="/devlopers" className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl">Devlopers</a>
        <a href="/teams" className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl">Teams</a>
        <a className="flex items-center space-x-1 sm:space-x-2 text-white text-sm sm:text-base md:text-lg" href="profile">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full"></div>
        <span className="hover:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl inline">Nitesh</span>
      	</a>
      </div>

      
    </nav>
  );
}


export default Header