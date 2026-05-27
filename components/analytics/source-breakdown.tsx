"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockSources } from "@/lib/mock-analytics";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground mt-0.5">{d.leads} leads — {d.pct}%</p>
    </div>
  );
};

export function SourceBreakdown() {
  const total = mockSources.reduce((s, x) => s + x.leads, 0);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Origem dos Leads</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">{total} leads — todas as fontes</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mockSources} dataKey="leads" cx="50%" cy="50%"
                innerRadius={34} outerRadius={52} paddingAngle={3} strokeWidth={0}>
                {mockSources.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-foreground">{total}</span>
            <span className="text-[9px] text-muted-foreground">leads</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {mockSources.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-[11px] text-muted-foreground flex-1 truncate">{s.name}</span>
              <span className="text-[11px] font-semibold text-foreground">{s.leads}</span>
              <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
              <span className="text-[10px] text-muted-foreground w-6 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
