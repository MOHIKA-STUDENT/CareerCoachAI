const fs = require('fs');
const path = require('path');

exports.getContextFromFiles = () => {
  const roadmapPath = path.join(__dirname, '../data/roadmap.txt');
  const resumePath = path.join(__dirname, '../data/resume_tips.txt');

  const roadmap = fs.existsSync(roadmapPath) ? fs.readFileSync(roadmapPath, 'utf-8') : '';
  const resumeTips = fs.existsSync(resumePath) ? fs.readFileSync(resumePath, 'utf-8') : '';

  return `${roadmap}\n\n${resumeTips}`;
};
