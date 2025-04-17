import React from 'react'

const layout = ({ chat, main}: {chat: React.ReactNode, main: React.ReactNode}) => {
  return (
    <div className='w-full h-screen p-8 bg-black'>
            <div className="h-full flex gap-5">
                {/* chat section */}
                {chat}
                {/* readme section */}
                {main}
            </div>
    </div>
  )
}

export default layout