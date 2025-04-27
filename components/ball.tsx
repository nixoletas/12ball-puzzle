"use client"

import type React from "react"

interface BallProps {
  id: number
  onDragStart: (e: React.DragEvent, id: number) => void
}

export default function Ball({ id, onDragStart }: BallProps) {
  return (
    <div
      className="flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black shadow-md transition-transform hover:scale-105 active:cursor-grabbing sm:h-16 sm:w-16"
      draggable
      onDragStart={(e) => onDragStart(e, id)}
    >
      {id}
    </div>
  )
}
