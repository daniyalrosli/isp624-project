"use client";

import React, { useState, useRef } from "react";

const fetchPrediction = async (input: string): Promise<BotResponse> => {
  return mockBotResponse(input);
};

const mockBotResponse = (input: string): BotResponse => {
    if (input.toLowerCase().includes("insurance claim")) {
      return {
        success: true,
        result: "Based on your age, health conditions, and coverage, your predicted claim amount is $5000.",
      };
    } else if (input.toLowerCase().includes("coverage plans")) {
      return {
        success: true,
        result: "We offer basic to premium plans, including dental and vision coverage. Would you like to know more?",
      };
    } else if (input.toLowerCase().includes("how it works")) {
      return {
        success: true,
        result: "Our prediction model uses factors like age, BMI, and medical history to estimate insurance claims accurately.",
      };
    } else if (input.toLowerCase().includes("bmi")) {
      return {
        success: true,
        result: "BMI (Body Mass Index) is a health indicator that can affect your insurance claims based on your risk profile.",
      };
    } else if (input.toLowerCase().includes("smoking")) {
      return {
        success: true,
        result: "Smoking habits significantly influence your insurance claims, as smokers are more likely to incur higher health costs.",
      };
    } else if (input.toLowerCase().includes("premium")) {
      return {
        success: true,
        result: "Our premium plans cover advanced treatments, dental, vision, and mental health services. Let me know if you'd like more details.",
      };
    } else if (input.toLowerCase().includes("claim process")) {
      return {
        success: true,
        result: "The claim process involves submitting medical records and treatment costs. Our model predicts the claim amount based on these inputs.",
      };
    } else if (input.toLowerCase().includes("medical history")) {
      return {
        success: true,
        result: "Your medical history, including chronic illnesses, significantly impacts the claim prediction and estimated costs.",
      };
    } else if (input.toLowerCase().includes("policy details")) {
      return {
        success: true,
        result: "Our policies are tailored to individual needs, covering hospital stays, medications, and preventive care. Would you like a comparison of our plans?",
      };
    } else if (input.toLowerCase().includes("deductible")) {
      return {
        success: true,
        result: "A deductible is the amount you pay before your insurance starts covering costs. Higher deductibles usually mean lower premiums.",
      };
    } else if (input.toLowerCase().includes("discounts")) {
      return {
        success: true,
        result: "We offer discounts for non-smokers, families, and those with a healthy BMI. Let us know if you'd like to see if you qualify!",
      };
    } else if (input.toLowerCase().includes("customer support")) {
      return {
        success: true,
        result: "Our customer support team is available 24/7 to assist you with claims, policy changes, or general inquiries.",
      };
    } else if (input.toLowerCase().includes("hospital coverage")) {
      return {
        success: true,
        result: "Our plans cover a wide network of hospitals, including specialized care centers for various health conditions.",
      };
    }
    return {
      success: false,
      result: "I'm not sure about that. Can you please rephrase your question?",
    };
  };

interface BotResponse {
  success: boolean;
  result: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatbotRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({
    x: window.innerWidth - 320,
    y: window.innerHeight - 220,
  });

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { sender: "user", text: userInput }];
      setMessages(newMessages);
      setUserInput("");

      const predictionResponse = await fetchPrediction(userInput);
      const botResponse = predictionResponse.result;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatbotRef.current) {
      const { left, top } = chatbotRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    }
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatbotRef.current) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - 320)),
        y: Math.max(0, Math.min(newY, window.innerHeight - 220)),
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="fixed z-50"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition duration-300"
          aria-label="Open Chatbot"
        >
          💬 Chat
        </button>
      )}

      {isOpen && (
        <div
          ref={chatbotRef}
          className="w-80 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col"
          onMouseDown={handleMouseDown}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex justify-between items-center rounded-t-xl">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } shadow-md`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex p-4 border-t border-gray-200">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-r-lg hover:scale-105 transition duration-300"
              aria-label="Send Message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}