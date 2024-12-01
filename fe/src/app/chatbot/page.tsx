"use client";

import React, { useState, useRef } from "react";

const mockBotResponse = (input: string): BotResponse => {
  if (input.toLowerCase().includes("insurance claim")) {
    return {
      success: true,
      result: "Based on your age, health conditions, and coverage, your predicted claim amount is $5000."
    };
  } else if (input.toLowerCase().includes("how it works")) {
    return {
      success: true,
      result: "The insurance claim prediction model uses factors like age, BMI, medical history to estimate your claim."
    };
  } else if (input.toLowerCase().includes("coverage plans")) {
    return {
      success: true,
      result: "We offer a variety of coverage plans. From basic to premium plans that include additional benefits like dental and vision coverage. Would you like to know more?"
    };
  } else if (input.toLowerCase().includes("bmi")) {
    return {
      success: true,
      result: "BMI (Body Mass Index) is a key factor in determining your health status and can impact your insurance claim prediction."
    };
  } else if (input.toLowerCase().includes("smoking")) {
    return {
      success: true,
      result: "Smoking habits can affect your insurance claim prediction. Smokers may face higher claim estimates due to increased health risks."
    };
  } else if (input.toLowerCase().includes("premium")) {
    return {
      success: true,
      result: "Our premium plans provide extensive coverage, including advanced treatments, dental, vision, and mental health services. Let me know if you'd like more details."
    };
  } else if (input.toLowerCase().includes("claim process")) {
    return {
      success: true,
      result: "The claim process involves submitting your medical records and estimated treatment costs. Our model then uses this data to predict your claim amount."
    };
  } else if (input.toLowerCase().includes("medical history")) {
    return {
      success: true,
      result: "Your medical history plays a significant role in determining your claim prediction. Conditions such as chronic illnesses can increase the likelihood of higher claims."
    };
  }
  return {
    success: false,
    result: "I'm not sure about that. Can you please rephrase your question?"
  };
};

const fetchPrediction = async (input: string): Promise<BotResponse> => {
  return mockBotResponse(input);
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
  
  // Ref to access chatbot element
  const chatbotRef = useRef<HTMLDivElement | null>(null);

  // Position state for chatbot window
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 220 });

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { sender: "user", text: userInput }];
      setMessages(newMessages);
      setUserInput("");

      // Fetch prediction from API (mocked here)
      const predictionResponse = await fetchPrediction(userInput);

      // Simulate bot response based on the prediction result
      let botResponse = predictionResponse.result;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);
    }
  };

  // Handle the drag start
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

  // Handle mouse move while dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatbotRef.current) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Ensure the chatbot stays within the window bounds
      setPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - 320)),
        y: Math.max(0, Math.min(newY, window.innerHeight - 220)),
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach mouse move and mouse up events to the document
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
        transition: "left 0.2s, top 0.2s", // smooth transition for movement
      }}
    >
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Open Chatbot"
        >
          💬 Chat
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col cursor-move"
          onMouseDown={handleMouseDown}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300"
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