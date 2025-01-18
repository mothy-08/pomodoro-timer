"use client";

import clsx from "clsx";

export default function Button({
  title,
  isActive = true,
  onClick,
  buttonStyle,
}: {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  buttonStyle?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-md px-3 py-2 transition-colors",
        isActive
          ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
          : "text-zinc-700 hover:bg-zinc-800 hover:text-zinc-400",
        buttonStyle
      )}
    >
      {title}
    </button>
  );
}
