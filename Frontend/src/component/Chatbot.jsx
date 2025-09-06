import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    const botMessage =
      "👋 Hello! I am TaskFlow AI, your personal project and task management assistant. How can I help you manage your tasks and projects today?";
    setMessages([{ text: botMessage, user: "bot" }]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMessage = { text: trimmedInput, user: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/chatbot",
        { message: trimmedInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMessage = { text: response.data.botResponse, user: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Sorry, I encountered an error. Please try again.", user: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-800/80 to-pink-500/80 text-white border-b border-white/20">
        <h2 className="text-lg font-bold">TaskFlow AI Assistant 🤖</h2>
        <p className="text-sm opacity-80">Your intelligent assistant for project operations.</p>
      </div>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.user === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-md text-sm sm:text-base ${
                msg.user === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-300 italic">
            <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-300"></div>
            <span>AI is typing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-lg">
        <form onSubmit={sendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            disabled={loading || !userInput.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
