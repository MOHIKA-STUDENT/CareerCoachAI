import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginForm({ onClose, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success(`Login Successful! 🎉 Welcome back, ${res.data.user.firstName}!`);

      // Small delay to let user see the toast
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-[#1f2937] rounded-xl max-w-sm w-full p-6 relative text-white">
     
      <h2 className="text-xl font-semibold mb-6">Log In</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-[#111827] rounded-md py-3 px-4 mb-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
            className="w-full bg-[#111827] rounded-md py-3 px-4 pr-12 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
         <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  onMouseDown={e => e.preventDefault()}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white z-10 transition-colors p-1"
  // aria-label="Toggle password visibility"
>
  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
</button>

        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-gray-300 select-none">
            <input type="checkbox" className="h-4 w-4 text-blue-400 border-gray-600 bg-[#111827] rounded" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-blue-400 text-sm hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3bb7f7] hover:bg-[#33a6f0] text-black font-medium py-3 rounded-md transition-colors"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Don't have an account?
        <button onClick={switchToSignup} className="text-blue-400 hover:underline ml-1">Sign up</button>
      </p>
    </div>
  );
}