import React from "react";
import { useTimer } from "react-timer-hook";
import Button from "./Button";
import clsx from "clsx";

export default function Timer({
  timerExpiry,
  playTimerSound,
  duration,
  currentState,
  isTimerExpired,
  restartWorkTimer,
  restartShortBreakTimer,
  restartLongBreakTimer,
}: {
  timerExpiry: Date;
  playTimerSound: () => void;
  duration: number;
  currentState: string;
  isTimerExpired: boolean;
  restartWorkTimer: () => void;
  restartShortBreakTimer: () => void;
  restartLongBreakTimer: () => void;
}) {
  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: timerExpiry,
    onExpire: () => {
      console.warn("onExpire called");
      playTimerSound();
    },
  });

  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const formatTimeToString = (time: number) => String(time).padStart(2, "0");

  const pauseTimer = () => {
    setIsPaused(true);
    pause();
  };

  const resumeTimer = () => {
    setIsPaused(false);
    resume();
  };

  const resetTimer = (duration: number, autoStart: boolean) => {
    const time = new Date(new Date().getTime() + duration * 1000);
    restart(time, autoStart);
    if (isPaused) setIsPaused(false);
  };

  const calculateProgressBarPercentage = () => {
    return String(100 - (totalSeconds / duration) * 100) + "%";
  };

  React.useEffect(() => {
    restart(timerExpiry, false);
  }, [timerExpiry, restart]);

  React.useEffect(() => {
    if (isTimerExpired) {
      document.title = "Time's Up!";
    } else {
      const formattedTime = `${formatTimeToString(
        minutes
      )}:${formatTimeToString(seconds)}`;
      const stateLabel =
        currentState === "work"
          ? "Focus"
          : currentState === "shortBreak"
          ? "Short Break"
          : "Long Break";
      document.title = `${formattedTime} - ${stateLabel}`;
    }

    return () => {
      document.title = "Pomodoro Timer";
    };
  }, [minutes, seconds, isTimerExpired, currentState]);

  const renderStateButtons = () => {
    if (currentState === "work") {
      return (
        <>
          <Button
            title="Restart Focus"
            onClick={restartWorkTimer}
            buttonStyle={clsx(
              !isRunning && isTimerExpired ? "block" : "hidden"
            )}
          />
          <Button
            title="Short"
            onClick={restartShortBreakTimer}
            buttonStyle={clsx(!isTimerExpired ? "hidden" : "block")}
          />
          <Button
            title="Long"
            onClick={restartLongBreakTimer}
            buttonStyle={clsx(!isTimerExpired ? "hidden" : "block")}
          />
        </>
      );
    } else {
      return (
        <>
          <Button
            title="Start Focus"
            onClick={restartWorkTimer}
            buttonStyle={clsx(
              !isRunning && isTimerExpired ? "block" : "hidden"
            )}
          />
          <Button
            title={
              currentState === "shortBreak"
                ? "Another short break"
                : "Another long break"
            }
            onClick={() => {
              currentState === "shortBreak"
                ? restartShortBreakTimer()
                : restartLongBreakTimer();
            }}
            buttonStyle={clsx(!isTimerExpired ? "hidden" : "block")}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-8xl font-bold space-x-4">
        <span>{formatTimeToString(minutes)}</span>
        <span>:</span>
        <span>{formatTimeToString(seconds)}</span>
      </div>

      <div className="mx-auto my-1 h-1 w-full overflow-hidden rounded-lg bg-zinc-800">
        <div
          className="h-full w-full rounded-lg bg-zinc-500 transition-all"
          style={{ width: calculateProgressBarPercentage() }}
        ></div>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Button
          title="Start"
          onClick={start}
          buttonStyle={clsx(
            isRunning || isPaused ? "hidden" : "",
            isTimerExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Pause"
          onClick={pauseTimer}
          buttonStyle={clsx(
            isRunning ? "block" : "hidden",
            isTimerExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Resume"
          onClick={resumeTimer}
          buttonStyle={clsx(
            !isRunning && isPaused ? "block" : "hidden",
            isTimerExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Reset"
          onClick={() => resetTimer(duration, false)}
          buttonStyle={clsx(
            isRunning || isPaused ? "block" : "hidden",
            isTimerExpired ? "hidden" : ""
          )}
        />
        {renderStateButtons()}
      </div>
    </div>
  );
}
