import React from "react";
import Input from "./Input";
import { TimerStateKey } from "../hooks/useTimerState";
import Button from "./Button";

export default function TimerSettings({
  onClick,
  updateDurations,
}: {
  onClick: () => void;
  updateDurations: (newDurations: Record<TimerStateKey, number>) => void;
}) {
  const [values, setValues] = React.useState({
    work: "25",
    shortBreak: "5",
    longBreak: "15",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const isInvalidValue = Number(value) > 59;
    const errorStyles = ["outline-red-500", "text-red-500"];

    if (isInvalidValue) {
      event.target.classList.add(...errorStyles);
    } else {
      event.target.classList.remove(...errorStyles);
    }
  };

  const hasInvalidValue = Object.values(values).some(
    (value) => Number(value) > 59
  );

  const configureTimer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateDurations({
      work: parseInt(values.work),
      shortBreak: parseInt(values.shortBreak),
      longBreak: parseInt(values.longBreak),
    });
    onClick();
  };

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-[9999] h-full flex items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-800/90"
    >
      <form
        action=""
        onClick={(event) => event.stopPropagation()}
        onSubmit={configureTimer}
        className="mx-auto flex max-w-[300px] flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400 gap-3"
      >
        <div>
          <Input
            name="work"
            id="work-input"
            htmlFor="work-input"
            labelTitle="Work duration (min)"
            value={values.work}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <Input
              name="shortBreak"
              id="short-break-input"
              htmlFor="short-break-input"
              labelTitle="Short break (min)"
              value={values.shortBreak}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              name="longBreak"
              id="long-break-input"
              htmlFor="long-break-input"
              labelTitle="Long break (min)"
              value={values.longBreak}
              onChange={handleChange}
            />
          </div>
        </div>

        {hasInvalidValue && (
          <p className="text-red-500 -mb-2">Values cannot exceed 59 minutes.</p>
        )}

        <Button
          type="submit"
          title="Update Setings"
          className="w-full mt-1 disabled:opacity-50 disabled:pointer-events-none"
          disabled={hasInvalidValue}
        />
      </form>
    </div>
  );
}
