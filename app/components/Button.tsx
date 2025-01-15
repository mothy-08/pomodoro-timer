"use client";

import clsx from "clsx";

export default function Button({
  title,
  isActive,
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
        "py-1 px-3 text-clr-btn rounded-md hover:bg-bg-btn-hover hover:text-clr-btn-hover transition-all",
        isActive ? "bg-bg-btn-hover text-clr-btn-hover" : "",
        buttonStyle
      )}
    >
      {title}
    </button>
  );
}
