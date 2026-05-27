"use client";

import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { mockForecast } from "@/lib/mock-financeiro";

const fmt = (v: number) => `R$ ${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground mb-1">{label} 2026</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-semibold text-foreground">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const last = mockForecast[mockForecast.length - 1];

export function ForecastCard() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Forecast H2 2026</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Cenários pessimista · realista · otimista</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-muted-foreground">Realista Nov</p>
          <p className="text-lg font-bold text-primary">{fmt(last?.realista ?? 0)}</p>
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockForecast} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gopt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="greal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="gpess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f87171" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0}  />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="otimista"    name="Otimista"    stroke="#4ade80" strokeWidth={1.5} fill="url(#gopt)"  dot={false} strokeDasharray="4 2" />
            <Area type="monotone" dataKey="realista"    name="Realista"    stroke="#818cf8" strokeWidth={2.5} fill="url(#greal)" dot={{ fill: "#818cf8", r: 3 }} />
            <Area type="monotone" dataKey="pessimista"  name="Pessimista"  stroke="#f87171" strokeWidth={1.5} fill="url(#gpess)" dot={false} strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-0 mt-3 pt-3 border-t border-border/40">
        {[
          { label: "Pessimista Nov", value: fmt(last?.pessimista ?? 0), color: "text-red-400" },
          { label: "Realista Nov",   value: fmt(last?.realista   ?? 0), color: "text-primary" },
          { label: "Otimista Nov",   value: fmt(last?.otimista   ?? 0), color: "text-emerald-400" },
        ].map(({ label, value, color }, i) => (
          <div key={label} className={`flex-1 text-center ${i > 0 ? "border-l border-border/40" : ""}`}>
            <p className="text-[10px] text-muted-foreground">{label}</p>
            <p className={`text-sm font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
