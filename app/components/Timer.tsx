import React from "react";
import { useTimer } from "react-timer-hook";
import Button from "./Button";
import clsx from "clsx";

export default function Timer({
  expiryTimestamp,
  autoStart = false,
  duration,
}: {
  expiryTimestamp: Date;
  autoStart?: boolean;
  duration: number;
}) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart,
      onExpire: () => console.warn("onExpire called"),
    });

  const formatTime = (time: number) => String(time).padStart(2, "0");
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  const buttonStyle =
    "py-2 px-4 bg-bg-btn text-clr-btn hover:bg-bg-btn-hover hover:clr-btn-hover rounded-lg";

  function handlePause() {
    setIsPaused(true);
    pause();
  }

  React.useEffect(() => {
    restart(expiryTimestamp, false);
  }, [expiryTimestamp, restart]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-8xl font-bold space-x-4">
        <span>{formatTime(minutes)}</span>
        <span>:</span>
        <span>{formatTime(seconds)}</span>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Button
          title="Start"
          onClick={start}
          buttonStyle={clsx(buttonStyle, isRunning || isPaused ? "hidden" : "")}
        />
        <Button
          title="Pause"
          onClick={handlePause}
          buttonStyle={clsx(buttonStyle, isRunning ? "block" : "hidden")}
        />
        <Button
          title="Resume"
          onClick={resume}
          buttonStyle={clsx(
            buttonStyle,
            !isRunning && isPaused ? "block" : "hidden"
          )}
        />
        <Button
          title="Reset"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + duration);
            restart(time, false);

            if (isPaused) setIsPaused(false);
          }}
          buttonStyle={clsx(
            buttonStyle,
            isRunning || isPaused ? "block" : "hidden"
          )}
        />
      </div>
    </div>
  );
}
