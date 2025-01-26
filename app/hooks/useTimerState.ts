import React from "react";
import useSound from "use-sound";

export const MILLISECONDS_MULTIPLIER: number = 60000;

export type TimerStateKey = "work" | "shortBreak" | "longBreak";

type TimerStateDetails = {
  durationInMinutes: number;
  label: string;
};

const stateDurations: Record<TimerStateKey, TimerStateDetails> = {
  work: { durationInMinutes: 25, label: "Work" },
  shortBreak: { durationInMinutes: 5, label: "Short Break" },
  longBreak: { durationInMinutes: 15, label: "Long Break" },
};

export default function useTimerState() {
  const [currentState, setCurrentState] = React.useState<TimerStateKey>("work");
  const [timerExpiry, setTimerExpiry] = React.useState<Date>(
    new Date(
      new Date().getTime() +
        stateDurations[currentState].durationInMinutes *
          MILLISECONDS_MULTIPLIER,
    ),
  );
  const [isTimerExpired, setIsTimerExpired] = React.useState<boolean>(false);
  const [play, { stop }] = useSound("/timer.mp3");
  const [totalWorkSessions, setTotalWorkSessions] = React.useState<number>(0);
  const [autoStart, setAutoStart] = React.useState<boolean>(false);

  const duration = stateDurations[currentState].durationInMinutes;

  const changeState = (type: TimerStateKey) => {
    if (isTimerExpired) {
      stop();
      setIsTimerExpired(false);
      setAutoStart(true);
    } else setAutoStart(false);

    setCurrentState(type);
    setTimerExpiry(
      new Date(
        new Date().getTime() +
          stateDurations[type].durationInMinutes * MILLISECONDS_MULTIPLIER,
      ),
    );
  };

  const playTimerSound = (type: TimerStateKey) => {
    if (type == "work") setTotalWorkSessions(totalWorkSessions + 1);
    play();
    setIsTimerExpired(true);
  };

  const updateDurations = (newDurations: Record<TimerStateKey, number>) => {
    Object.keys(newDurations).forEach((key) => {
      stateDurations[key as TimerStateKey].durationInMinutes =
        newDurations[key as TimerStateKey];
    });
    setTimerExpiry(
      new Date(
        new Date().getTime() +
          stateDurations[currentState].durationInMinutes *
            MILLISECONDS_MULTIPLIER,
      ),
    );
  };

  return {
    stateDurations,
    currentState,
    timerExpiry,
    isTimerExpired,
    totalWorkSessions,
    changeState,
    playTimerSound,
    autoStart,
    duration,
    updateDurations,
  };
}
