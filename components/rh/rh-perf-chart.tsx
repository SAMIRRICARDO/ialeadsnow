"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { mockPerfHistory } from "@/lib/mock-rh";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function RhPerfChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">Performance do Time</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Score médio vs meta mensal</p>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockPerfHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis domain={[78, 95]} tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line dataKey="avg"    name="Média"  stroke="#818cf8" strokeWidth={2.5} dot={{ fill: "#818cf8", r: 4 }} />
            <Line dataKey="target" name="Meta"   stroke="#fbbf24" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border/40">
        {[
          { label: "Melhor score", value: "97", color: "text-emerald-400" },
          { label: "Média atual",  value: "91", color: "text-primary"     },
          { label: "NPS interno",  value: "72", color: "text-amber-400"   },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
