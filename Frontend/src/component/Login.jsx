import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from '../Assets/bg1.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      
      toast.success('Logged in successfully!', {
        onClose: () => {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        },
      });

    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Connection failed. Please ensure the backend server is running.");
        console.error("An unknown error occurred:", error);
      }
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
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
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
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 transform hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-200 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-200 font-bold transition duration-300">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;