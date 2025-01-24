import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  labelTitle: string;
}

export default function Input({
  htmlFor,
  labelTitle,
  className,
  ...rest
}: InputProps) {
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
    <>
      <label htmlFor={htmlFor} className={className}>
        {labelTitle}
      </label>
      <input
        {...rest}
        placeholder="Duration in min"
        type="text"
        className={clsx(
          "mt-1 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none",
          className
        )}
        autoComplete="off"
        onKeyDown={checkTimerInputInMinutes}
        required
      ></input>
    </>
  );
}
