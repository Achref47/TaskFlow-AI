import React from 'react';
import Navbar from '../header/Navbar';
import backgroundImage from '../Assets/bg3.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="A vibrant cosmic background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/30 to-black/80 z-10"></div>

      <div className="relative z-20">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          {/* Contact card with glass and neon effect */}
          <div className="w-full lg:w-2/3 max-w-2xl p-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 text-center
                          transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                          animate-float">
            <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Get in Touch 📞</h1>
            <p className="text-gray-200 text-xl leading-relaxed mb-8">
              Have questions, feedback, or just want to say hello? We'd love to hear from you. Reach out through the channels below.
            </p>

            <div className="space-y-6">
              <p className="text-gray-100 text-xl flex justify-center items-center gap-2">
                <span className="font-semibold text-white">Email:</span>
                <a href="mailto:contact@taskflowai.com" className="text-blue-400 hover:text-blue-300 transition duration-300 hover:underline">
                  contact@taskflowai.com
                </a>
              </p>

              <p className="text-gray-100 text-xl flex justify-center items-center gap-2">
                <span className="font-semibold text-white">Phone:</span>
                <a href="tel:+1-234-567-8900" className="text-purple-400 hover:text-purple-300 transition duration-300 hover:underline">
                  +1-234-567-8900
                </a>
              </p>

              <p className="text-gray-100 text-xl flex justify-center items-center gap-2">
                <span className="font-semibold text-white">Address:</span>
                123 AI Boulevard, Tech City, TX 78701
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for floating effect */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;
