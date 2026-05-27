import { mockDeals } from "@/lib/mock-comercial";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

function formatDate(iso: string) {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  if (days < 0)   return `${Math.abs(days)}d atraso`;
  if (days === 0) return "Hoje";
  if (days === 1) return "Amanhã";
  return `Em ${days}d`;
}

function urgency(iso: string) {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  if (days < 0)  return { icon: AlertCircle, color: "text-red-400",   bg: "bg-red-500/10",   ring: "ring-red-500/20"   };
  if (days <= 1) return { icon: Clock,       color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" };
  return          { icon: CheckCircle2,      color: "text-blue-400",  bg: "bg-blue-500/10",  ring: "ring-blue-500/20"  };
}

export function NextActions() {
  const withActions = mockDeals
    .filter((d) => d.nextAction && d.nextActionAt && d.stage !== "perdido" && d.stage !== "ganho")
    .sort((a, b) => new Date(a.nextActionAt!).getTime() - new Date(b.nextActionAt!).getTime());

  return (
    <div className="glass-card rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Próximas Ações</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">{withActions.length} ações pendentes</p>
        </div>
      </div>

      <div className="flex-1 space-y-0.5">
        {withActions.map((deal) => {
          const urg  = urgency(deal.nextActionAt!);
          const Icon = urg.icon;
          const when = formatDate(deal.nextActionAt!);
          return (
            <div key={deal.id}
              className="flex items-start gap-3 py-2.5 border-b border-border/25 last:border-0 group cursor-pointer hover:opacity-90 transition-opacity">
              <div className={cn("flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5 ring-1", urg.bg, urg.ring)}>
                <Icon className={cn("w-3.5 h-3.5", urg.color)} strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px] font-bold text-foreground">{deal.company}</span>
                  <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-none", urg.bg, urg.color)}>
                    {when}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground opacity-70 truncate">{deal.nextAction}</p>
              </div>
              <span className="text-[11px] font-bold text-foreground shrink-0 tabular-nums">
                R${(deal.value / 1000).toFixed(0)}K
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
