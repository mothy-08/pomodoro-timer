import React from "react";
import ProgressBar from "./ProgressBar";

export default function TimerDisplay({
  minutes,
  seconds,
  percentage,
  color,
}: {
  minutes: number;
  seconds: number;
  percentage: number;
  color: string;
}) {
  const formatTimeToString = (time: number) => String(time).padStart(2, "0");

  return (
    <div className="w-[300px] relative aspect-square flex justify-center items-center">
      <div className="absolute text-7xl font-bold space-x-4">
        <span>{formatTimeToString(minutes)}</span>
        <span>:</span>
        <span>{formatTimeToString(seconds)}</span>
      </div>
      <ProgressBar percentage={percentage} color={color} />
    </div>
  );
}
