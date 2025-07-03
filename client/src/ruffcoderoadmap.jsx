// client/src/pages/Ai-tools/RoadmapGenerator.jsx
import React, { useState, useRef } from 'react';
import { FaRobot, FaDownload, FaSave, FaSearch, FaGraduationCap, FaTools, FaRocket } from 'react-icons/fa';
import toast from 'react-hot-toast';
import downloadRoadmapPDF from '../../components/RoadmapPDFExport';
import RoadmapFlow from '../../components/RoadmapFlow'; // Corrected import
import RoadmapLoading from '../../components/RoadmapLoading'; // New animated component

const colorMap = {
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' },
  green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
};

const suggestedSkills = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Vue"],
  "Data Scientist": ["Python", "pandas", "NumPy", "scikit-learn", "SQL"],
  "Cybersecurity Analyst": ["Networking", "Linux", "Python", "Wireshark", "Metasploit"],
};

const CareerRoadmapGenerator = () => {
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [generated, setGenerated] = useState(false);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const roadmapRef = useRef(null);
  

  const getFinalGoal = () => (goal === 'Other' ? customGoal : goal);

  const handleGenerate = async () => {
    if (!getFinalGoal() || !education || !skills.trim()) {
      toast.error('Please fill in all fields before generating roadmap.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/roadmaps/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goal: getFinalGoal(), education, skills }),
      });

      const data = await res.json();
      const roadmapText = data.roadmapText || data.roadmap?.roadmapText || '';

      const parsedSteps = roadmapText
        .split(/\n+/)
        .filter(line => line.trim() !== '' && line.includes(':'))
        .map((line, index) => {
          const cleanedLine = line.trim().replace(/^\d+\.\s*/, '');
          const [title, ...rest] = cleanedLine.split(':');
          return {
            title: title?.trim() || `Step ${index + 1}`,
            detail: rest.length ? rest.join(':').trim() : 'No detail provided.',
          };
        });

      setSteps(parsedSteps);
      setGenerated(true);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Error generating roadmap from AI.');
    } finally {
      setLoading(false);
    }
  };

  const resetRoadmap = () => {
    setGoal('');
    setCustomGoal('');
    setEducation('');
    setSkills('');
    setGenerated(false);
    setSteps([]);
  };

  // const handleSaveToDB = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) return toast.error('Please login to save.');
  
  //   try {
  //     const res = await fetch('http://localhost:5000/api/roadmaps/save', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`, // ✅ fixed this line
  //       },
  //       body: JSON.stringify({ goal: getFinalGoal(), education, skills, steps }),
  //     });
  
  //     const data = await res.json();
  //     if (!res.ok) return toast.error(data.error || 'Failed to save.');
  //     toast.success('Roadmap saved successfully!');
  //   } catch (err) {
  //     console.error('Save error:', err);
  //     toast.error('Server error while saving.');
  //   }
  // };
  
  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#0c142f] text-white font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">Career Roadmap Generator</h1>
          <p className="mt-3 text-gray-300">Create a personalized career roadmap powered by AI.</p>
        </div>

        <div className="bg-[#1e1e2f] rounded-2xl shadow-xl p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Career Goal</label>
              <select className="w-full bg-[#2b2b40] text-white border border-blue-500 rounded-xl p-3" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select a goal</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Other">Other</option>
              </select>
              {goal === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter custom goal"
                  className="mt-2 w-full bg-[#2b2b40] text-white border border-blue-500 rounded-xl p-3"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                />
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Current Education</label>
              <select className="w-full bg-[#2b2b40] text-white border border-blue-500 rounded-xl p-3" value={education} onChange={(e) => setEducation(e.target.value)}>
                <option value="">Select education</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor’s">Bachelor’s</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Skills</label>
              {goal && goal !== 'Other' ? (
                <select
                  className="w-full bg-[#2b2b40] text-white border border-blue-500 rounded-xl p-3"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                >
                  <option value="">Select a skill</option>
                  {suggestedSkills[goal]?.map((skill, idx) => (
                    <option key={idx} value={skill}>{skill}</option>
                  ))}
                  <option value="I don't know">I don't know</option>
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full bg-[#2b2b40] text-white border border-blue-500 rounded-xl p-3"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., HTML, Python"
                />
              )}
              {skills === "I don't know" && (
                <p className="text-yellow-400 text-sm mt-2">Our AI will suggest the right skills for this goal.</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`${loading ? 'opacity-60 cursor-not-allowed' : ''} bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-3 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition inline-flex items-center`}
            >
              <FaRobot className="mr-2" />
              {loading ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>

          {loading && (
            <div className="text-center mt-6">
              <RoadmapLoading />
            </div>
          )}
        </div>

        {generated && (
          <div className="space-y-10" ref={roadmapRef} id="roadmap-content">
            <div className="text-center">
              <h2 className="text-3xl font-bold">AI-Powered Roadmap</h2>
              <p className="text-gray-400">Goal: <span className="text-blue-400">{getFinalGoal()}</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <RoadmapCard
                  key={idx}
                  stepNumber={idx + 1}
                  color={Object.keys(colorMap)[idx % 4]}
                  icon={[<FaSearch />, <FaGraduationCap />, <FaTools />, <FaRocket />][idx % 4]}
                  title={step.title}
                  text={step.detail}
                />
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">What you can do</h2>
              <RoadmapFlow steps={steps} />
            </div>
          </div>
        )}

        {generated && (
          <div className="flex justify-center gap-4 mt-4 print:hidden">
            {/* <button onClick={handleSaveToDB} className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-600 inline-flex items-center">
              <FaSave className="mr-2" /> Save Roadmap
            </button> */}
            <button
  onClick={() => downloadRoadmapPDF(roadmapRef, `${getFinalGoal()}_Roadmap.pdf`)}
  className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-600 inline-flex items-center"
>
  <FaDownload className="mr-2" /> Download PDF
</button>

            <button onClick={resetRoadmap} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Generate New Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RoadmapCard = ({ color, icon, title, text, stepNumber }) => {
  const { border, text: textColor } = colorMap[color] || {};
  return (
    <div className={`flex-1 bg-[#1e1e2f] ${border} border-l-4 rounded-xl shadow-md p-6 transition hover:shadow-xl`}>
      <div className={`flex items-center space-x-3 mb-3 text-xl ${textColor}`}>
        {icon}
        <h3 className="font-bold">{stepNumber}. {title}</h3>
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
};

export default CareerRoadmapGenerator;
