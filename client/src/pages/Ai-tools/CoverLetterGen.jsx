/// ✅ Fully Revamped CoverLetterGenerator.jsx with enhanced AI, customizable layout, and improved UX

import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaCopy, FaDownload, FaMagic, FaCamera, FaPalette } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

const colorThemes = {
  indigo: '#6366f1',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  slate: '#64748b'
};

const fontFamilies = {
  serif: 'Georgia, serif',
  sans: 'Arial, sans-serif',
  mono: 'Courier New, monospace',
  poppins: 'Poppins, sans-serif',
  roboto: 'Roboto, sans-serif'
};

const CoverLetterGenerator = () => {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loadingField, setLoadingField] = useState('');
  const [selectedColor, setSelectedColor] = useState('indigo');
  const [showTheme, setShowTheme] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');
  const [aiSuggestions, setAiSuggestions] = useState({ skills: [], experience: [] });

  const previewRef = useRef(null);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    const letter = `Dear Hiring Manager at ${company || '[Company Name]'},\n\nMy name is ${name || '[Your Name]'}, and I am writing to express my interest in the ${jobTitle || '[Job Title]'} position. With a strong background in ${skills || '[skills/strengths]'}, I am confident in my ability to contribute to your team.\n\n${experience || '[Your experience summary]'}\n\nThank you for considering my application. I look forward to the opportunity to work at ${company || '[Company Name]'}.\n\nSincerely,\n${name || '[Your Name]'}`;
    setCoverLetter(letter);
  }, [name, jobTitle, company, skills, experience]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateAIField = async (field) => {
    setLoadingField(field);
    const prompt = field === 'skills'
  ? 'Write a short paragraph highlighting skills and strengths for a professional cover letter.'
  : 'Write a short professional experience summary paragraph for a cover letter.';

    try {
      const res = await axios.post('/api/coverletter/generate', { prompt });
      
      // Assuming the model returns multiple paragraphs separated by newlines or special characters
      let options = res.data.response.split(/\n\s*\n|\*\s+/).map(item => item.trim()).filter(Boolean);
      options = options.slice(0, 4); // Limit to max 4
  
      setAiSuggestions(prev => ({ ...prev, [field]: options }));
    } catch (err) {
      toast.error('AI generation failed. Please check your server/API.');
    }
  
    setLoadingField('');
  };
  
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success('Copied to clipboard!');
  };

  const downloadLetter = () => {
    const element = previewRef.current;
  
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
      filename:     'cover_letter.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).save();
  };

  const validateFields = () => {
    if (!name || !jobTitle || !company || !skills || !experience) {
      toast.error('Please fill in all fields to finalize the letter.');
    } else {
      toast.success('Cover letter finalized successfully!');
    }
  };

  const resetForm = () => {
    setName('');
    setJobTitle('');
    setCompany('');
    setSkills('');
    setExperience('');
    setPhoto(null);
    setPhotoPreview(null);
    setAiSuggestions({ skills: [], experience: [] }); // clear AI suggestions too
    toast.success('Form has been reset. Ready for a new letter!');
  };
  

  return (
  <div className="min-h-screen bg-[#0c142f] text-white pt-6 pr-0 pb-6 pl-0 md:pl-0 md:pr-10 md:pb-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
          Cover Letter Generator
        </h1>
        <p className="mt-2 text-gray-300">Modern AI-powered cover letter builder</p>
        <button
          onClick={() => setShowTheme(!showTheme)}
          className="mt-4 px-4 py-2 rounded-lg bg-[#1e1e2f] hover:bg-[#2d2d40] border border-slate-500 inline-flex items-center"
        >
          <FaPalette className="mr-2" /> Customize Theme
        </button>
      </motion.div>

      {showTheme && (
        <div className="mb-6 text-center">
          <div className="mb-4">
            <span className="text-gray-300 mr-3">Theme Color:</span>
            {Object.entries(colorThemes).map(([key, color]) => (
              <button
                key={key}
                onClick={() => setSelectedColor(key)}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-full mx-1 border-4 ${selectedColor === key ? 'border-white' : 'border-transparent'}`}
              ></button>
            ))}
          </div>
          <div>
            <span className="text-gray-300 mr-3">Font Style:</span>
            <select
              className="p-2 rounded bg-[#1e1e2f] border border-slate-500 text-white"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              {Object.entries(fontFamilies).map(([key, value]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-[#1e1e2f] rounded-xl p-6 space-y-5">
          <div className="flex gap-4">
            <div className="relative w-24 h-24">
              <label className="absolute w-full h-full flex items-center justify-center bg-[#2b2b40] border-2 border-dashed border-gray-500 rounded-full cursor-pointer hover:bg-[#3c3c52]">
                {photoPreview ? (
                  <img src={photoPreview} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <FaCamera className="text-gray-400 text-2xl" />
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl bg-[#2b2b40] text-white border border-blue-500" />
              <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#2b2b40] text-white border border-blue-500" />
              <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 rounded-xl bg-[#2b2b40] text-white border border-blue-500" />
            </div>
          </div>

          <div>
          <textarea
  rows="3"
  placeholder="Skills/Strengths"
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
  className="w-full p-3 rounded-xl bg-[#2b2b40] text-white border border-blue-500"
/>
<button
  onClick={() => generateAIField('skills')}
  disabled={loadingField === 'skills'}
  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl inline-flex items-center"
>
  <FaMagic className="mr-2" /> {loadingField === 'skills' ? 'Generating...' : 'Generate with AI'}
</button>

{aiSuggestions.skills.length > 0 && (
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-300">Choose a suggestion:</p>
    {aiSuggestions.skills.map((text, index) => (
      <button
        key={index}
        onClick={() => {
          setSkills(text);
          toast.success('Skill summary selected!');
        }}
        className="block w-full text-left p-3 bg-[#2f2f40] rounded-md border border-blue-600 hover:bg-[#3f3f50] transition"
      >
        {text}
      </button>
    ))}
  </div>
)}
</div>

<div>
  <textarea
    rows="3"
    placeholder="Experience Summary"
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
    className="w-full p-3 rounded-xl bg-[#2b2b40] text-white border border-blue-500"
  />
  <button
    onClick={() => generateAIField('experience')}
    disabled={loadingField === 'experience'}
    className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl inline-flex items-center"
  >
    <FaMagic className="mr-2" /> {loadingField === 'experience' ? 'Generating...' : 'Generate with AI'}
  </button>

  {aiSuggestions.experience.length > 0 && (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-gray-300">Choose a suggestion:</p>
      {aiSuggestions.experience.map((text, index) => (
        <button
          key={index}
          onClick={() => {
            setExperience(text);
            toast.success('Experience summary selected!');
          }}
          className="block w-full text-left p-3 bg-[#2f2f40] rounded-md border border-blue-600 hover:bg-[#3f3f50] transition"
        >
          {text}
        </button>
      ))}
    </div>
  )}
</div>  {/* ✅ THIS LINE WAS MISSING */}


          <div className="text-center">
            <button onClick={validateFields} className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-6 py-3 rounded-xl font-semibold inline-flex items-center hover:scale-105 transition">
              <FaRobot className="mr-2" /> Generate Cover Letter
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="rounded-xl overflow-hidden shadow-2xl">
          <div
            ref={previewRef}
            className="bg-white text-black p-4  relative min-h-[600px]"
            style={{ display: 'flex', fontFamily: fontFamilies[fontFamily] }}
          >
            {/* photo alignment */}
            <div className="min-w-[28%] rounded-tr-[10%] rounded-br-[50%]" style={{ backgroundColor: colorThemes[selectedColor] }}>
              {photo && (
                <div className="p-4  flex justify-center items-start">
                  <img src={photo} alt="User Photo" className="w-32 h-32 rounded-full border border-white object-cover" />
                </div>
              )}
            </div>
            <div className="flex-1 pl-6">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg">Cover Letter</h2>
                <span className="text-sm text-gray-600">{today}</span>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: fontFamilies[fontFamily] }}>{coverLetter}</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 p-4 bg-[#e6e6e6]">
            <button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-xl inline-flex items-center">
              <FaCopy className="mr-2" /> Copy
            </button>
            <button onClick={downloadLetter} className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl inline-flex items-center">
              <FaDownload className="mr-2" /> Download
            </button>
            <button onClick={resetForm} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white rounded-xl inline-flex items-center">
              <FaRobot className="mr-2" /> Reset
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
