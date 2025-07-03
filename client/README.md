# 💼 AI Career Coach Agent

An interactive, AI-powered full-stack platform built to guide users in their career journey with personalized roadmaps, resume analysis, Q&A chat, and gamified UX during AI processing.

---

## 🌟 Features

### 🧠 1. Career Q&A AI Chat
- Ask any career-related questions to the AI.
- Chat remembers conversation history (context-aware).
- Upload a resume and the chat will analyze and refer to your resume context.
- “New Chat” button resets the conversation.
- Powered by **Ollama’s Llama 3 model running locally**.
- ✅ **Gamified Loading**: Mind games (typing, memory) appear while AI is generating output to keep users engaged.

### 📈 2. Roadmap Generator
- Generate a career roadmap based on:
  - Career goal
  - Education level
  - Current skills
- AI suggests relevant skills if none are provided.
- Each skill is linked to **YouTube tutorials** for learning.
- Roadmap can be **reset** or **downloaded as PDF** using `html2pdf.js`.

### 📄 3. Resume Upload & Analysis
- Upload a **PDF resume** and let the AI analyze:
  - Strengths
  - Skills
  - Improvements
- Resume context is retained in chat.
- Resume analysis can be **downloaded as PDF**.
- Supports **reset** to start fresh with another resume.

### 🗂️ 4. Feature Usage History
- Logged-in users can:
  - View their **Roadmap**, **Resume Analysis**, and **Chat History**
  - **Clear history**, which permanently deletes it from MongoDB
- ✅ Each user sees **only their own history** (secured by JWT auth)

### 🕹️ 5. Mind Games During AI Output
- Games like:
  - Typing speed
  - Number memory
  - Word match
- Appear while waiting for chat/roadmap/resume output to prevent boredom.

### 🔐 6. Authentication & Authorization
- Sign up & log in securely with **JWT-based authentication**
- All sensitive routes are protected
- Only authenticated users can upload resumes, view history, and generate roadmaps

### 📱 7. Responsive UI/UX
- Fully **mobile-responsive UI** using **Tailwind CSS**
- Interactive, modern design
- Smooth transitions, modals, alerts, and feedback messages
- Logout button with clear state reset

---

## 🛠 Tech Stack

### 💻 Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **html2pdf.js** – for converting Roadmap, Resume, Cover Letter to downloadable PDF
- **React Router DOM** – page navigation

### 🌐 Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Multer** – for file upload (PDF resumes)

### 🧠 AI Integration
- **Ollama** with **Llama 3 model** running locally
- Dynamic prompts for roadmap, Q&A, and resume feedback
- Chat memory enabled for better continuity


