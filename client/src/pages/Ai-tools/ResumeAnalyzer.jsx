import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaPaperPlane, FaRobot, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import RoboGame from './RoboGame';

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(null);
  const [label, setLabel] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const [loadingScore, setLoadingScore] = useState(false);
  const pdfRef = useRef();

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be under 5MB.');
      return;
    }

    setResumeFile(file);
    toast.success('File uploaded successfully!');
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast.error('Please upload your resume before analyzing.');
      return;
    }

    try {
      toast.loading('Resume is being scanned by the robot...');
      setLoadingScore(true);

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('description', description);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User not authenticated. Please log in again.');
        return;
      }

      const res = await fetch('http://localhost:5000/api/resume/analyze-ai', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
        return;
      }

      setScore(data.score);
      setLabel(data.label);
      setAnalysis({
        summary: data.summary,
        skills: data.skills,
        tips: data.tips,
      });

      toast.success('Resume analysis complete ✅');
    } catch (error) {
      toast.dismiss();
      toast.error('Server error. Try again later.');
    } finally {
      setLoadingScore(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setDescription('');
    setScore(null);
    setLabel('');
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadPDF = () => {
    const opt = {
      margin: 0.5,
      filename: 'Resume_Analysis_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(pdfRef.current).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1528] to-[#121f34] text-white flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Resume Analyzer
      </h1>
      <p className="text-sm text-gray-400">
        Upload your resume and receive detailed AI-powered feedback to improve it.
      </p>

      <div className="w-full max-w-3xl bg-[#132034] rounded-xl shadow-xl p-6 space-y-4">
        <div
          className="border-2 border-dashed border-transparent bg-clip-padding bg-gradient-to-r from-purple-500 to-blue-500 p-[2px] rounded-xl"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="bg-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
            <FaCloudUploadAlt className="text-4xl text-blue-400 mb-2 animate-bounce" />
            <p className="mb-2">Click to upload your resume</p>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept=".pdf" />
            {resumeFile && <p className="mt-2 text-sm text-green-400">{resumeFile.name}</p>}
          </div>
        </div>

        <textarea
          className="w-full bg-[#0f172a] border border-gray-600 rounded-md p-3 text-sm text-white"
          rows="4"
          placeholder="Optional: Paste job description here for a tailored analysis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={loadingScore}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loadingScore ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FaPaperPlane />}
            {loadingScore ? 'Analyzing...' : 'Analyze Resume'}
          </motion.button>

          {(resumeFile || score !== null || analysis) && (
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {loadingScore && (
        <div className="mt-6 text-center animate-pulse">
          <FaRobot className="text-5xl text-purple-400 animate-bounce mx-auto" />
          <div className="mt-4 text-gray-500 text-sm">Game loading... Play while I analyse your resume!</div>
          <RoboGame />
        </div>
      )}

      {score !== null && analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl flex flex-col gap-6 mt-6"
        >
          <div className="flex justify-end">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mb-2 rounded-lg flex items-center gap-2"
            >
              <FaDownload /> Download PDF
            </button>
          </div>

          {/* Analysis section wrapped for PDF */}
          <div ref={pdfRef} className="space-y-6">
            <div className="bg-[#162235] rounded-xl p-6 shadow-xl text-center border border-purple-500">
              <h2 className="text-2xl font-semibold text-purple-300">Overall Resume Score</h2>
              <div className={`mt-4 text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">{label}</p>
            </div>

            {analysis.summary && (
              <div className="bg-[#162235] rounded-xl p-6 shadow-xl border border-blue-500">
                <h2 className="text-xl font-semibold mb-2 text-blue-300">AI Summary</h2>
                <p className="text-lg text-gray-300">{analysis.summary}</p>
              </div>
            )}

            {analysis.skills && (
              <div className="bg-[#162235] rounded-xl p-6 shadow-xl border border-blue-500">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Skill Evaluation</h2>
                <ul className="space-y-4 text-lg">
                  {Object.entries(analysis.skills).map(([skill, detail]) => (
                    <li key={skill}>
                      <div className="flex justify-between mb-1">
                        <span>{skill}</span>
                        <span className="text-green-400">{detail.score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
                          style={{ width: `${detail.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">💬 {detail.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.tips && (
              <div className="bg-[#162235] rounded-xl p-6 shadow-xl border border-purple-400">
                <h2 className="text-xl font-semibold mb-2 text-purple-300">Improvement Tips</h2>
                <ul className="list-disc list-inside text-lg text-gray-300">
                  {analysis.tips.split('\n- ').map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
