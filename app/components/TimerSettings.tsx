import React from "react";
import Input from "./Input";

export default function TimerSettings({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-[9999] h-full flex items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-800/90"
    >
      <form
        action=""
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex max-w-[300px] flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400"
      >
        <label htmlFor="pomdoro-input">Pomodoro duration {"(min)"}</label>
        <Input id="pomodoro-input" defaultValue="25" />
        <div className="flex flex-row gap-4">
          <div>
            <label htmlFor="short-break-input">Short break {"(min)"}</label>
            <Input id="short-break-input" defaultValue="5" />
          </div>
          <div>
            <label htmlFor="long-break-input">Long break {"(min)"}</label>
            <Input id="long-break-input" defaultValue="15" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-700 py-2 text-center text-sm text-zinc-300 outline-none hover:bg-zinc-600 hover:text-zinc-200 focus:bg-zinc-600 focus:ring-0"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
}
