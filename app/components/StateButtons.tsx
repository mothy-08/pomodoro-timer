import React from "react";
import Button from "./Button";
import { TimerStateKey } from "../hooks/useTimerState";

interface StateButtonsProps {
  stateDurations: Record<string, { label: string }>;
  currentState: string;
  changeState: (key: TimerStateKey) => void;
}

export default function StateButtons({
  stateDurations,
  currentState,
  changeState,
}: StateButtonsProps) {
  return (
    <div className="flex gap-2">
      {Object.keys(stateDurations).map((key) => (
        <Button
          key={key}
          title={stateDurations[key as TimerStateKey].label}
          isActive={currentState === key}
          onClick={() => changeState(key as TimerStateKey)}
        />
      ))}
    </div>
  );
}
