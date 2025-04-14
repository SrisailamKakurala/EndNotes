"use client"
import ChatUI from '@/components/ChatUI'
// import {  } from '@/lib/prompts';
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [userPrompt, setUserPrompt] = useState<string>("");
      useEffect(() => {

          const userPrompt = localStorage.getItem("userPrompt");
          setUserPrompt(userPrompt!);
    
          // generate roadmap with llm
        //   const { roadmapReadme, roadmapJSON } = getRoadmap(userPrompt!);
        //   console.log(roadmapReadme, roadmapJSON);
    })

    return (
        <>
            <ChatUI 
                    msg={userPrompt}
                    role="user"
            />
        </>
    )
}

export default Chat