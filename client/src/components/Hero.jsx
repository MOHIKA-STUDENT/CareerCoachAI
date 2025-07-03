import React from "react";
import heroImage from "../assets/career.avif"; // ✅ Make sure the file exists

export default function Hero({ onSignupClick}) {
  return (
    <section
      id="Home"
      className="min-h-screen flex items-center bg-gradient-to-b from-primary to-secondary text-center px-6 md:px-16 pt-28 pb-20"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right">
          <h2 className="text-5xl font-extrabold mb-4 text-white">
            Your Personalized AI Career Coach
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get expert insights, resume feedback, and career guidance—all in one place.
          </p>
          <button
            onClick={onSignupClick}
            className="inline-block bg-accent text-primary py-3 px-10 rounded-xl font-semibold hover:bg-accent/60 shadow transition"
          >
            Get Started
          </button>
        </div>

        <div data-aos="fade-left">
          <img
            src={heroImage}
            alt="AI Career Coaching Illustration"
            className="w-full h-auto rounded-xl shadow-2xl border border-darkElem object-cover animate-float"
          />
        </div>
      </div>
    </section>
  );
}
