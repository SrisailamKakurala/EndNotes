// src/app/notes/@main/loading.tsx
'use client'

import Loader from "@/components/Loader"


export default function Loading() {
  return (
    <div className="flex w-[75%] h-full bg-[#212121] rounded-2xl items-center justify-center">
      <Loader message='RoadMap' />
    </div>
  )
}
