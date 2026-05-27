"use client";

import {
  ResponsiveContainer, ComposedChart, Bar, Line, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { mockFinancePoints } from "@/lib/mock-financeiro";

const fmt = (v: number) => `R$ ${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1.5">
      <p className="font-semibold text-foreground mb-1">
        {label} {label.includes("*") && <span className="text-[10px] text-muted-foreground font-normal">(projeção)</span>}
      </p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueTrend() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Receita · Custo · Lucro</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">2026 YTD + projeção (meses com *)</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground shrink-0">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-primary/50 inline-block" />Receita</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-red-500/40 inline-block" />Custo</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-400 inline-block" />Lucro</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-amber-400 inline-block border-dashed" />Meta</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockFinancePoints} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="glu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
            <Bar dataKey="receita" name="Receita" fill="rgba(129,140,248,0.4)" radius={[3,3,0,0]} />
            <Bar dataKey="custo"   name="Custo"   fill="rgba(248,113,113,0.35)" radius={[3,3,0,0]} />
            <Area dataKey="lucro"  name="Lucro"   stroke="#4ade80" strokeWidth={2} fill="url(#glu)" dot={false} />
            <Line dataKey="meta"   name="Meta"    stroke="#fbbf24" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
