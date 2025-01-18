import React from "react";
import useSound from "use-sound";

export type TimerStateKey = "work" | "shortBreak" | "longBreak";

type TimerStateDetails = {
  duration: number;
  label: string;
};

const stateDurations: Record<TimerStateKey, TimerStateDetails> = {
  work: { duration: 5, label: "Work" },
  shortBreak: { duration: 300, label: "Short Break" },
  longBreak: { duration: 900, label: "Long Break" },
};

export default function useTimerState() {
  const [currentState, setCurrentState] = React.useState<TimerStateKey>("work");
  const [timerExpiry, setTimerExpiry] = React.useState<Date>(
    new Date(
      new Date().getTime() + stateDurations[currentState].duration * 1000
    )
  );
  const [isTimerExpired, setIsTimerExpired] = React.useState<boolean>(false);
  const [play, { stop }] = useSound("/timer.mp3");
  const [totalWorkSessions, setTotalWorkSessions] = React.useState<number>(0);

  const changeState = (type: TimerStateKey) => {
    if (isTimerExpired === true) {
      stop();
      setIsTimerExpired(false);
    }
    setCurrentState(type);
    setTimerExpiry(
      new Date(new Date().getTime() + stateDurations[type].duration * 1000)
    );
  };

  const calculateDuration = Math.ceil(
    (timerExpiry.getTime() - new Date().getTime()) / 1000
  );

  const playTimerSound = (type: TimerStateKey) => {
    if (type == "work") setTotalWorkSessions(totalWorkSessions + 1);
    play();
    setIsTimerExpired(true);
  };

  return {
    stateDurations,
    currentState,
    timerExpiry,
    isTimerExpired,
    totalWorkSessions,
    changeState,
    playTimerSound,
    calculateDuration,
  };
}
