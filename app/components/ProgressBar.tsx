import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export default function ProgressBar({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  return (
    <CircularProgressbar
      value={percentage}
      strokeWidth={4}
      styles={{
        path: {
          stroke: color,
        },
        trail: {
          stroke: "rgb(39, 39, 42)",
        },
      }}
    />
  );
}
