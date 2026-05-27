"use client";

import {
  ResponsiveContainer, ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { mockRevenue } from "@/lib/mock-comercial";

const fmt = (v: number) => `R$ ${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Pipeline vs Receita</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Evolução mensal — 2026</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2 rounded bg-primary/50 inline-block" />Pipeline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2 rounded bg-emerald-500/60 inline-block" />Ganho
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-amber-400 inline-block" />Meta
          </span>
        </div>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockRevenue} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pipeline" name="Pipeline" fill="rgba(129,140,248,0.35)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="ganho"    name="Ganho"    fill="rgba(74,222,128,0.5)"   radius={[3, 3, 0, 0]} />
            <Line dataKey="meta"    name="Meta"     stroke="#fbbf24" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
