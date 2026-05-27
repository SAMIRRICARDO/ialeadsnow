import { mockDeals } from "@/lib/mock-comercial";
import { TrendingUp, DollarSign, Target, Users, Calendar, Award } from "lucide-react";

export function ComercialKpis() {
  const activeDeals  = mockDeals.filter((d) => d.stage !== "perdido");
  const wonDeals     = mockDeals.filter((d) => d.stage === "ganho");
  const pipeline     = activeDeals.reduce((s, d) => s + d.value, 0);
  const wonValue     = wonDeals.reduce((s, d) => s + d.value, 0);
  const convRate     = ((wonDeals.length / mockDeals.length) * 100).toFixed(0);
  const avgDeal      = wonDeals.length ? Math.round(wonValue / wonDeals.length) : 0;
  const meetings     = mockDeals.filter((d) => d.stage === "reuniao").length;
  const proposals    = mockDeals.filter((d) => d.stage === "proposta").length;

  const kpis = [
    {
      icon: DollarSign, label: "Pipeline Total",
      value: `R$ ${(pipeline / 1000).toFixed(0)}K`,
      sub: `${activeDeals.length} deals ativos`,
      color: "text-primary", bg: "bg-primary/10",
      delta: "+R$ 272K vs mês ant.", up: true,
    },
    {
      icon: Award, label: "Receita Gerada",
      value: `R$ ${(wonValue / 1000).toFixed(0)}K`,
      sub: `${wonDeals.length} negócios ganhos`,
      color: "text-emerald-400", bg: "bg-emerald-500/10",
      delta: "+100% vs meta", up: true,
    },
    {
      icon: Target, label: "Taxa de Conversão",
      value: `${convRate}%`,
      sub: "deals ganhos / total",
      color: "text-amber-400", bg: "bg-amber-500/10",
      delta: "+4pp vs mês ant.", up: true,
    },
    {
      icon: TrendingUp, label: "Ticket Médio",
      value: `R$ ${(avgDeal / 1000).toFixed(0)}K`,
      sub: "por negócio ganho",
      color: "text-violet-400", bg: "bg-violet-500/10",
      delta: "+R$ 2K vs mês ant.", up: true,
    },
    {
      icon: Calendar, label: "Reuniões Ativas",
      value: String(meetings),
      sub: "aguardando proposta",
      color: "text-blue-400", bg: "bg-blue-500/10",
      delta: "+1 esta semana", up: true,
    },
    {
      icon: Users, label: "Propostas Enviadas",
      value: String(proposals),
      sub: "aguardando decisão",
      color: "text-pink-400", bg: "bg-pink-500/10",
      delta: "1 vence em 3d", up: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map(({ icon: Icon, label, value, sub, color, bg, delta, up }) => (
        <div key={label} className="glass-card rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              up ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
            }`}>{delta}</span>
          </div>
          <div>
            <p className={`text-2xl font-bold leading-tight ${color}`}>{value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            <p className="text-[11px] text-muted-foreground/70 mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
