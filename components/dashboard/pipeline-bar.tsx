import { mockPipeline } from "@/lib/mock-data";

export function PipelineBar() {
  const total = mockPipeline.reduce((s, p) => s + p.count, 0);
  const maxCount = Math.max(...mockPipeline.map((p) => p.count));

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Funil de Vendas</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">{total} leads no pipeline</p>
        </div>
        <span className="text-[13px] font-bold text-emerald-400 tabular-nums">R$ 482K</span>
      </div>

      {/* Stacked progress bar */}
      <div className="flex h-[6px] rounded-full overflow-hidden gap-[1px] mb-5">
        {mockPipeline.map((p) => (
          <div
            key={p.stage}
            style={{ width: `${(p.count / total) * 100}%`, background: p.color }}
            className="first:rounded-l-full last:rounded-r-full transition-all duration-700"
          />
        ))}
      </div>

      {/* Legend with mini bars */}
      <div className="space-y-2.5">
        {mockPipeline.map((p) => (
          <div key={p.stage} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="text-[11px] text-muted-foreground">{p.stage}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-muted-foreground opacity-70 tabular-nums">{p.count}</span>
                {p.value > 0 && (
                  <span className="text-foreground font-semibold tabular-nums">
                    R$ {(p.value / 1000).toFixed(0)}K
                  </span>
                )}
              </div>
            </div>
            <div className="h-0.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(p.count / maxCount) * 100}%`, background: p.color, opacity: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
