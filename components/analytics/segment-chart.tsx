"use client";

import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";
import { mockSegments } from "@/lib/mock-analytics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-muted-foreground">Leads:</span><span className="font-medium text-foreground">{d?.leads}</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-muted-foreground">Contatados:</span><span className="font-medium text-foreground">{d?.contacted}</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-muted-foreground">Responderam:</span><span className="font-medium text-foreground">{d?.replied}</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-muted-foreground">Score médio:</span><span className="font-medium text-foreground">{d?.avgScore}</span></div>
    </div>
  );
};

export function SegmentChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Leads por Segmento</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Volume e conversão por vertical</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-primary/50 inline-block" />Total</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-emerald-500/50 inline-block" />Resp.</span>
        </div>
      </div>

      {/* Horizontal bars — manual render for better control */}
      <div className="space-y-3">
        {mockSegments.map((seg) => {
          const maxLeads   = Math.max(...mockSegments.map((s) => s.leads));
          const replyPct   = ((seg.replied / seg.contacted) * 100).toFixed(0);
          const scoreColor = seg.avgScore >= 85 ? "#4ade80" : seg.avgScore >= 78 ? "#818cf8" : "#fbbf24";

          return (
            <div key={seg.segment}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{seg.segment}</span>
                <div className="flex items-center gap-3 text-[10px] shrink-0">
                  <span className="text-muted-foreground">{seg.leads} leads</span>
                  <span className="text-emerald-400 font-medium">{replyPct}% resp.</span>
                  <span className="font-semibold" style={{ color: scoreColor }}>{seg.avgScore}</span>
                </div>
              </div>
              {/* Stacked bar */}
              <div className="relative h-3 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary/40"
                  style={{ width: `${(seg.leads / maxLeads) * 100}%` }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-emerald-500/70"
                  style={{ width: `${(seg.replied / maxLeads) * 100}%` }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-amber-400/80"
                  style={{ width: `${(seg.qualified / maxLeads) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/40 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-primary/40 inline-block" />Total leads</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-emerald-500/70 inline-block" />Responderam</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-amber-400/80 inline-block" />Qualificados</span>
      </div>
    </div>
  );
}
