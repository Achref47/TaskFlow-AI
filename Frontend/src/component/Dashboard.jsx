import React from "react";
import Chatbot from "./Chatbot";
import backgroundImage from "../Assets/bg3.jpg";
import Navbar from "../header/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="A vibrant cosmic background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Gradient overlay to enhance neon colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/40 to-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <div className="container mx-auto p-8 flex flex-col items-center">
          
          {/* About Us Section with glass effect */}
          <div className="w-full lg:w-6/4 max-w-8xl text-center mb-10 mt-24 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-12 border border-white/20">
            <h2 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg animate-pulse">
              About TaskFlow AI
            </h2>
            <p className="text-gray-200 text-xl leading-relaxed">
              TaskFlow AI is a powerful project and task management application
              designed to streamline your workflow. Our intelligent AI assistant
              helps you manage tasks, set deadlines, and optimize your
              productivity, so you can focus on what matters most.
            </p>
          </div>

          {/* Chatbot Area with glass panel */}
          <div className="w-full lg:w-3/4 max-w-6xl">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;