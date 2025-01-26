"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import TimerSettings from "./components/TimerSettings";
import useTimerState from "./hooks/useTimerState";
import StateButtons from "./components/StateButtons";
import clsx from "clsx";

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
    updateDurations,
  } = useTimerState();

  const [visible, setVisible] = React.useState<string>("");

  const isTimerSettingsVisible = visible === "showTimerSettings";
  const isSuccessful = visible === "showSuccessful";

  const showSuccessful = () => {
    setVisible("showSuccessful");
    setTimeout(() => {
      setVisible("");
    }, 3000);
  };

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
        showTimerSettings={() => setVisible("showTimerSettings")}
      />

      {isTimerSettingsVisible && (
        <TimerSettings
          onClick={() => setVisible("")}
          updateDurations={updateDurations}
          showSuccessful={showSuccessful}
        />
      )}
      <div
        className={clsx(
          "absolute bottom-0 flex items-center justify-center text-green-400 gap-2 font-bold rounded-lg transition-all duration-300",
          isSuccessful
            ? "-translate-y-5 opacity-100 visible"
            : "translate-y-full opacity-0 invisibile"
        )}
      >
        <span className="material-symbols-outlined">check_circle</span>
        Settings updated successfully!
      </div>
    </main>
  );
}
