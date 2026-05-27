"use client";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface SparklineChartProps {
  data: number[];
  trend: "up" | "down" | "neutral";
}

export function SparklineChart({ data, trend }: SparklineChartProps) {
  const color = trend === "up" ? "#4ade80" : trend === "down" ? "#f87171" : "#818cf8";
  const chartData = data.map((v) => ({ v }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
        <defs>
          <linearGradient id={`sg-${trend}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0}   />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sg-${trend})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
