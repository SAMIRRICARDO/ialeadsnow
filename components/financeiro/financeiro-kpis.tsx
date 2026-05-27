import { mockFinancePoints, mockInvoices } from "@/lib/mock-financeiro";
import { DollarSign, TrendingUp, TrendingDown, PieChart, Clock, AlertCircle } from "lucide-react";

export function FinanceiroKpis() {
  const real     = mockFinancePoints.filter((p) => !p.month.includes("*"));
  const ytdRec   = real.reduce((s, p) => s + p.receita, 0);
  const ytdCusto = real.reduce((s, p) => s + p.custo, 0);
  const ytdLucro = real.reduce((s, p) => s + p.lucro, 0);
  const margin   = ytdRec ? ((ytdLucro / ytdRec) * 100).toFixed(0) : "0";
  const mrr      = 2400;
  const arr      = mrr * 12;

  const atrasado = mockInvoices.filter((i) => i.status === "atrasado").reduce((s, i) => s + i.value, 0);
  const pendente = mockInvoices.filter((i) => i.status === "pendente").reduce((s, i) => s + i.value, 0);

  const fmt = (v: number) => v >= 1000 ? `R$ ${(v / 1000).toFixed(0)}K` : `R$ ${v}`;

  const kpis = [
    { icon: DollarSign,  label: "Receita YTD",     value: fmt(ytdRec),  sub: "Jan–Mai 2026",       color: "text-primary",     bg: "bg-primary/10",     delta: "+110% vs 2025", up: true  },
    { icon: TrendingUp,  label: "Lucro Líquido",    value: fmt(ytdLucro),sub: `margem ${margin}%`,  color: "text-emerald-400", bg: "bg-emerald-500/10", delta: `${margin}% margem`, up: true  },
    { icon: TrendingDown,label: "Custos Totais",    value: fmt(ytdCusto),sub: "operacional YTD",    color: "text-amber-400",   bg: "bg-amber-500/10",   delta: "+8% vs mês ant.", up: false },
    { icon: PieChart,    label: "MRR (SaaS)",       value: fmt(mrr),     sub: `ARR ${fmt(arr)}`,    color: "text-violet-400",  bg: "bg-violet-500/10",  delta: "+120% vs jan",   up: true  },
    { icon: Clock,       label: "A Receber",        value: fmt(pendente),sub: "vence em 30d",       color: "text-blue-400",    bg: "bg-blue-500/10",    delta: "2 faturas",      up: true  },
    { icon: AlertCircle, label: "Em Atraso",        value: fmt(atrasado),sub: "requer atenção",     color: "text-red-400",     bg: "bg-red-500/10",     delta: "1 fatura",       up: false },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map(({ icon: Icon, label, value, sub, color, bg, delta, up }) => (
        <div key={label} className="glass-card rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            }`}>{delta}</span>
          </div>
          <div>
            <p className={`text-xl font-bold leading-tight ${color}`}>{value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            <p className="text-[11px] text-muted-foreground/70 mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
