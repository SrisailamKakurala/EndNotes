'use client';
import { MessageCircle, SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  msg: string;
  role: "user" | "llm";
}

const ChatUI = ({ msg, role }: { msg: string; role: "user" | "llm" }) => {
  const [messages, setMessages] = useState<Message[]>([]); // start empty
  const [input, setInput] = useState("");

  const hasReplied = useRef(false);

  useEffect(() => {
    if (hasReplied.current) return;
  
    const initialMessage: Message = { msg, role };
    setMessages([initialMessage]);
  
    if (role === "user") {
      setTimeout(() => {
        const llmResponse: Message = {
          msg: `Got it! let’s Generate a roadmap first!`,
          role: "llm",
        };
        setMessages((prev) => [...prev, llmResponse]);
      }, 500);
    }
  
    hasReplied.current = true;
  }, [msg, role]);
  

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = { msg: input.trim(), role: "user" };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const llmResponse: Message = {
        msg: `I'm working on it!`,
        role: "llm",
      };
      setMessages((prev) => [...prev, llmResponse]);
    }, 500);

    setInput("");
  };

  return (
    <div className="w-[25%] h-full bg-[#212121] rounded-2xl p-4 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="text-[#9ca3af]" size={20} />
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[85%] text-sm px-3 py-2 rounded-md ${
              message.role === "user"
                ? "bg-[#2e2e2e] self-end text-right"
                : "bg-[#161616] self-start text-left"
            }`}
          >
            {message.msg}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center mt-3 gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-2 rounded-md bg-[#21262D] text-sm text-white placeholder:text-gray-500 focus:outline-none"
        />

        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-white duration-200 cursor-pointer hover:bg-gray-400">
            <button onClick={handleSend} className="text-black transition">
            <SendHorizonal size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
