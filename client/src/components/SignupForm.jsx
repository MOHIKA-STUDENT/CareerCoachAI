import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SignupForm({ onClose, switchToLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const { firstName, lastName, email, password, confirmPassword, agree } = formData;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return 'All fields are required';
    }
    
    if (!/^[A-Za-z]{2,}$/.test(firstName)) {
      return 'First name must be at least 2 letters';
    }
    
    if (!/^[A-Za-z]{2,}$/.test(lastName)) {
      return 'Last name must be at least 2 letters';
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
    
    if (password.length < 2) {
      return 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!agree) {
      return 'You must agree to the terms and conditions';
    }
    
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const error = validate();
    
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success(`Account Created Successfully! 🎉 Welcome aboard, ${res.data.user.firstName}!`);

      // Small delay to let user see the toast
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to create account. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl max-w-md w-full p-6 text-white relative">
      
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-[#15233c] rounded-md py-3 px-4 text-gray-300 focus:ring-2 focus:ring-sky-400"
              placeholder="John"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-[#15233c] rounded-md py-3 px-4 text-gray-300 focus:ring-2 focus:ring-sky-400"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#15233c] rounded-md py-3 px-4 text-gray-300 focus:ring-2 focus:ring-sky-400"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#15233c] rounded-md py-3 px-4 pr-12 text-gray-300 focus:ring-2 focus:ring-sky-400"
            placeholder="••••••••"
          />
          {/* Toggle button - always visible */}
          <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  onMouseDown={e => e.preventDefault()}
  className="absolute right-3 top-[65%] transform -translate-y-1/2 text-gray-400 hover:text-white z-10 transition-colors p-1"
  aria-label="Toggle password visibility"
>
  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
</button>

        </div>
        <div className="mb-6 relative">
  <label className="block mb-1 text-sm font-semibold">Confirm Password</label>
  <input
    type={showConfirmPassword ? 'text' : 'password'}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    className="w-full bg-[#15233c] rounded-md py-3 px-4 pr-12 text-gray-300 focus:ring-2 focus:ring-sky-400"
    placeholder="••••••••"
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    onMouseDown={e => e.preventDefault()}
    className="absolute right-3 top-[65%] -translate-y-1/2 text-gray-300 hover:text-white z-10 transition-colors p-1"
    aria-label="Toggle password visibility"
  >
    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
  </button>
</div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-4 h-4 text-sky-400 bg-[#15233c] border-gray-300 rounded"
          />
          <label htmlFor="agree" className="ml-2 text-gray-300 text-sm">
            I agree to the <a href="#" className="text-sky-400 underline">Terms</a> and <a href="#" className="text-sky-400 underline">Privacy</a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-400 text-black font-medium py-3 rounded-lg hover:bg-sky-500"
        >
          Create Account
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6 text-sm">
        Already have an account?{' '}
        <button onClick={switchToLogin} className="text-sky-400 hover:underline">Log in</button>
      </p>
    </div>
  );
}