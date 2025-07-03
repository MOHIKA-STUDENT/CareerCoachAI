import React from 'react';
import { FaCommentAlt, FaFileAlt, FaMap, FaPenNib } from 'react-icons/fa';
import ToolCard from './ToolCard';

const ToolsSection = ({ toolsRef }) => (
  <section ref={toolsRef} className="mb-10 px-4">
    <h2 className="text-2xl font-extrabold text-[#e2e8f0] mb-6">Available AI Tools</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">

      <ToolCard
        icon={<FaCommentAlt />}
        title="AI Career Q&A Chat"
        description="Get instant answers to your career questions with our intelligent AI assistant"
        color="#4f8aff"
        route="/qa-chat"
      />
      <ToolCard
        icon={<FaFileAlt />}
        title="AI Resume Analyzer"
        description="Upload your resume and get detailed feedback to improve your chances"
        color="#2ecc40"
        route="/resume-analyzer"
      />
      <ToolCard
        icon={<FaMap />}
        title="Career Roadmap Generator"
        description="Create a personalized career path based on your goals and skills"
        color="#a55af7"
        route="/career-roadmap"
      />
      <ToolCard
        icon={<FaPenNib />}
        title="Cover Letter Generator"
        description="Generate compelling cover letters tailored to specific job applications"
        color="#ff6600"
        route="/cover-letter"
      />
    </div>
  </section>
);

export default ToolsSection;
