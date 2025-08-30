import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      toast.error('Enter a valid email address');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData);
        toast.success('Logged in successfully!');
      } catch (err) {
        toast.error(err.message || 'Login failed');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-white">
      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      {/* Left Section */}
      <div className="flex-1 md:flex-none w-full md:w-2/5 bg-[#ff6772] flex flex-col justify-center items-center text-white p-4 sm:p-6 md:p-8 text-center">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center space-x-3 mb-4 md:mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 md:w-5 md:h-5 text-[#ff6772]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 10c0 3.866-3.582 7-8 7-1.25 0-2.43-.227-3.468-.627L2 18l1.5-3.75C2.565 13.042 2 11.574 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
            </div>
            <span className="text-lg md:text-2xl font-semibold tracking-wide">
              ChatterBox
            </span>
          </div>
          <h1 className="text-xl md:text-4xl font-medium mb-3 md:mb-4 leading-snug">
            Connect with friends the best way
          </h1>
          <p className="max-w-xs md:max-w-md text-sm md:text-lg opacity-95 mb-4 md:mb-6">
            We’ve built the perfect place for you to chat, share, and stay connected
            with everyone who matters most.
          </p>
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-4 md:mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <circle cx="50" cy="50" r="45" fill="white" opacity="0.15" />
              <rect
                x="25"
                y="35"
                width="50"
                height="30"
                rx="8"
                fill="white"
                opacity="0.9"
              />
              <circle cx="40" cy="50" r="4" fill="#ff6772" />
              <circle cx="50" cy="50" r="4" fill="#ff6772" />
              <circle cx="60" cy="50" r="4" fill="#ff6772" />
            </svg>
          </div>
          <p className="mt-2 md:mt-4 text-xs md:text-sm opacity-80">
            Made with ❤️ by <span className="font-semibold">Hizqeel Ahmed Armaan</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 md:flex-none w-full md:w-3/5 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-4 sm:py-6">
        <div className="w-full max-w-sm md:max-w-md">
          <h2 className="text-center text-xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">
            Login
          </h2>
          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6772] text-sm md:text-base"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6772] text-sm md:text-base"
            />
            <button
              type="submit"
              className="w-full bg-[#ff6772] text-white py-2 md:py-3 rounded-full font-medium shadow-md hover:opacity-90 transition text-sm md:text-base"
            >
              Login
            </button>
          </form>
          <p className="mt-4 md:mt-6 text-center text-gray-600 text-sm md:text-base">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#ff6772] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

