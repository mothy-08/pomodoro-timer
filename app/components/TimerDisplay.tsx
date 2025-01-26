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
    <div className="relative flex aspect-square w-[280px] items-center justify-center">
      <div className="absolute space-x-4 text-6xl font-bold">
        <span>{formatTimeToString(minutes)}</span>
        <span>:</span>
        <span>{formatTimeToString(seconds)}</span>
      </div>

      <div className="absolute bottom-12 flex items-start justify-center gap-4 font-bold text-zinc-400">
        <div className="group relative flex items-center justify-center hover:text-zinc-100">
          <span
            id="tooltip-work-session"
            role="tooltip"
            className="invisible absolute -top-4 left-0 z-10 text-nowrap text-xs group-hover:visible"
          >
            Work Sessions
          </span>
          <span
            aria-describedby="tooltip-work-session"
            className="material-symbols-outlined"
            aria-label="Work Sessions"
          >
            hourglass
          </span>
          {totalWorkSessions}
        </div>

        <div className="group relative hover:text-zinc-100">
          <span
            id="tooltip-configure-timer"
            role="tooltip"
            className="invisible absolute -top-4 z-10 text-nowrap text-xs group-hover:visible"
          >
            Configure Timer
          </span>
          <button
            aria-describedby="tooltip-configure-timer"
            onClick={showTimerSettings}
            className="material-symbols-outlined"
            aria-label="Configure Timer"
          >
            tune
          </button>
        </div>
      </div>

      <ProgressBar percentage={percentage} color={color} />
    </div>
  );
}
