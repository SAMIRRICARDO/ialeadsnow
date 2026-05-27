import { mockCampaignComparison } from "@/lib/mock-analytics";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

function RateBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value.toFixed(1)}%</span>
    </div>
  );
}

export function CampaignComparison() {
  const maxOpen  = Math.max(...mockCampaignComparison.map((c) => c.openRate));
  const maxReply = Math.max(...mockCampaignComparison.map((c) => c.replyRate));
  const maxQual  = Math.max(...mockCampaignComparison.map((c) => c.qualifiedRate));

  const sorted = [...mockCampaignComparison].sort((a, b) => b.roi - a.roi);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Comparativo de Campanhas</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Performance consolidada — por campanha</p>
        </div>
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-primary" /> ordenado por ROI
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              {["Campanha", "Enviados", "Abertura", "Resposta", "Qualif.", "Score", "Valor", "ROI"].map((h) => (
                <th key={h} className="text-left text-[10px] font-medium text-muted-foreground pb-2.5 pr-4 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => (
              <tr key={c.campaign} className="border-b border-border/30 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 pr-4">
                  <div>
                    <p className="font-medium text-foreground whitespace-nowrap">{c.campaign}</p>
                    <p className="text-[10px] text-muted-foreground">{c.event}</p>
                  </div>
                </td>
                <td className="py-3 pr-4 font-medium text-foreground">{c.sent}</td>
                <td className="py-3 pr-4"><RateBar value={c.openRate}      max={maxOpen}  color="#818cf8" /></td>
                <td className="py-3 pr-4"><RateBar value={c.replyRate}     max={maxReply} color="#4ade80" /></td>
                <td className="py-3 pr-4"><RateBar value={c.qualifiedRate} max={maxQual}  color="#fbbf24" /></td>
                <td className="py-3 pr-4">
                  <span className={cn("font-semibold",
                    c.avgScore >= 90 ? "text-emerald-400" : c.avgScore >= 82 ? "text-primary" : "text-amber-400"
                  )}>{c.avgScore}</span>
                </td>
                <td className="py-3 pr-4 font-semibold text-foreground">
                  R$ {(c.totalValue / 1000).toFixed(0)}K
                </td>
                <td className="py-3">
                  <span className={cn(
                    "font-bold text-sm",
                    i === 0 ? "text-emerald-400" : i === 1 ? "text-primary" : "text-muted-foreground"
                  )}>
                    {c.roi}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
