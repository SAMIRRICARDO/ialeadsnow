"use client";

import {
  ResponsiveContainer, ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { mockCashflow } from "@/lib/mock-financeiro";

const fmt = (v: number) => `R$ ${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2.5 text-xs shadow-xl space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color ?? p.stroke }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function CashflowChart() {
  const lastSaldo = mockCashflow[mockCashflow.length - 1]?.saldo ?? 0;

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Fluxo de Caixa</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Entradas vs saídas · Saldo acumulado:{" "}
            <span className="text-emerald-400 font-semibold">{fmt(lastSaldo)}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground shrink-0">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-emerald-500/40 inline-block" />Entradas</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded bg-red-500/40 inline-block" />Saídas</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-blue-400 inline-block" />Saldo</span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockCashflow} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10, fill: "#6b6b80" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
            <Bar dataKey="entradas" name="Entradas" fill="rgba(74,222,128,0.4)"  radius={[3,3,0,0]} />
            <Bar dataKey="saidas"   name="Saídas"   fill="rgba(248,113,113,0.35)" radius={[3,3,0,0]} />
            <Line dataKey="saldo"   name="Saldo"    stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
