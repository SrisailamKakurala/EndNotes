"use client"
import React, { useEffect } from 'react'
import { Stars } from 'lucide-react'
const Page = () => {
  
  useEffect(() => {
    const userPrompt = localStorage.getItem('userPrompt');
    console.log("Main: " , userPrompt);
  }, []);

  return (
    <div className="w-[75%] h-full bg-[#212121] rounded-2xl p-6 overflow-y-auto relative">
      <div className="rounded-lg z-50 py-3 px-5 flex gap-2 bg-black hover:bg-[#121212] duration-150 absolute bottom-5 right-5 w-fit cursor-pointer">
        <Stars className='text-green-500' />
        <p className="text-md font-bold text-slate-200">Make Notes</p>
      </div>
    </div>
  );
};

export default Page;


