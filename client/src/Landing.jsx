import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

export default function Landing() {
  const [modalType, setModalType] = useState(null); 
  return (
    <div className="bg-primary text-body">
      <Navbar onSignupClick={() => setModalType("signup")} onLoginClick={() => setModalType("login")} />
      <Hero onSignupClick={() => setModalType("signup")}/>
      <Features />
      <HowItWorks />
      <CTA onSignupClick={() => setModalType("signup")} />
      <Footer />

      
      <Modal open={modalType !== null} onClose={() => setModalType(null)}>
  {modalType === "signup" ? (
    <SignupForm
      switchToLogin={() => setModalType("login")}
      onClose={() => setModalType(null)} // ✅ ADD THIS
    />
  ) : (
    <LoginForm
      switchToSignup={() => setModalType("signup")}
      onClose={() => setModalType(null)} // ✅ ADD THIS
    />
  )}
</Modal>
    </div>
  );
}
