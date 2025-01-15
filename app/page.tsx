"use client";

import React from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";

export default function Home() {
  const [activeButton, setActiveButton] = React.useState<string | null>("Work");
  const [expiryTimestamp, setExpiryTimestamp] = React.useState<Date>(
    new Date(new Date().getTime() + 1500 * 1000)
  );

  const handleButtonClick = (type: string, seconds: number) => {
    setActiveButton(type);
    setExpiryTimestamp(new Date(new Date().getTime() + seconds * 1000));
  };

  const duration = Math.ceil(
    (expiryTimestamp.getTime() - new Date().getTime()) / 1000
  );

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-6">
      <div className="flex gap-2">
        <Button
          title="Work"
          isActive={activeButton === "Work"}
          onClick={() => handleButtonClick("Work", 1500)}
        />
        <Button
          title="Short Break"
          isActive={activeButton === "Short Break"}
          onClick={() => handleButtonClick("Short Break", 300)}
        />
        <Button
          title="Long Break"
          isActive={activeButton === "Long Break"}
          onClick={() => handleButtonClick("Long Break", 900)}
        />
      </div>

      <Timer expiryTimestamp={expiryTimestamp} duration={duration} />
    </main>
  );
}
