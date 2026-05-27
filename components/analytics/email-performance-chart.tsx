"use client";

import { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { mockEmailMetrics } from "@/lib/mock-analytics";

type Metric = "openRate" | "replyRate" | "clickRate" | "bounceRate";

const metrics: { key: Metric; label: string; color: string }[] = [
  { key: "openRate",   label: "Abertura",  color: "#818cf8" },
  { key: "replyRate",  label: "Resposta",  color: "#4ade80" },
  { key: "clickRate",  label: "Clique",    color: "#fbbf24" },
  { key: "bounceRate", label: "Bounce",    color: "#f87171" },
];

const chartData = mockEmailMetrics
  .filter((p) => p.sent > 0)
  .map((p) => ({
    date:       p.date,
    openRate:   p.delivered ? +((p.opened  / p.delivered) * 100).toFixed(1) : 0,
    replyRate:  p.delivered ? +((p.replied / p.delivered) * 100).toFixed(1) : 0,
    clickRate:  p.opened    ? +((p.clicked / p.opened)    * 100).toFixed(1) : 0,
    bounceRate: p.sent      ? +((p.bounced / p.sent)      * 100).toFixed(1) : 0,
  }));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export function EmailPerformanceChart() {
  const [active, setActive] = useState<Set<Metric>>(new Set(["openRate", "replyRate"]));

  function toggle(key: Metric) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size > 1) next.delete(key); }
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Performance de Email</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Taxas por data de envio — últimos 30 dias</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {metrics.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                active.has(key)
                  ? "border-transparent text-foreground"
                  : "border-border text-muted-foreground opacity-50"
              }`}
              style={active.has(key) ? { background: color + "22", borderColor: color + "44" } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              {metrics.map(({ key, color }) => (
                <linearGradient key={key} id={`ga-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0}   />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            {metrics.map(({ key, label, color }) =>
              active.has(key) ? (
                <Area key={key} type="monotone" dataKey={key} name={label}
                  stroke={color} strokeWidth={2} fill={`url(#ga-${key})`} dot={false} />
              ) : null
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
