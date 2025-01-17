import React from "react";
import { useTimer } from "react-timer-hook";
import Button from "./Button";
import clsx from "clsx";

export default function Timer({
  expiryTimestamp,
  autoStart = false,
  onExpire,
  duration,
  activeState,
  isExpired,
  onRestartFocus,
  onRestartShortBreak,
  onRestartLongBreak,
}: {
  expiryTimestamp: Date;
  autoStart?: boolean;
  onExpire: Function;
  duration: number;
  activeState: string;
  isExpired: boolean;
  onRestartFocus: () => void;
  onRestartShortBreak: () => void;
  onRestartLongBreak: () => void;
}) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart,
      onExpire: () => {
        console.warn("onExpire called");
        onExpire();
      },
    });

  const formatTime = (time: number) => String(time).padStart(2, "0");
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  const buttonStyle =
    "py-2 px-4 bg-bg-btn text-clr-btn hover:bg-bg-btn-hover hover:clr-btn-hover rounded-lg";

  const handlePause = () => {
    setIsPaused(true);
    pause();
  };

  const handleResume = () => {
    setIsPaused(false);
    resume();
  };

  const handleReset = (duration: number) => {
    const time = new Date(new Date().getTime() + duration * 1000);
    restart(time, false);
    if (isPaused) setIsPaused(false);
  };

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
          buttonStyle={clsx(
            buttonStyle,
            isRunning || isPaused ? "hidden" : "",
            isExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Pause"
          onClick={handlePause}
          buttonStyle={clsx(
            buttonStyle,
            isRunning ? "block" : "hidden",
            isExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Resume"
          onClick={handleResume}
          buttonStyle={clsx(
            buttonStyle,
            !isRunning && isPaused ? "block" : "hidden",
            isExpired ? "hidden" : ""
          )}
        />
        <Button
          title="Reset"
          onClick={() => handleReset(duration)}
          buttonStyle={clsx(
            buttonStyle,
            isRunning || isPaused ? "block" : "hidden",
            isExpired ? "hidden" : ""
          )}
        />

        {activeState === "work" ? (
          <>
            <Button
              title="Restart Focus"
              onClick={onRestartFocus}
              buttonStyle={clsx(
                buttonStyle,
                !isRunning && isExpired ? "block" : "hidden"
              )}
            />
            <Button
              title="Short"
              onClick={onRestartShortBreak}
              buttonStyle={clsx(buttonStyle, !isExpired ? "hidden" : "block")}
            />
            <Button
              title="Long"
              onClick={onRestartLongBreak}
              buttonStyle={clsx(buttonStyle, !isExpired ? "hidden" : "block")}
            />
          </>
        ) : activeState === "shortBreak" ? (
          <>
            <Button
              title="Start Focus"
              onClick={onRestartFocus}
              buttonStyle={clsx(
                buttonStyle,
                !isRunning && isExpired ? "block" : "hidden"
              )}
            />
            <Button
              title="Another short break"
              onClick={onRestartShortBreak}
              buttonStyle={clsx(buttonStyle, !isExpired ? "hidden" : "block")}
            />
          </>
        ) : activeState === "longBreak" ? (
          <>
            <Button
              title="Start Focus"
              onClick={onRestartFocus}
              buttonStyle={clsx(
                buttonStyle,
                !isRunning && isExpired ? "block" : "hidden"
              )}
            />
            <Button
              title="Another long break"
              onClick={onRestartLongBreak}
              buttonStyle={clsx(buttonStyle, !isExpired ? "hidden" : "block")}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
