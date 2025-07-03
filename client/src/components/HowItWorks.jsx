import React from "react";

const steps = [
  {
    title: "Create Your Profile",
    desc: "Sign up and answer a few questions about your skills, experience, and career goals.",
  },
  {
    title: "Get AI Analysis",
    desc: "Our AI analyzes your profile and provides personalized career recommendations.",
  },
  {
    title: "Explore Opportunities",
    desc: "Discover career paths, get resume feedback, and practice interviews with our AI coach.",
  },
  {
    title: "Track Your Progress",
    desc: "Monitor your career development and receive ongoing guidance as you grow.",
  },
];

export default function HowItWorks() {
  return (
    <section id="How It Works" className="bg-[#0D1526] text-[#D1D5DB] py-28 px-6 md:px-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          How It <span className="text-[#2EA1E1]">Works</span>
        </h2>
        <p className="mt-4 text-[#9CA3AF] text-base sm:text-lg">
          Our AI-powered platform makes career guidance simple and effective
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
          <img
            src="https://storage.googleapis.com/a1aa/image/13bd566b-258b-4c71-06a7-a105e58a03af.jpg"
            alt="Illustration showing AI process"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute top-20 left-12 bg-[#D9F0FF] rounded-full w-20 h-12"></div>
          <div className="absolute top-36 left-12 bg-[#D9F0FF] rounded-full w-20 h-12"></div>
          <div className="absolute top-28 right-12 bg-[#2EA1E1] rounded-full w-28 h-12"></div>
          <div className="absolute top-44 right-12 bg-[#2EA1E1] rounded-full w-28 h-12"></div>
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 stroke-[#14304A] stroke-2 stroke-dashed"
            fill="none"
            viewBox="0 0 192 48"
          >
            <path d="M0 40C32 56 64 56 96 40C128 24 160 24 192 40" />
          </svg>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col space-y-10 max-w-xl">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14304A] text-[#2EA1E1] font-bold text-sm select-none">
                {i + 1}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                <p className="text-[#9CA3AF] text-sm sm:text-base max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
