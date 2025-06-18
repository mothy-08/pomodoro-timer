import React from "react";
import ProgressBar from "./ProgressBar";
import clsx from "clsx";

export default function TimerDisplay({
  minutes,
  seconds,
  percentage,
  color,
  totalWorkSessions,
  resetWorkSession,
  showTimerSettings,
}: {
  minutes: number;
  seconds: number;
  percentage: number;
  color: string;
  totalWorkSessions: number;
  resetWorkSession: () => void;
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
            id="tooltip-restart-work-session"
            role="tooltip"
            className={clsx(
              `invisible absolute -left-12 -top-4 z-10 text-nowrap text-xs`,
              totalWorkSessions > 0 ? "group-hover:visible" : "",
            )}
          >
            Reset Work Session{totalWorkSessions > 1 ? "s" : ""}
          </span>
          <button
            aria-describedby="tooltip-restart-work-session"
            className={clsx(
              `material-symbols-outlined scale-x-[-1]`,
              totalWorkSessions === 0 ? "text-zinc-500" : "",
            )}
            aria-label="Reset Work Session"
            disabled={totalWorkSessions === 0 ? true : false}
            onClick={resetWorkSession}
          >
            refresh
          </button>
        </div>

        <div className="group relative flex items-center justify-center hover:text-zinc-100">
          <span
            id="tooltip-work-session"
            role="tooltip"
            className="invisible absolute -left-6 -top-4 z-10 text-nowrap text-xs group-hover:visible"
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
            className="invisible absolute -left-8 -top-4 z-10 text-nowrap text-xs group-hover:visible"
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
