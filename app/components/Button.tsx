import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

export default function Button({
  title,
  children,
  isActive = true,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "rounded-md px-3 py-2 transition-colors",
        isActive
          ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
          : "text-zinc-700 hover:bg-zinc-800 hover:text-zinc-400",
        className,
      )}
    >
      {title}
      {children}
    </button>
  );
}
