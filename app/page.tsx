"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import TimerSettings from "./components/TimerSettings";
import useTimerState from "./hooks/useTimerState";
import StateButtons from "./components/StateButtons";
import TotalWorkSessions from "./components/TotalWorkSessions";
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
    }, 2000);
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
      />

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <TotalWorkSessions totalWorkSessions={totalWorkSessions} />

        <Button
          title="Configure timer"
          className="rounded-lg w-full"
          onClick={() => setVisible("showTimerSettings")}
        />
      </div>

      {isTimerSettingsVisible && (
        <TimerSettings
          onClick={() => setVisible("")}
          updateDurations={updateDurations}
          showSuccessful={showSuccessful}
        />
      )}

      <div
        className={clsx(
          "w-[300px] absolute bottom-0 flex items-center justify-center bg-zinc-200 py-2 text-zinc-800 font-bold rounded-lg transition-all duration-300",
          isSuccessful
            ? "-translate-y-5 opacity-100 visible"
            : "translate-y-full opacity-0 invisibile"
        )}
      >
        Settings updated successfully!
      </div>
    </main>
  );
}
