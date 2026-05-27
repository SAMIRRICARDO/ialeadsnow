"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { mockChartData } from "@/lib/mock-data";
import { useState } from "react";

const RANGES = ["7d", "30d", "90d"] as const;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12121f] border border-white/10 rounded-xl px-3.5 py-3 text-xs shadow-2xl space-y-1.5"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
      <p className="font-bold text-foreground mb-2 text-[11px]">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color ?? p.stroke }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-bold text-foreground tabular-nums">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function LeadChart() {
  const [range, setRange] = useState<typeof RANGES[number]>("30d");

  const series = [
    { key: "leads",   name: "Leads",    color: "#818cf8", fill: "url(#gl)" },
    { key: "emails",  name: "Emails",   color: "#4ade80", fill: "url(#ge)" },
    { key: "replies", name: "Replies",  color: "#fbbf24", fill: "none"     },
  ];

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Pipeline de Leads</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">Leads captados, emails enviados e respostas</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 mr-2">
            {series.map((s) => (
              <span key={s.key} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="w-2.5 h-[2px] rounded-full inline-block" style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
          {/* Range selector */}
          <div className="flex items-center gap-px p-0.5 rounded-lg border border-border/60 bg-white/[0.025]">
            {RANGES.map((r) => (
              <button key={r}
                onClick={() => setRange(r)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${
                  range === r
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.035)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#55556a" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#55556a" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="leads"   name="Leads"   stroke="#818cf8" strokeWidth={2}   fill="url(#gl)" dot={false} activeDot={{ r: 4, fill: "#818cf8", strokeWidth: 0 }} />
            <Area type="monotone" dataKey="emails"  name="Emails"  stroke="#4ade80" strokeWidth={2}   fill="url(#ge)" dot={false} activeDot={{ r: 4, fill: "#4ade80", strokeWidth: 0 }} />
            <Area type="monotone" dataKey="replies" name="Replies" stroke="#fbbf24" strokeWidth={1.5} fill="none"     dot={false} activeDot={{ r: 4, fill: "#fbbf24", strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
