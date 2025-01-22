"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import TimerSettings from "./components/TimerSettings";
import useTimerState from "./hooks/useTimerState";
import StateButtons from "./components/StateButtons";
import TotalWorkSessions from "./components/TotalWorkSessions";

export default function Home() {
  const {
    stateDurations,
    currentState,
    timerExpiry,
    isTimerExpired,
    totalWorkSessions,
    changeState,
    playTimerSound,
    autoStart,
    duration,
  } = useTimerState();

  const [showTimerSettings, setShowTimerSettings] =
    React.useState<boolean>(false);

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-6">
      <StateButtons
        stateDurations={stateDurations}
        currentState={currentState}
        changeState={changeState}
      />

      <Timer
        timerExpiry={timerExpiry}
        playTimerSound={() => playTimerSound(currentState)}
        isTimerExpired={isTimerExpired}
        duration={duration}
        currentState={currentState}
        restartWorkTimer={() => changeState("work")}
        restartShortBreakTimer={() => changeState("shortBreak")}
        restartLongBreakTimer={() => changeState("longBreak")}
        autoStart={autoStart}
        totalWorkSessions={totalWorkSessions}
      />

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <TotalWorkSessions totalWorkSessions={totalWorkSessions} />

        <Button
          title="Configure timer"
          buttonStyle="rounded-lg w-full"
          onClick={() => setShowTimerSettings(true)}
        />
      </div>

      {showTimerSettings && <TimerSettings />}
    </main>
  );
}
