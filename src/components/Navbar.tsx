import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="text-3xl font-extrabold text-white">
          Task
        </div>
        <div className="space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="text-white text-xl hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:text-2xl"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white text-xl hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-2xl"
          >
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className="text-white text-xl hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-2xl"
          >
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
