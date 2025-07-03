import React from "react";
import { FaRobot, FaFileAlt, FaMapSigns } from "react-icons/fa";

const features = [
  {
    icon: FaRobot,
    title: "AI Career Q&A Chatbot",
    desc: (
      <div className="text-justify">
        Users can ask career-related questions (e.g., resume tips, interview prep) and get AI-powered responses.
      </div>
    ),
  },
  {
    icon: FaFileAlt,
    title: "AI Resume Analyzer",
    desc: (
      <div className="text-justify">
        Upload or paste a resume and get feedback on:
        <ul className="list-disc list-inside mt-2 space-y-1 text-base">
          <li>Formatting</li>
          <li>Keywords matching job descriptions</li>
          <li>Suggestions for improvement</li>
        </ul>
      </div>
    ),
  },
  {
    icon: FaMapSigns,
    title: "Career Roadmap Generator",
    desc: (
      <div className="text-justify">
        Based on your profile, generate a custom roadmap with:
        <ul className="list-disc list-inside mt-2 space-y-1 text-base">
          <li>Suggested skills to learn</li>
          <li>Courses or certifications</li>
          <li>Suggested job roles or paths</li>
        </ul>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section id="Features" className="bg-[#1c293f] text-[#d1d5db] py-16 px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Powerful <span className="text-[#0ea5e9]">Features</span>
        </h2>
        <p className="mt-3 text-lg text-[#d1d5db]">
          Our AI-powered tools are designed to help you excel at every stage of your
          <br className="hidden sm:block" />
          career journey
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <article
            key={i}
            className="group bg-[#0f172a] min-h-[340px] rounded-xl p-8 flex-1 shadow-lg transform transition duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer flex flex-col justify-between"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div>
              <div className="w-16 h-16 mb-6 rounded-full bg-[#152a44] flex items-center justify-center text-[#0ea5e9] 
                              transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Icon className="text-5xl" />
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
              <div className="text-[#d1d5db] text-base leading-relaxed text-justify">{desc}</div>
            </div>
            <span className="mt-6 text-sm text-[#0ea5e9] font-semibold">Learn more &gt;</span>
          </article>
        ))}
      </div>
    </section>
  );
}
