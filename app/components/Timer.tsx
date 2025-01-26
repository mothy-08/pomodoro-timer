import React from "react";
import { useTimer } from "react-timer-hook";
import { MILLISECONDS_MULTIPLIER } from "../hooks/useTimerState";
import TimerDisplay from "./TimerDisplay";
import ButtonGroup from "./ButtonGroup";
import "react-circular-progressbar/dist/styles.css";

export default function Timer({
  timerExpiry,
  playTimerSound,
  duration,
  currentState,
  isTimerExpired,
  restartWorkTimer,
  restartShortBreakTimer,
  restartLongBreakTimer,
  autoStart,
  totalWorkSessions,
  showTimerSettings,
}: {
  timerExpiry: Date;
  playTimerSound: () => void;
  duration: number;
  currentState: string;
  isTimerExpired: boolean;
  restartWorkTimer: () => void;
  restartShortBreakTimer: () => void;
  restartLongBreakTimer: () => void;
  autoStart: boolean;
  totalWorkSessions: number;
  showTimerSettings: () => void;
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
    autoStart: autoStart,
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
    const time = new Date(
      new Date().getTime() + duration * MILLISECONDS_MULTIPLIER,
    );
    restart(time, autoStart);
    if (isPaused) setIsPaused(false);
  };

  const calculateProgressBarPercentage = () => {
    return (totalSeconds / (duration * 60)) * 100;
  };

  React.useEffect(() => {
    restart(timerExpiry, autoStart);
  }, [restart, timerExpiry, autoStart]);

  React.useEffect(() => {
    if (isTimerExpired) {
      document.title = "Time's Up!";
    } else {
      const formattedTime = `${formatTimeToString(
        minutes,
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

  const progressBarColors: string =
    currentState === "work"
      ? "#f5ca93"
      : currentState === "shortBreak"
        ? "#bf93f5"
        : "#93f5ca";

  return (
    <div className="flex flex-col items-center gap-6">
      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        percentage={calculateProgressBarPercentage()}
        color={progressBarColors}
        totalWorkSessions={totalWorkSessions}
        showTimerSettings={showTimerSettings}
      />
      <ButtonGroup
        isRunning={isRunning}
        isPaused={isPaused}
        isTimerExpired={isTimerExpired}
        start={start}
        pause={pauseTimer}
        resume={resumeTimer}
        reset={() => resetTimer(duration, false)}
        currentState={currentState}
        restartWorkTimer={restartWorkTimer}
        restartShortBreakTimer={restartShortBreakTimer}
        restartLongBreakTimer={restartLongBreakTimer}
        totalWorkSessions={totalWorkSessions}
      />
    </div>
  );
}
