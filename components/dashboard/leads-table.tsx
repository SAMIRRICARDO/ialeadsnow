import { mockLeads } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Lead } from "@/types";
import { ExternalLink, ArrowRight } from "lucide-react";

const stageLabel: Record<Lead["stage"], { label: string; cls: string }> = {
  new:       { label: "Novo",        cls: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"   },
  contacted: { label: "Contatado",   cls: "bg-blue-500/10 text-blue-400 border-blue-500/20"         },
  replied:   { label: "Respondeu",   cls: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"         },
  qualified: { label: "Qualificado", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
  won:       { label: "Ganho",       cls: "bg-amber-500/10 text-amber-400 border-amber-500/20"      },
  lost:      { label: "Perdido",     cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"         },
};

const hotConfig: Record<Lead["status"], { label: string; dot: string; cls: string }> = {
  HOT:  { label: "HOT",  dot: "bg-red-400",            cls: "bg-red-500/10 text-red-400 border-red-500/20"    },
  WARM: { label: "WARM", dot: "bg-amber-400",           cls: "bg-amber-500/10 text-amber-400 border-amber-500/20"},
  COLD: { label: "COLD", dot: "bg-blue-400",            cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  DNC:  { label: "DNC",  dot: "bg-muted-foreground",    cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return `${Math.floor(diff / 60000)}m`;
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

const avatarColors = [
  "from-indigo-500/50 to-purple-600/50",
  "from-blue-500/50 to-cyan-600/50",
  "from-emerald-500/50 to-teal-600/50",
  "from-rose-500/50 to-pink-600/50",
  "from-amber-500/50 to-orange-600/50",
  "from-violet-500/50 to-purple-600/50",
];

export function LeadsTable() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Leads Recentes</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
            {mockLeads.length} leads · ordenados por score
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
          Ver todos <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              {[
                { label: "Contato",    w: "" },
                { label: "Empresa",    w: "" },
                { label: "Score",      w: "w-28" },
                { label: "Temperatura",w: "w-24" },
                { label: "Stage",      w: "w-28" },
                { label: "Origem",     w: "w-24" },
                { label: "Há",         w: "w-12" },
              ].map(({ label, w }) => (
                <th key={label}
                  className={cn("px-4 py-2.5 text-left data-table-header whitespace-nowrap first:pl-5 last:pr-5", w)}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead, idx) => {
              const stage = stageLabel[lead.stage];
              const hot   = hotConfig[lead.status];
              const scoreColor = lead.score >= 90 ? "#4ade80" : lead.score >= 75 ? "#818cf8" : "#fbbf24";
              const scoreText  = lead.score >= 90 ? "text-emerald-400" : lead.score >= 75 ? "text-primary" : "text-amber-400";

              return (
                <tr key={lead.id}
                  className="table-row-hover border-b border-border/25 last:border-0 group cursor-pointer">
                  <td className="px-4 pl-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center shrink-0",
                        avatarColors[idx % avatarColors.length]
                      )}>
                        <span className="text-[9px] font-bold text-white/90">{initials(lead.contactName)}</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-foreground whitespace-nowrap">{lead.contactName}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[130px] opacity-75">{lead.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[12px] font-medium text-foreground whitespace-nowrap">{lead.company}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-14 h-1 rounded-full bg-white/6 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${lead.score}%`, background: scoreColor }} />
                      </div>
                      <span className={cn("text-[12px] font-bold tabular-nums", scoreText)}>{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md border leading-none",
                      hot.cls
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", hot.dot)} />
                      {hot.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-md border whitespace-nowrap leading-none", stage.cls)}>
                      {stage.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{lead.source}</span>
                  </td>
                  <td className="px-4 pr-5 py-3">
                    <span className="text-[11px] text-muted-foreground opacity-70 tabular-nums">{timeAgo(lead.createdAt)}</span>
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
