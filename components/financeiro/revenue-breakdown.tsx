"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockRevenueCategories } from "@/lib/mock-financeiro";
import { TrendingUp, TrendingDown } from "lucide-react";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">R$ {(d.value / 1000).toFixed(0)}K — {d.pct}%</p>
    </div>
  );
};

export function RevenueBreakdown() {
  const total = mockRevenueCategories.reduce((s, c) => s + c.value, 0);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Receita por Categoria</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Total YTD: <span className="text-foreground font-semibold">R$ {(total / 1000).toFixed(0)}K</span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Donut */}
        <div className="relative w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mockRevenueCategories} dataKey="value" cx="50%" cy="50%"
                innerRadius={34} outerRadius={52} paddingAngle={3} strokeWidth={0}>
                {mockRevenueCategories.map((c) => (
                  <Cell key={c.name} fill={c.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base font-bold text-foreground">
              R$ {(total / 1000).toFixed(0)}K
            </span>
            <span className="text-[9px] text-muted-foreground">YTD</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2.5">
          {mockRevenueCategories.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[11px] text-muted-foreground flex-1 truncate">{c.name}</span>
              <span className="text-[11px] font-semibold text-foreground shrink-0">
                R$ {(c.value / 1000).toFixed(0)}K
              </span>
              <span className={`text-[10px] font-medium flex items-center gap-0.5 shrink-0 ${
                c.growth >= 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {c.growth >= 0
                  ? <TrendingUp className="w-2.5 h-2.5" />
                  : <TrendingDown className="w-2.5 h-2.5" />}
                {Math.abs(c.growth)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
