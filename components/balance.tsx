"use client";

interface BalanceProps {
  result: "" | "left-heavy" | "right-heavy" | "equal";
  onDrop: (e: React.DragEvent, target: "left" | "right" | "tray") => void;
  onDragOver: (e: React.DragEvent) => void;
  balls: Array<{
    id: number;
    weight: "normal" | "heavy" | "light";
    location: "tray" | "left" | "right";
  }>;
}

import type React from "react";
import { useState, useEffect } from "react";

export default function Balance({
  result,
  onDrop,
  onDragOver,
  balls,
}: BalanceProps) {
  const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);

  // Get balls on each side
  const leftBalls = balls.filter((ball) => ball.location === "left");
  const rightBalls = balls.filter((ball) => ball.location === "right");

  // Update the rotation based on the result
  useEffect(() => {
    if (result === "left-heavy") {
      setLeftRotation(-10);
      setRightRotation(10);
    } else if (result === "right-heavy") {
      setLeftRotation(10);
      setRightRotation(-10);
    } else {
      setLeftRotation(0);
      setRightRotation(0);
    }
  }, [result]);

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Balance base */}
      <div className="relative h-40 w-full max-w-2xl">
        {/* Balance beam */}
        <div
          className="absolute left-1/2 top-1/4 h-4 w-3/4 -translate-x-1/2 transform rounded-full bg-slate-700 transition-transform duration-700"
          style={{
            transform: `translateX(-50%) rotate(${
              result === "left-heavy" ? -5 : result === "right-heavy" ? 5 : 0
            }deg)`,
          }}
        />

        {/* Center stand */}
        <div className="absolute left-1/2 top-1/4 h-24 w-4 -translate-x-1/2 transform bg-slate-800" />

        {/* Base */}
        <div className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 transform rounded-lg bg-slate-900" />

        {/* Left pan */}
        <div
          className="absolute left-1/4 top-1/2 flex h-24 w-24 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-slate-600 bg-slate-300 transition-transform duration-700 dark:bg-slate-600 sm:h-32 sm:w-32"
          style={{ transform: `translateX(-50%) rotate(${leftRotation}deg)` }}
          onDrop={(e) => onDrop(e, "left")}
          onDragOver={onDragOver}
        >
          <div className="grid grid-cols-3 gap-1">
            {leftBalls.length > 0
              ? leftBalls.map((ball, index) => (
                  <div
                    key={ball.id}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-xs font-bold text-black sm:h-8 sm:w-8 sm:text-sm"
                  >
                    {ball.id}
                  </div>
                ))
              : Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
                  ></div>
                ))}
          </div>
        </div>

        {/* Right pan */}
        <div
          className="absolute right-1/4 top-1/2 flex h-24 w-24 translate-x-1/2 transform items-center justify-center rounded-full border-4 border-slate-600 bg-slate-300 transition-transform duration-700 dark:bg-slate-600 sm:h-32 sm:w-32"
          style={{ transform: `translateX(50%) rotate(${rightRotation}deg)` }}
          onDrop={(e) => onDrop(e, "right")}
          onDragOver={onDragOver}
        >
          <div className="grid grid-cols-3 gap-1">
            {rightBalls.length > 0
              ? rightBalls.map((ball, index) => (
                  <div
                    key={ball.id}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-xs font-bold text-black sm:h-8 sm:w-8 sm:text-sm"
                  >
                    {ball.id}
                  </div>
                ))
              : Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
                  ></div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
