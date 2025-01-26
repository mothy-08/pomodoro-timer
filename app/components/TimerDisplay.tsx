import React from "react";
import ProgressBar from "./ProgressBar";

export default function TimerDisplay({
  minutes,
  seconds,
  percentage,
  color,
  totalWorkSessions,
  showTimerSettings,
}: {
  minutes: number;
  seconds: number;
  percentage: number;
  color: string;
  totalWorkSessions: number;
  showTimerSettings: () => void;
}) {
  const formatTimeToString = (time: number) => String(time).padStart(2, "0");

  return (
    <div className="w-[300px] relative aspect-square flex justify-center items-center">
      <div className="absolute text-7xl font-bold space-x-4">
        <span>{formatTimeToString(minutes)}</span>
        <span>:</span>
        <span>{formatTimeToString(seconds)}</span>
      </div>

      <div className="absolute bottom-12 flex gap-4 items-start justify-center text-zinc-400 font-bold">
        <div className="relative flex items-center justify-center group hover:text-zinc-100">
          <span className="invisible group-hover:visible text-xs absolute z-10 text-nowrap -top-4 -left-6">
            Work Sessions
          </span>
          <span className="material-symbols-outlined">hourglass</span>
          {totalWorkSessions}
        </div>

        <div className="relative group hover:text-zinc-100">
          <span className="invisible group-hover:visible text-xs absolute z-10 text-nowrap -top-4 -left-6">
            Configure Timer
          </span>
          <button
            onClick={showTimerSettings}
            className="material-symbols-outlined"
          >
            tune
          </button>
        </div>
      </div>

      <ProgressBar percentage={percentage} color={color} />
    </div>
  );
}
