import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from '../Assets/bg1.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Password strength checker
  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(password)) {
      toast.error(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
      });
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <img
        src={backgroundImage}
        alt="A vibrant background for a to-do app"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100/50 z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <div className="mt-2 text-sm text-gray-200">
  <p className="font-semibold mb-1">Password must include:</p>
  <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs">
    <li>At least 8 characters</li>
    <li>One uppercase letter <span className="text-green-400 font-bold">A-Z</span></li>
    <li>One lowercase letter <span className="text-green-400 font-bold">a-z</span></li>
    <li>One number <span className="text-green-400 font-bold">0-9</span></li>
    <li>One special character <span className="text-green-400 font-bold">!@#$%^&*</span></li>
  </ul>
</div>

          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 transform hover:scale-105"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-200 text-sm">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-200 font-bold transition duration-300">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
