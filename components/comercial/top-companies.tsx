import { mockTopCompanies, stageConfig } from "@/lib/mock-comercial";
import { cn } from "@/lib/utils";
import type { Deal } from "@/lib/mock-comercial";

const medals = ["🥇", "🥈", "🥉"];

export function TopCompanies() {
  const maxVal = Math.max(...mockTopCompanies.map((c) => c.totalValue));

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Top Empresas</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Rankeadas por valor de pipeline</p>
      </div>

      <div className="space-y-2.5">
        {mockTopCompanies.map((c) => {
          const stage    = c.stage.toLowerCase().replace("ã", "a").replace("é", "e") as Deal["stage"];
          const stageCfg = stageConfig[stage] ?? stageConfig.novo;
          const barPct   = (c.totalValue / maxVal) * 100;
          const medal    = medals[c.rank - 1] ?? null;

          return (
            <div key={c.company} className="flex items-center gap-3 group cursor-pointer">
              <div className="w-6 text-center shrink-0">
                {medal
                  ? <span className="text-sm leading-none">{medal}</span>
                  : <span className="text-[11px] text-muted-foreground/50">{c.rank}</span>
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-medium text-foreground truncate">{c.company}</span>
                    <span className="text-[10px] text-muted-foreground hidden sm:inline truncate">{c.sector}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", stageCfg.color, stageCfg.bg)}>
                      {c.stage}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      R$ {(c.totalValue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${barPct}%`,
                      background: c.score >= 90 ? "#4ade80" : c.score >= 80 ? "#818cf8" : "#fbbf24",
                    }}
                  />
                </div>
              </div>

              <div className="w-7 text-right shrink-0">
                <span className="text-[11px] font-bold" style={{
                  color: c.score >= 90 ? "#4ade80" : c.score >= 80 ? "#818cf8" : "#fbbf24",
                }}>{c.score}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
