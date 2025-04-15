"use client"
import ChatUI from '@/components/ChatUI'
// import {  } from '@/lib/prompts';
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [userPrompt, setUserPrompt] = useState<string>("");
    
      useEffect(() => {
          const userPrompt = localStorage.getItem("userPrompt");
          setUserPrompt(userPrompt!);
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