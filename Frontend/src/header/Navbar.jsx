import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // icons for mobile menu

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/90 to-gray-100/90 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-800 tracking-wide">
          <Link
            to="/dashboard"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            TaskFlow AI
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Projects", path: "/projects" },
            { name: "Contact Us", path: "/contact" },
            { name: "FAQ", path: "/faq" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-red-700 transition-transform duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl px-6 py-4 space-y-4">
          <Link
            to="/projects"
            className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
