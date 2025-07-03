const { queryOllama } = require('../services/ollamaService');
const Roadmap = require('../models/Roadmap');
const FeatureHistory = require('../models/FeatureHistory');

const generateRoadmap = async (req, res) => {
  const { goal, education, skills } = req.body;
  const userId = req.user?.id || req.body.userId || 'guest';

  try {
    let finalSkills = skills;

    // AI Suggests Skills if user says "I don't know"
    if (skills.toLowerCase() === "i don't know") {
      const skillPrompt = `List beginner-friendly technical and soft skills needed to become a ${goal} for someone with ${education} education. Return as a comma-separated list.`;
      const skillResponse = await queryOllama(skillPrompt);
      finalSkills = skillResponse.replace(/\n/g, ', ').trim();
      
    }

    // Add extra skills if only soft skill is present
    const softSkills = ['communication', 'teamwork', 'leadership'];
    if (softSkills.includes(finalSkills.toLowerCase())) {
      const extraPrompt = `The user wants to become a ${goal} and has ${finalSkills} skills. Suggest 5 technical or domain-specific skills that would complement ${finalSkills} for this career. Return as comma-separated list.`;
      const extraSkillResponse = await queryOllama(extraPrompt);
      finalSkills += ', ' + extraSkillResponse.replace(/\n/g, ', ').trim();
      
    }

    // Prompt for Roadmap
    const roadmapPrompt = `You are a career expert. Create a clearly numbered, structured career roadmap to become a ${goal} for someone with ${education} education and skills in ${finalSkills}.

    Rules:
    - Each step must be on **one line**.
    - Each line must follow this format: "1. Step Title: Description"
    - Do not use "Step 1", "Step 2", etc. in titles.
    - No line breaks inside steps.
    - Do not add any extra content like "AI-Powered Roadmap", headers, or links.
    - No bullet points, no bold text.
    - No summary or intro.
    
    Example:
    1. Learn Basics: Study fundamental programming concepts using Python or JavaScript.
    2. Build Projects: Create small real-world projects to solidify your understanding.
    
    Start now:`;
    

    // Prompt for Flow
    const flowPrompt = `You are an expert career coach. Create a detailed, progressive learning roadmap to become a ${goal}.

Rules:
- Include AT LEAST 5 steps.
- Do NOT repeat step titles.
- Follow the exact format below for EACH step.
- Add meaningful dependencies.
- Avoid "Step 1", "Step 2" etc. in titles.
- Use \`None\` only for the first step.

Format for EACH step:

Step Title: Learn HTML, CSS, and JavaScript  
Description: Understand the building blocks of web development by learning HTML for structure, CSS for styling, and JavaScript for interactivity. These are essential for any frontend developer.  
Estimated Duration: 2 weeks  
Dependency: None  

(Repeat this format for all steps. Each block should be separated by two line breaks.)
`;


    

    const roadmapText = await queryOllama(roadmapPrompt);
    const flowStepsText = await queryOllama(flowPrompt);

    // Filter for numbered steps (clean text)
    const cleanedRoadmapText = roadmapText
    .split('\n')
    .filter(line => /^\d+\.\s+[^:]+:\s+.+$/.test(line.trim()))
    .join('\n');
  
    // Save to DB
    await Roadmap.create({
      userId,
      goal,
      education,
      skills: finalSkills,
      roadmapText: cleanedRoadmapText,
    });

    await FeatureHistory.create({
      userId,
      featureName: 'Roadmap Generator',
      result: {
        goal,
        education,
        skills: finalSkills,
        roadmapText: cleanedRoadmapText,
        flowStepsText
      }
    });

    // Return both texts to frontend
    res.status(201).json({ roadmapText: cleanedRoadmapText, flowStepsText });
  } catch (err) {
    console.error('❌ Error generating roadmap:', err);
    res.status(500).json({ error: 'Roadmap generation failed' });
  }
};

module.exports = { generateRoadmap };
