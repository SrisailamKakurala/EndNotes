"use client"
import ChatUI from '@/components/ChatUI';
import { getRoadmap } from '@/lib/prompts';
import React, { useEffect, useState } from 'react'

const Notes = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  useEffect(() => {
      const userPrompt = localStorage.getItem("userPrompt");
      setUserPrompt(userPrompt!);

      // generate roadmap with llm
      const { roadmapReadme, roadmapJSON } = getRoadmap(userPrompt!);
      console.log(roadmapReadme, roadmapJSON);
  })
  return (
    <div className='w-full h-screen p-8 bg-black'>
        <div className="h-full flex gap-5">
            {/* chat section */}
            <ChatUI 
                msg={userPrompt}
                role="user"
            />
            {/* readme section */}
            <div className="w-[75%] h-full bg-[#0D1117] rounded-2xl">
                
            </div>
        </div>
    </div>
  )
}

export default Notes