import React from "react";
import Button from "./Button";
import clsx from "clsx";

export default function ButtonGroup({
  isRunning,
  isPaused,
  isTimerExpired,
  start,
  pause,
  resume,
  reset,
  currentState,
  restartWorkTimer,
  restartShortBreakTimer,
  restartLongBreakTimer,
  totalWorkSessions,
}: {
  isRunning: boolean;
  isPaused: boolean;
  isTimerExpired: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  currentState: string;
  restartWorkTimer: () => void;
  restartShortBreakTimer: () => void;
  restartLongBreakTimer: () => void;
  totalWorkSessions: number;
}) {
  const renderStateButtons = () => {
    if (currentState === "work") {
      return (
        <>
          <Button
            title="Restart Focus"
            onClick={restartWorkTimer}
            className={clsx(!isRunning && isTimerExpired ? "block" : "hidden")}
          />
          {totalWorkSessions % 4 !== 0 && (
            <Button
              title="Short"
              onClick={restartShortBreakTimer}
              className={clsx(!isTimerExpired ? "hidden" : "block")}
            />
          )}
          <Button
            title="Long"
            onClick={restartLongBreakTimer}
            className={clsx(!isTimerExpired ? "hidden" : "block")}
          />
        </>
      );
    } else {
      return (
        <>
          <Button
            title="Start Focus"
            onClick={restartWorkTimer}
            className={clsx(!isRunning && isTimerExpired ? "block" : "hidden")}
          />
          <Button
            title={
              currentState === "shortBreak"
                ? "Another short break"
                : "Another long break"
            }
            onClick={() => {
              if (currentState === "shortBreak") {
                restartShortBreakTimer();
              } else {
                restartLongBreakTimer();
              }
            }}
            className={clsx(!isTimerExpired ? "hidden" : "block")}
          />
        </>
      );
    }
  };

  const hideOnTimerExpire: string = isTimerExpired ? "hidden" : "";

  return (
    <div className="flex gap-3 justify-center items-center">
      <Button
        title="Start"
        onClick={start}
        className={clsx(
          isRunning || isPaused ? "hidden" : "",
          hideOnTimerExpire
        )}
      />
      <Button
        title="Pause"
        onClick={pause}
        className={clsx(isRunning ? "block" : "hidden", hideOnTimerExpire)}
      />
      <Button
        title="Resume"
        onClick={resume}
        className={clsx(
          !isRunning && isPaused ? "block" : "hidden",
          hideOnTimerExpire
        )}
      />
      <Button
        title="Reset"
        onClick={reset}
        className={clsx(
          isRunning || isPaused ? "block" : "hidden",
          hideOnTimerExpire
        )}
      />
      {renderStateButtons()}
    </div>
  );
}
