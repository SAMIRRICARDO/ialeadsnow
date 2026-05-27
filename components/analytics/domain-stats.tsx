import { mockDomainStats } from "@/lib/mock-analytics";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function DomainStats() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Entregabilidade por Domínio</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Taxa de entrega e abertura por domínio de destino</p>
      </div>

      <div className="space-y-2">
        {mockDomainStats.map((d) => {
          const icon =
            d.deliveryRate === 100 ? CheckCircle2 :
            d.deliveryRate === 0   ? XCircle :
            AlertTriangle;
          const iconColor =
            d.deliveryRate === 100 ? "text-emerald-400" :
            d.deliveryRate === 0   ? "text-red-400" :
            "text-amber-400";

          const Icon = icon;

          return (
            <div key={d.domain} className="flex items-center gap-3 py-1.5 border-b border-border/30 last:border-0">
              <Icon className={cn("w-3.5 h-3.5 shrink-0", iconColor)} />
              <span className="text-[11px] font-mono text-foreground w-36 truncate shrink-0">{d.domain}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.deliveryRate}%`,
                    background: d.deliveryRate === 100 ? "#4ade80" : d.deliveryRate >= 75 ? "#fbbf24" : "#f87171",
                  }}
                />
              </div>
              <div className="flex items-center gap-3 text-[10px] shrink-0 w-32 justify-end">
                <span className="text-muted-foreground">{d.sent} env.</span>
                {d.bounced > 0 && <span className="text-red-400">{d.bounced} bounce</span>}
                <span className={cn("font-semibold",
                  d.deliveryRate === 100 ? "text-emerald-400" :
                  d.deliveryRate >= 75   ? "text-amber-400" :
                  "text-red-400"
                )}>{d.deliveryRate}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
