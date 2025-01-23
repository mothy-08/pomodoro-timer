import React from "react";

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
        <p>Pomodoro duration {"(min)"}</p>
        <input
          placeholder="Duration in minutes"
          type="text"
          className="mb-3 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none"
          defaultValue="1"
        ></input>
        <div className="flex flex-row gap-4">
          <div>
            <p className="mb-2">Long break (min)</p>
            <input
              placeholder="Minutes"
              type="text"
              className="mb-3 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none"
              defaultValue="5"
            ></input>
          </div>
          <div>
            <p className="mb-2">Long break (min)</p>
            <input
              placeholder="Minutes"
              type="text"
              className="mb-5 w-full rounded-md border-none bg-zinc-800 p-2 text-left font-normal placeholder-zinc-600 outline-none"
              defaultValue="15"
            ></input>
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
