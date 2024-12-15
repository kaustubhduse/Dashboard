import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-white">Task</div>

        {/* Hamburger Button */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:space-x-8 md:items-center md:text-lg md:font-medium absolute md:static top-16 left-0 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 md:bg-transparent md:w-auto transition-all duration-300 ease-in-out z-50`}
        >
          <Link
            to="/"
            className="block md:inline-block text-white text-xl py-3 px-8 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:text-2xl"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block md:inline-block text-white text-xl py-3 px-8 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-2xl"
          >
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className="block md:inline-block text-white text-xl py-3 px-8 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-2xl"
          >
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
