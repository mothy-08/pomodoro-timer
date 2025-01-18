import React from "react";

interface TotalWorkSessionsProps {
  totalWorkSessions: number;
}

const TotalWorkSessions: React.FC<TotalWorkSessionsProps> = ({
  totalWorkSessions,
}) => {
  return (
    <div className="text-zinc-400 bg-zinc-800 py-2 px-4 rounded-lg">
      <p>Total work sessions: {totalWorkSessions}</p>
    </div>
  );
};

export default TotalWorkSessions;
