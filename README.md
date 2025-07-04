# 💼 AI Career Coach Agent

An interactive, AI-powered full-stack platform built to guide users in their career journey with personalized roadmaps, resume analysis, cover letter generation, smart Q&A chat, and mind games to keep users engaged during AI processing time.

---

## 🌟 Features

### 💬 1. Career Q&A Chat (AI-Powered)
- Ask career-related questions (e.g., job switch, skill learning, resume tips).
- Chat remembers context for each user.
- Upload a resume — AI will analyze and **refer to its content in answers**.
- “New Chat” button resets the conversation.
- ✅ **Mind games** are shown during AI loading (typing games, memory, number challenges).
- Powered by **Llama 3 model (via Ollama running locally)**.

---

### 📈 2. Career Roadmap Generator
- Generates a personalized roadmap based on:
  - Your goal
  - Education level
  - Current skills
- If skills are unknown, AI **recommends skill paths**.
- Includes clickable **YouTube learning links**.
- **Reset** the roadmap any time.
- **Download** roadmap as a professional PDF (using `html2pdf.js`).

---

### 📄 3. Resume Upload & Analysis
- Upload your **PDF resume** and the AI will:
  - Extract skills and experience
  - Offer detailed improvement suggestions
  - Provide resume feedback in the chat
- Resume context stays in memory for better answers.
- **Download analysis as PDF**.
- **Reset/resubmit** functionality supported.

---

### ✍️ 4. Cover Letter Generator
- Auto-generates a personalized, job-specific cover letter based on resume data.
- Download as a clean, formatted **PDF**.
- **Reset** anytime to generate a new letter.

---

### 🧠 5. Gamified Loading Experience
- While AI is generating output (for chat/roadmap/resume):
  - Display mini-games to avoid boredom
  - Games include typing tests, memory match, number recall
- Keeps users engaged and interactive!

---

### 🗂️ 6. Feature Usage History
- Every user can:
  - View previous **chat sessions**, **roadmaps**, and **resume analyses**
  - **Clear history**, which deletes records from **MongoDB**
- ✅ **Only the logged-in user can see their history**
- Includes timestamped tracking and persistent sessions

---

### 🔐 7. Authentication & Security
- JWT-based login & signup system
- Passwords securely hashed
- Backend routes protected by middleware
- Each user's data is **completely isolated**

---

### 🧾 8. PDF Generation
- Resume feedback, roadmap, and cover letter can be downloaded as **PDF**.
- Built using `html2pdf.js`.

---

### 📱 9. Modern Responsive UI/UX
- Built with **Tailwind CSS**
- Fully responsive across desktop, tablet, mobile
- Animated transitions using Framer Motion
- Alerts, toasts, modals & buttons for better experience
- Clean logout with full reset

---

## 🛠️ Tech Stack

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Auth**
- **Multer** for resume upload
- **Ollama (Llama 3)** – Local AI model for all prompts

### 💻 Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**
- **html2pdf.js** – PDF download
- **Framer Motion** – animations


---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/MOHIKA-STUDENT/CareerCoachAI.git
cd CareerCoachAI

```

### 2. Start the Backend

```bash
cd server
npm install
node index.js
```

### 3. Start the Frontend

```bash
cd ../client
npm install
npm start
```

 ✅ Make sure you have **Ollama with Llama 3** running locally before using the AI chat, roadmap, or resume features.

---

## 🙋‍♀️ About the Developer

Made with ❤️ by [Mohika Ravindra Sondkar](https://www.linkedin.com/in/mohika-sondkar-b5b03b258)

📹 **Watch the Project Demo**: [Click here to view the video](https://drive.google.com/file/d/16NsK7TaeE4reqfUa_c6FDi3MagDK0hvg/view?usp=drive_link)

Feel free to connect with me on LinkedIn and check out more of my work!


