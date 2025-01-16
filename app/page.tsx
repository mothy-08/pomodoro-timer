"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import useSound from "use-sound";

export default function Home() {
  const [activeState, setactiveState] = React.useState<string>("Work");
  const [expiryTimestamp, setExpiryTimestamp] = React.useState<Date>(
    new Date(new Date().getTime() + 1500 * 1000)
  );
  const [isExpired, setIsExpired] = React.useState<boolean>(false);

  const handleButtonClick = (type: string, duration: number) => {
    setactiveState(type);
    setExpiryTimestamp(new Date(new Date().getTime() + duration * 1000));
  };

  const duration = Math.ceil(
    (expiryTimestamp.getTime() - new Date().getTime()) / 1000
  );

  const [play, { stop }] = useSound("/timer.mp3");

  const onExpire = () => {
    play();
    setIsExpired(true);
  };

  const resetTimer = (type: string, duration: number) => {
    stop();
    setIsExpired(false);
    handleButtonClick(type, duration);
  };

  const onRestartFocus = () => {
    resetTimer("Work", 1500);
  };

  const changeActiveState = (type: string, duration: number) => {
    resetTimer(type, duration);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-6">
      <div className="flex gap-1500">
        <Button
          title="Work"
          isActive={activeState === "Work"}
          onClick={() => handleButtonClick("Work", 1500)}
        />
        <Button
          title="Short Break"
          isActive={activeState === "Short Break"}
          onClick={() => handleButtonClick("Short Break", 300)}
        />
        <Button
          title="Long Break"
          isActive={activeState === "Long Break"}
          onClick={() => handleButtonClick("Long Break", 900)}
        />
      </div>

      <Timer
        expiryTimestamp={expiryTimestamp}
        onExpire={onExpire}
        isExpired={isExpired}
        duration={duration}
        activeState={activeState}
        onRestartFocus={onRestartFocus}
        changeToShortBreak={() => changeActiveState("Short Break", 300)}
        changeToLongBreak={() => changeActiveState("Long Break", 900)}
      />
    </main>
  );
}
