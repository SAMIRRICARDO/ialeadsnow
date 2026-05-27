import { mockCampaigns } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Play, Pause, CheckCircle2, Plus, ArrowRight } from "lucide-react";

const statusCfg = {
  active:    { label: "Ativo",     icon: Play,         cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  paused:    { label: "Pausado",   icon: Pause,        cls: "text-amber-400 bg-amber-500/10 border-amber-500/20"       },
  completed: { label: "Concluído", icon: CheckCircle2, cls: "text-zinc-500 bg-white/5 border-white/10"                 },
};

function pct(a: number, b: number) {
  if (!b) return "—";
  return `${((a / b) * 100).toFixed(1)}%`;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function CampaignTable() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Campanhas</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
            {mockCampaigns.length} campanhas · histórico completo
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/12 hover:bg-primary/18 text-[11px] font-semibold text-primary transition-colors">
          <Plus className="w-3 h-3" />
          Nova campanha
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              {[
                { label: "Campanha",     w: "" },
                { label: "Enviados",     w: "w-20" },
                { label: "Taxa abertura",w: "w-28" },
                { label: "Resposta",     w: "w-24" },
                { label: "Qualificados", w: "w-24" },
                { label: "Último envio", w: "w-24" },
                { label: "Status",       w: "w-24" },
                { label: "",             w: "w-8"  },
              ].map(({ label, w }) => (
                <th key={label}
                  className={cn("px-4 py-2.5 text-left data-table-header whitespace-nowrap first:pl-5 last:pr-5", w)}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCampaigns.map((c) => {
              const cfg  = statusCfg[c.status];
              const Icon = cfg.icon;
              const openRate  = c.sent ? (c.opened  / c.sent) * 100 : 0;
              const replyRate = c.sent ? (c.replied / c.sent) * 100 : 0;

              return (
                <tr key={c.id} className="table-row-hover border-b border-border/25 last:border-0 group cursor-pointer">
                  <td className="px-4 pl-5 py-3">
                    <p className="text-[12px] font-semibold text-foreground whitespace-nowrap truncate max-w-[200px]">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground opacity-70 mt-0.5">{c.event}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-semibold text-foreground tabular-nums">{c.sent?.toLocaleString() || "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-1 rounded-full bg-white/6 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400/60" style={{ width: `${Math.min(openRate, 100)}%` }} />
                      </div>
                      <span className={cn("text-[12px] font-semibold tabular-nums", openRate > 0 ? "text-amber-400" : "text-muted-foreground")}>
                        {pct(c.opened, c.sent)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[12px] font-semibold tabular-nums", replyRate > 0 ? "text-emerald-400" : "text-muted-foreground")}>
                      {pct(c.replied, c.sent)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[12px] font-semibold tabular-nums", c.qualified > 0 ? "text-primary" : "text-muted-foreground")}>
                      {c.qualified || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-muted-foreground opacity-70 whitespace-nowrap tabular-nums">{formatDate(c.lastSentAt)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md border leading-none", cfg.cls)}>
                      <Icon className="w-2.5 h-2.5" />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 pr-5 py-3">
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all -translate-x-1 group-hover:translate-x-0" />
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
