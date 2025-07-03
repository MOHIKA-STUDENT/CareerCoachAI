import React from "react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Navbar({ onSignupClick, onLoginClick }) {
  return (
    <nav className="fixed w-full top-0 backdrop-blur-md bg-secondary/80 border-b border-darkElem z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-accent">CareerCoach AI</h1>

        <ul className="hidden sm:flex space-x-8 text-body font-medium">
          {["Home", "Features", "How It Works", "Get Started"].map((sec) => (
            <li key={sec}>
              <a href={`#${sec}`} className="py-1 hover:text-accent relative group">
                {sec.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                <span className="block max-w-0 group-hover:max-w-full h-0.5 bg-accent transition-all"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 bg-white text-secondary rounded-xl hover:bg-gray-300 transition"
          >
            <FaSignInAlt /> Log In
          </button>
          <button
            onClick={onSignupClick}
            className="flex items-center gap-2 bg-accent px-4 py-2 rounded-xl shadow-lg hover:shadow-xl hover:bg-accent/60 transition duration-300"
          >
            <FaUserPlus /> Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
