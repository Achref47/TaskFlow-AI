import React, { useState } from 'react';
import Navbar from '../header/Navbar';
import backgroundImage from '../Assets/bg4.jpg'; // Cosmic background

const faqItems = [
  {
    question: "What is TaskFlow AI?",
    answer: "TaskFlow AI is a project management application designed to help you organize tasks, collaborate with your team, and increase productivity with the help of an AI assistant.",
  },
  {
    question: "How does the AI assistant work?",
    answer: "The AI assistant uses advanced language models to understand your questions and commands. It can help you create tasks, suggest deadlines, and provide insights based on your project data.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security very seriously. All your data is encrypted both in transit and at rest. We use industry-standard security practices to protect your information.",
  },
  {
    question: "Can I integrate TaskFlow AI with other tools?",
    answer: "Absolutely! TaskFlow AI supports integrations with popular tools like Slack, Google Calendar, Trello, and GitHub to streamline your workflow.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, TaskFlow AI is available for both iOS and Android devices, allowing you to manage your tasks on the go.",
  },
  {
    question: "Can I collaborate with my team?",
    answer: "Yes, you can invite team members, assign tasks, and track progress in real-time with TaskFlow AI’s collaborative features.",
  },
  {
    question: "What is the pricing plan?",
    answer: "TaskFlow AI offers a free tier with basic features and premium plans with advanced AI capabilities. You can view detailed pricing on our website.",
  },
  {
    question: "How can I get support?",
    answer: "You can reach our support team via email at contact@taskflowai.com or use the live chat feature in the app.",
  },
  {
    question: "Does TaskFlow AI work offline?",
    answer: "Some features work offline, but to fully sync tasks and collaborate with your team, an internet connection is required.",
  },
  {
    question: "Can I customize the AI assistant?",
    answer: "Yes, TaskFlow AI allows you to customize the AI assistant’s behavior, notifications, and suggestions according to your workflow.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="A vibrant cosmic background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/40 to-black/70 z-10"></div>

      <div className="relative z-20">
        <Navbar />

        {/* Slightly lower FAQ container */}
        <div className="flex justify-center p-8 mt-40">
          <div className="w-full max-w-6xl p-14 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 animate-float">
            <h1 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
              Frequently Asked Questions 
            </h1>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-6 cursor-pointer transition duration-300 hover:bg-white/20"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex justify-between items-center">
                    {/* Bigger question text */}
                    <h3 className="text-xl font-bold text-purple-400">{item.question}</h3>
                    <span className="text-white">{openIndex === index ? '▲' : '▼'}</span>
                  </div>
                  {openIndex === index && (
                    <p className="mt-4 text-gray-200 font-bold">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
