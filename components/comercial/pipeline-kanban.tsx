import { mockDeals, stageConfig } from "@/lib/mock-comercial";
import type { Deal } from "@/lib/mock-comercial";
import { cn } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";

const STAGES: Deal["stage"][] = ["novo", "contatado", "respondeu", "reuniao", "proposta", "ganho"];

const avatarPalette = [
  "from-indigo-500/40 to-blue-600/40",
  "from-violet-500/40 to-purple-600/40",
  "from-cyan-500/40 to-teal-600/40",
  "from-rose-500/40 to-pink-600/40",
  "from-amber-500/40 to-orange-600/40",
  "from-emerald-500/40 to-green-600/40",
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function DealCard({ deal, idx }: { deal: Deal; idx: number }) {
  const scoreColor = deal.score >= 90 ? "#4ade80" : deal.score >= 75 ? "#818cf8" : "#fbbf24";
  const scoreText  = deal.score >= 90 ? "text-emerald-400" : deal.score >= 75 ? "text-primary" : "text-amber-400";

  return (
    <div className="group bg-white/[0.028] hover:bg-white/[0.055] border border-white/[0.06] hover:border-white/[0.11] rounded-xl p-3.5 cursor-pointer transition-all duration-150 space-y-3">
      {/* Company + value */}
      <div className="flex items-start gap-2.5">
        <div className={cn(
          "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0 mt-0.5",
          avatarPalette[idx % avatarPalette.length]
        )}>
          <span className="text-[9px] font-bold text-white/90">{initials(deal.company)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-foreground truncate leading-none">{deal.company}</p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5 opacity-70">{deal.contactName}</p>
        </div>
        <span className="text-[11px] font-bold text-emerald-400 shrink-0 tabular-nums">
          R${(deal.value / 1000).toFixed(0)}K
        </span>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${deal.score}%`, background: scoreColor }} />
        </div>
        <span className={cn("text-[10px] font-bold tabular-nums", scoreText)}>{deal.score}</span>
      </div>

      {/* Tags */}
      {deal.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {deal.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-muted-foreground font-medium">
              {t}
            </span>
          ))}
          {deal.tags.length > 2 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-muted-foreground/50">
              +{deal.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Next action */}
      {deal.nextAction && (
        <div className="flex items-start gap-1.5 pt-1 border-t border-white/[0.05]">
          <Clock className="w-3 h-3 text-muted-foreground/40 mt-px shrink-0" />
          <p className="text-[10px] text-muted-foreground opacity-70 line-clamp-1">{deal.nextAction}</p>
        </div>
      )}
    </div>
  );
}

export function PipelineKanban() {
  const byStage = STAGES.reduce((acc, s) => {
    acc[s] = mockDeals.filter((d) => d.stage === s);
    return acc;
  }, {} as Record<Deal["stage"], Deal[]>);

  const activeDeals = mockDeals.filter((d) => d.stage !== "perdido" && d.stage !== "ganho").length;

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Pipeline Kanban</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">{activeDeals} deals em progresso</p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
          Visão lista <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 flex gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const cfg   = stageConfig[stage];
          const deals = byStage[stage] ?? [];
          const total = deals.reduce((s, d) => s + d.value, 0);

          return (
            <div key={stage} className="flex-shrink-0 w-[210px]">
              {/* Column header */}
              <div className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl mb-3 border",
                cfg.bg, cfg.border
              )}>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[11px] font-bold", cfg.color)}>{cfg.label}</span>
                  <span className={cn(
                    "text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center",
                    "bg-white/10 text-foreground tabular-nums"
                  )}>
                    {deals.length}
                  </span>
                </div>
                {total > 0 && (
                  <span className="text-[10px] text-muted-foreground opacity-70 tabular-nums font-medium">
                    R${(total / 1000).toFixed(0)}K
                  </span>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[60px]">
                {deals.length === 0 ? (
                  <div className="flex items-center justify-center h-16 rounded-xl border border-dashed border-border/30">
                    <span className="text-[10px] text-muted-foreground/30">Vazio</span>
                  </div>
                ) : (
                  deals.map((deal, i) => <DealCard key={deal.id} deal={deal} idx={i} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
