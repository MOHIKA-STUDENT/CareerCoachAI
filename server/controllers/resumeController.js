// Resume Analysis Controller (Final Version - Enhanced for Accuracy & Clarity)

const fs = require('fs');
const pdfParse = require('pdf-parse');
const { queryOllama } = require('../services/ollamaService');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const FeatureHistory = require('../models/FeatureHistory');

function getScoreLabel(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  return 'Needs Improvement';
}

function cleanAndParseJSON(raw) {
  try {
    let cleaned = raw.trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1) throw new Error('No opening brace found in response.');
    cleaned = cleaned.slice(start, end === -1 ? undefined : end + 1);
    cleaned = cleaned.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    cleaned = cleaned.replace(/[\u0000-\u001F]+/g, '');
    if (!cleaned.trim().endsWith('}')) cleaned += '}';
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('🛑 JSON Parsing Error:', err.message);
    throw new Error('AI response was invalid or malformed');
  }
}

exports.analyzeResumeWithAI = async (req, res) => {
  const userId = req.user?.id;
  const description = req.body.description || '';
  const filePath = req.file?.path;

  if (!userId) return res.status(401).json({ error: 'Not authenticated' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(dataBuffer);
    let resumeText = parsed.text || '';
    if (resumeText.length > 10000) resumeText = resumeText.slice(0, 10000) + '...';

    const prompt = `
You are a professional AI Resume Coach and ATS Optimizer.

Analyze the RESUME and (if provided) the JOB DESCRIPTION. Your job is to:
- Summarize the candidate’s strengths.
- Evaluate individual skills with scores and feedback.
- Provide tailored improvement tips based on job alignment.

Return ONLY valid JSON in this format:
{
  "score": 0-100,
  "label": "Excellent | Good | Needs Improvement",
  "summary": "Professional 2-3 line summary of the candidate",
  "skills": {
    "Skill Name": {
      "score": 0-100,
      "comment": "Brief justification and tip"
    },
    ...
  },
  "tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3",
    "Tip 4",
    "Tip 5"
  ]
}

Guidelines:
- Do NOT include markdown, comments, or non-JSON text.
- Use clear, simple language.
- Match resume to job description if given.

${description ? `JOB DESCRIPTION:\n${description}` : 'No job description provided.'}

RESUME TEXT:
${resumeText}
    `.trim();

    const aiRaw = await queryOllama(prompt);
    const result = cleanAndParseJSON(aiRaw);

    const score = Math.min(100, Math.max(0, parseInt(result.score || 0)));
    const label = getScoreLabel(score);
    const summary = result.summary || 'Summary not provided.';
    const skills = result.skills || {};
    const tips = Array.isArray(result.tips) ? result.tips.join('\n- ') : result.tips || 'No tips provided.';
    const atsInfo = `\n\nATS Analysis: Your resume scored ${score}/100 (${label}).`;

    const saved = await ResumeAnalysis.create({
      userId,
      fileName: req.file.originalname,
      score,
      summary,
      skills,
      tips: tips + atsInfo,
      label,
    });

    await FeatureHistory.create({
      userId,
      featureName: 'Resume Analyzer',
      result: {
        fileName: req.file.originalname,
        score,
        label,
        summary,
        skills,
        tips
      }
    });

    fs.unlink(filePath, (err) => {
      if (err) console.error('❌ File deletion error:', err.message);
    });

    res.json({
      score: saved.score,
      label: saved.label,
      summary: saved.summary,
      skills: saved.skills,
      tips: saved.tips,
    });
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error('❌ Resume analysis error:', err.message);
    res.status(500).json({ error: err.message || 'Resume analysis failed' });
  }
};
