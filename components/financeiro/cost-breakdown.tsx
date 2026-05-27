import { mockCosts } from "@/lib/mock-financeiro";

export function CostBreakdown() {
  const total     = mockCosts.reduce((s, c) => s + c.monthly, 0);
  const fixed     = mockCosts.filter((c) => c.category === "fixed").reduce((s, c) => s + c.monthly, 0);
  const variable  = mockCosts.filter((c) => c.category === "variable").reduce((s, c) => s + c.monthly, 0);
  const maxMonthly = Math.max(...mockCosts.map((c) => c.monthly));

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Estrutura de Custos</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Mensal total: <span className="text-foreground font-semibold">R$ {total.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Fixo R$ {(fixed / 1000).toFixed(1)}K
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Variável R$ {(variable / 1000).toFixed(1)}K
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {mockCosts.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{item.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                  item.category === "fixed"
                    ? "bg-primary/10 text-primary"
                    : "bg-amber-500/10 text-amber-400"
                }`}>
                  {item.category === "fixed" ? "fixo" : "variável"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] shrink-0">
                <span className="text-muted-foreground">{item.pct}%</span>
                <span className="font-semibold text-foreground">
                  R$ {item.monthly.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(item.monthly / maxMonthly) * 100}%`,
                  background: item.color,
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total mensal</span>
        <span className="font-bold text-foreground">R$ {total.toLocaleString()}</span>
      </div>
    </div>
  );
}
