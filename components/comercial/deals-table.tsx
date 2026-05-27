import { mockDeals, stageConfig } from "@/lib/mock-comercial";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return `${Math.floor(diff / 60000)}m`;
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function probColor(p: number) {
  if (p === 100) return "text-emerald-400";
  if (p >= 60)   return "text-primary";
  if (p >= 30)   return "text-amber-400";
  if (p === 0)   return "text-red-400";
  return "text-muted-foreground";
}

const avatarPalette = [
  "from-indigo-500/40 to-blue-600/40",
  "from-violet-500/40 to-purple-600/40",
  "from-cyan-500/40 to-teal-600/40",
  "from-rose-500/40 to-pink-600/40",
];

export function DealsTable() {
  const sorted = [...mockDeals].sort((a, b) => b.value - a.value);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Todos os Deals</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
            {mockDeals.length} negócios · ordenados por valor
          </p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
          Exportar CSV <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              {["Empresa", "Contato", "Valor", "Prob.", "Score", "Stage", "Tags", "Atualizado"].map((h) => (
                <th key={h}
                  className="px-4 py-2.5 text-left data-table-header whitespace-nowrap first:pl-5 last:pr-5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((deal, idx) => {
              const cfg        = stageConfig[deal.stage];
              const scoreColor = deal.score >= 90 ? "#4ade80" : deal.score >= 75 ? "#818cf8" : "#fbbf24";
              const scoreText  = deal.score >= 90 ? "text-emerald-400" : deal.score >= 75 ? "text-primary" : "text-amber-400";
              return (
                <tr key={deal.id}
                  className="table-row-hover border-b border-border/25 last:border-0 group cursor-pointer">
                  <td className="px-4 pl-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0",
                        avatarPalette[idx % avatarPalette.length]
                      )}>
                        <span className="text-[9px] font-bold text-white/90">{deal.company.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <span className="text-[12px] font-semibold text-foreground whitespace-nowrap">{deal.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[12px] text-foreground whitespace-nowrap font-medium">{deal.contactName}</p>
                    <p className="text-[10px] text-muted-foreground opacity-70 mt-0.5">{deal.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-bold text-foreground whitespace-nowrap tabular-nums">
                      R$ {(deal.value / 1000).toFixed(0)}K
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[12px] font-bold tabular-nums", probColor(deal.probability))}>
                      {deal.probability}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${deal.score}%`, background: scoreColor }} />
                      </div>
                      <span className={cn("text-[11px] font-bold tabular-nums", scoreText)}>{deal.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-md border whitespace-nowrap leading-none",
                      cfg.color, cfg.bg, cfg.border
                    )}>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {deal.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-muted-foreground whitespace-nowrap font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 pr-5 py-3">
                    <span className="text-[11px] text-muted-foreground opacity-60 whitespace-nowrap tabular-nums">
                      {timeAgo(deal.updatedAt)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
