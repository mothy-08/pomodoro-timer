"use client";

import React from "react";
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
    <main className="flex h-screen flex-col items-center justify-center gap-6">
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
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Escape") {
              setVisible("");
            }
          }}
          updateDurations={updateDurations}
          showSuccessful={showSuccessful}
        />
      )}
      <div
        className={clsx(
          "absolute bottom-5 flex items-center justify-center gap-1 rounded-lg font-bold text-[#93f5ca] transition-all duration-300",
          isSuccessful
            ? "visible -translate-y-0 opacity-100"
            : "invisibile translate-y-full opacity-0",
        )}
      >
        <span className="material-symbols-outlined">check_circle</span>
        Settings updated successfully!
      </div>
    </main>
  );
}
