import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#0f172a] p-8 rounded-lg w-full max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-red-500 text-2xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
