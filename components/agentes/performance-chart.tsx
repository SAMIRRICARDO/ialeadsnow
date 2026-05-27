"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { mockPerfHistory } from "@/lib/mock-agents";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">
            {p.dataKey === "successRate" ? `${p.value}%` :
             p.dataKey === "latencyMs"   ? `${p.value}ms` :
             p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function PerformanceChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Performance dos Agentes</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Taxa de sucesso e latência — hoje</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 rounded bg-primary inline-block" />Sucesso</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 rounded bg-amber-400 inline-block" />Latência</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-white/10 inline-block" />Tasks</span>
        </div>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockPerfHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gsr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left"  tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} domain={[80, 100]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar     yAxisId="right" dataKey="tasks"       name="Tasks"   fill="rgba(255,255,255,0.06)" radius={[2,2,0,0]} />
            <Area    yAxisId="left"  dataKey="successRate" name="Sucesso" stroke="#818cf8" strokeWidth={2} fill="url(#gsr)" dot={false} />
            <Line    yAxisId="right" dataKey="latencyMs"   name="Latência" stroke="#fbbf24" strokeWidth={1.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
