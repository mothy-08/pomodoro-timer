"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import useSound from "use-sound";

type StateKey = "work" | "shortBreak" | "longBreak";

type StateDetails = {
  duration: number;
  label: string;
};

const states: Record<StateKey, StateDetails> = {
  work: { duration: 5, label: "Work" },
  shortBreak: { duration: 5, label: "Short Break" },
  longBreak: { duration: 5, label: "Long Break" },
};

export default function Home() {
  const [activeState, setactiveState] = React.useState<StateKey>("work");
  const [expiryTimestamp, setExpiryTimestamp] = React.useState<Date>(
    new Date(new Date().getTime() + states[activeState].duration * 1000)
  );
  const [isExpired, setIsExpired] = React.useState<boolean>(false);
  const [play, { stop }] = useSound("/timer.mp3");

  const handleButtonClick = (type: StateKey) => {
    if (isExpired === true) {
      stop();
      setIsExpired(false);
    }
    setactiveState(type);
    setExpiryTimestamp(
      new Date(new Date().getTime() + states[type].duration * 1000)
    );
  };

  const duration = Math.ceil(
    (expiryTimestamp.getTime() - new Date().getTime()) / 1000
  );

  const onExpire = () => {
    play();
    setIsExpired(true);
  };

  const resetTimer = (type: StateKey) => {
    stop();
    setIsExpired(false);
    handleButtonClick(type);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-6">
      <div className="flex gap-timeInSeconds.work">
        {Object.keys(states).map((key) => (
          <Button
            key={key}
            title={states[key as StateKey].label}
            isActive={activeState === key}
            onClick={() => handleButtonClick(key as StateKey)}
          />
        ))}
      </div>

      <Timer
        expiryTimestamp={expiryTimestamp}
        onExpire={onExpire}
        isExpired={isExpired}
        duration={duration}
        activeState={activeState}
        onRestartFocus={() => resetTimer("work")}
        onRestartShortBreak={() => resetTimer("shortBreak")}
        onRestartLongBreak={() => resetTimer("longBreak")}
      />
    </main>
  );
}
