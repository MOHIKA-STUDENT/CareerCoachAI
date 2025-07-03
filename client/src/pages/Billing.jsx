import React from 'react'
import { motion } from 'framer-motion';

export default function Billing() {
    
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5e1] p-6">
      <h1 className="text-3xl font-extrabold text-white mb-4">Billing Overview</h1>
      
      <div className="bg-[#0c142f] p-6 rounded-lg shadow-lg space-y-4 max-w-xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold text-[#7c8af7]">Subscription Plan</h2>
          <p className="text-[#94a3b8] mt-1">Pro Plan - ₹499/month</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#7c8af7]">Next Payment</h2>
          <p className="text-[#94a3b8] mt-1">July 19, 2025</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#7c8af7]">Payment Method</h2>
          <p className="text-[#94a3b8] mt-1">Visa ending in 1234</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-[#4f8aff] to-[#a55af7] text-white font-semibold rounded-md"
        >
          Manage Subscription
        </motion.button>
      </div>
    </div>
  );
}
