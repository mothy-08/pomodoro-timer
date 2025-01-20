import React from "react";

interface TotalWorkSessionsProps {
  totalWorkSessions: number;
}

export default function TotalWorkSessions({
  totalWorkSessions,
}: TotalWorkSessionsProps) {
  return (
    <div className="text-zinc-400 bg-zinc-800 py-2 px-4 rounded-lg">
      <p>Total work sessions: {totalWorkSessions}</p>
    </div>
  );
}
