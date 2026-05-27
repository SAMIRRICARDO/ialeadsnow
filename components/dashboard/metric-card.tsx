"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SparklineChart } from "./sparkline-chart";
import type { MetricCard as MetricCardType } from "@/types";

export function MetricCard({ title, value, delta, deltaLabel, trend, prefix, suffix, sparkline }: MetricCardType) {
  const isUp   = trend === "up";
  const isDown = trend === "down";
  const isFlat = !isUp && !isDown;

  return (
    <div className={cn(
      "glass-card rounded-xl p-4 flex flex-col gap-3 group cursor-default",
      "hover:border-white/10 hover:bg-white/[0.032] transition-all duration-200",
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] leading-none mt-0.5">
          {title}
        </p>
        <span className={cn(
          "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-[3px] rounded-full leading-none shrink-0",
          isUp   && "bg-emerald-500/12 text-emerald-400",
          isDown && "bg-red-500/12 text-red-400",
          isFlat && "bg-white/6 text-muted-foreground",
        )}>
          {isUp   && <TrendingUp   className="w-2.5 h-2.5" />}
          {isDown && <TrendingDown className="w-2.5 h-2.5" />}
          {isFlat && <Minus        className="w-2.5 h-2.5" />}
          {Math.abs(delta)}%
        </span>
      </div>

      {/* Value + sparkline */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="kpi-number text-foreground">
            {prefix && <span className="text-lg font-semibold text-muted-foreground mr-0.5">{prefix}</span>}
            {value}
            {suffix && <span className="text-lg font-semibold text-muted-foreground ml-0.5">{suffix}</span>}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5 opacity-70">{deltaLabel}</p>
        </div>
        {sparkline && (
          <div className="w-20 h-9 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <SparklineChart data={sparkline} trend={trend} />
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="h-[2px] rounded-full overflow-hidden bg-white/[0.04]">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            isUp   && "bg-emerald-500/50",
            isDown && "bg-red-500/50",
            isFlat && "bg-primary/30",
          )}
          style={{ width: `${Math.min(Math.abs(delta) * 4, 100)}%` }}
        />
      </div>
    </div>
  );
}
