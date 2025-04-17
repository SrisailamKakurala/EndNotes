"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Sparkles, RefreshCw, XCircle } from "lucide-react";
import { prompts } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [typedPrompt, setTypedPrompt] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  const handleGenerateNotes = () => {
    if (userPrompt) {
      localStorage.setItem("userPrompt", userPrompt);
      router.push("/notes");
    } else {
      alert("Please enter a prompt");
    }
  };

  const triggerTypingEffect = (text: string) => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedPrompt(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 30);
  };

  const surprisePrompt = useCallback(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    triggerTypingEffect(randomPrompt);
    setUserPrompt(randomPrompt);
  }, []);

  useEffect(() => {
    surprisePrompt(); // Initial load
  }, [surprisePrompt]);

  return (
    <div className="h-screen flex flex-col gap-8 justify-center items-center w-full bg-[radial-gradient(circle_at_center,_#353535,_#000)]">
      {/* Heading */}
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold text-white">ENDNOTES.AI</h1>
        <p className="text-lg text-[#c5c2c2]">
          One Stop Solution for making Comprehensive notes
        </p>
        <p className="text-md text-[#c5c2c2]">No Iterations!</p>
      </div>

      {/* Input Box */}
      <div className="flex flex-col gap-4 w-[40%] rounded-4xl bg-[#0B0B0B] p-4">
        <textarea
          name="input"
          id="input"
          rows={4}
          className="focus:outline-none resize-none text-[#c5c2c2] rounded-xl p-3 text-lg bg-[#121212] placeholder:text-[#555]"
          placeholder={typedPrompt}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTypedPrompt("");
                setUserPrompt("");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
            >
              <XCircle size={18} />
              Clear
            </button>

            <button
              onClick={surprisePrompt}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
            >
              <RefreshCw size={18} />
              Surprise Me
            </button>
          </div>

          <button
            onClick={handleGenerateNotes}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#5e0468] text-white duration-200 hover:bg-[#5e0468b1]"
          >
            <Sparkles size={18} />
            Generate Notes
          </button>
        </div>
      </div>

      {/* Prompt Suggestions */}
      <div className="flex flex-wrap justify-center gap-6 w-[75%]">
        {prompts.slice(0, 9).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setUserPrompt(prompt);
              setTypedPrompt(""); // Stop animating placeholder
            }}
            className="bg-[#1a1a1a] cursor-pointer hover:bg-[#2a2a2a] text-white text-sm px-4 py-2 rounded-full transition-all duration-200 border border-[#5e0468] shadow-md shadow-[#5e0468]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;
