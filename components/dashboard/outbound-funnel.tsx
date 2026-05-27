"use client";

import { mockFunnel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function OutboundFunnel() {
  const max = mockFunnel[0]?.count ?? 1;

  return (
    <div className="glass-card rounded-xl p-5 flex flex-col">
      <div className="mb-5">
        <h3 className="text-[13px] font-semibold text-foreground">Funil Outbound</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">Conversão acumulada — todos os envios</p>
      </div>

      <div className="flex-1 space-y-2">
        {mockFunnel.map((step, i) => {
          const barWidth = (step.count / max) * 100;
          const dropPct  = i > 0
            ? (((mockFunnel[i - 1]!.count - step.count) / mockFunnel[i - 1]!.count) * 100).toFixed(0)
            : null;

          return (
            <div key={step.label}>
              {dropPct && (
                <div className="flex items-center gap-2 my-1 px-1">
                  <div className="h-px flex-1 bg-border/40" />
                  <span className="text-[9px] font-semibold text-muted-foreground/50 tabular-nums">↓ {dropPct}%</span>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-muted-foreground w-[88px] shrink-0 truncate opacity-80">
                  {step.label}
                </span>

                <div className="flex-1 h-[22px] bg-white/[0.035] rounded-md overflow-hidden relative group cursor-default">
                  <div
                    className="h-full rounded-md transition-all duration-700 ease-out"
                    style={{
                      width: `${barWidth}%`,
                      background: step.color,
                      opacity: 0.75,
                    }}
                  />
                  {/* Shimmer on hover */}
                  <div
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)` }}
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0 w-[76px] justify-end">
                  <span className="text-[12px] font-bold text-foreground tabular-nums">{step.count.toLocaleString()}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white/[0.05] text-muted-foreground tabular-nums">
                    {step.pct}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
