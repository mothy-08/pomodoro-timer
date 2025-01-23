import React from "react";

export default function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const checkTimerInputInMinutes = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowedKeys = [
      "Backspace",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "Tab",
    ];
    if (isNaN(Number(event.key)) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <input
      {...rest}
      placeholder="Duration in min"
      type="text"
      className="mb-3 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none"
      autoComplete="off"
      onKeyDown={checkTimerInputInMinutes}
      required
    ></input>
  );
}
