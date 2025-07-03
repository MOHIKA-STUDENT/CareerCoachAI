import React from "react";
import { FaUser, FaStar } from "react-icons/fa";

export default function CTA({ onSignupClick }) {
  return (
    <section id="Get Started" className="bg-[#121b32] py-28 text-center px-6 md:px-16">
      <h2 className="text-4xl font-bold text-white mb-4" data-aos="zoom-in">
        Ready to Transform Your <span className="text-sky-400">Career?</span>
      </h2>

      <p className="text-lg mb-8 text-gray-300 max-w-xl mx-auto">
        Join 10,000+ professionals accelerating their growth with smart AI guidance,
        resume analysis, and personalized roadmaps.
      </p>

      <div className="mb-10 flex justify-center items-center gap-4 text-gray-300 text-sm sm:text-base">
        <div className="flex -space-x-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-[#2a3f57] flex items-center justify-center text-sky-400 text-xl">
              <FaUser />
            </div>
          ))}
        </div>

        <span>10,000+ Users</span>

        <div className="flex items-center gap-1 text-sky-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <span className="text-gray-300">4.9/5 Rating</span>
      </div>

      <button
        onClick={onSignupClick}
        className="bg-sky-700 hover:bg-sky-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300"
        data-aos="fade-up"
      >
        Sign Up Now
      </button>
    </section>
  );
}
