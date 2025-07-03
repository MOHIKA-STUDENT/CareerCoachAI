import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Landing from './Landing';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import AiQaChat from './pages/Ai-tools/AiQaChat';
import ResumeAnalyzer from './pages/Ai-tools/ResumeAnalyzer';
import RoadmapGenerator from './pages/Ai-tools/RoadmapGenerator';
import CoverLetterGen from './pages/Ai-tools/CoverLetterGen';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // ✅ Make sure path is correct
import ChatHistoryView from './pages/ChatHistoryView';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Layout>
                <Billing />
              </Layout>
            </ProtectedRoute>
          }
        />

<Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />

<Route
  path="/chat-history"
  element={
    <ProtectedRoute>
      <Layout>
        <ChatHistoryView />
      </Layout>
    </ProtectedRoute>
  }
/>


        <Route
          path="/qa-chat"
          element={
            <ProtectedRoute>
              <Layout>
                <AiQaChat />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-analyzer"
          element={
            <ProtectedRoute>
              <Layout>
                <ResumeAnalyzer />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-roadmap"
          element={
            <ProtectedRoute>
              <Layout>
                <RoadmapGenerator />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cover-letter"
          element={
            <ProtectedRoute>
              <Layout>
                <CoverLetterGen />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  );
}
