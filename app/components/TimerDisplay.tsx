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
    <div className="relative flex aspect-square w-[300px] items-center justify-center">
      <div className="absolute space-x-4 text-7xl font-bold">
        <span>{formatTimeToString(minutes)}</span>
        <span>:</span>
        <span>{formatTimeToString(seconds)}</span>
      </div>

      <div className="absolute bottom-12 flex items-start justify-center gap-4 font-bold text-zinc-400">
        <div className="group relative flex items-center justify-center hover:text-zinc-100">
          <span className="invisible absolute -left-6 -top-4 z-10 text-nowrap text-xs group-hover:visible">
            Work Sessions
          </span>
          <span className="material-symbols-outlined">hourglass</span>
          {totalWorkSessions}
        </div>

        <div className="group relative hover:text-zinc-100">
          <span className="invisible absolute -left-6 -top-4 z-10 text-nowrap text-xs group-hover:visible">
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
