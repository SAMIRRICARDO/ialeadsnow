import { AppShell } from "@/components/layout/app-shell";
import { mockPlan, mockUsage, mockBillingHistory, mockCredits } from "@/lib/mock-billing";
import { cn } from "@/lib/utils";
import { CreditCard, Zap, CheckCircle2, Download, AlertCircle, TrendingUp } from "lucide-react";

const statusCfg = {
  pago:     { label: "Pago",     color: "text-emerald-400", bg: "bg-emerald-500/10" },
  pendente: { label: "Pendente", color: "text-amber-400",   bg: "bg-amber-500/10"   },
  falhou:   { label: "Falhou",   color: "text-red-400",     bg: "bg-red-500/10"      },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BillingPage() {
  const totalPago = mockBillingHistory.filter((b) => b.status === "pago").reduce((s, b) => s + b.amount, 0);
  const creditBalance = mockCredits[0]?.balance ?? 0;

  return (
    <AppShell title="Billing" subtitle="Plano, uso de recursos e histórico de cobranças">
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* Plan + Credit */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Plan card */}
          <div className="glass-card rounded-xl p-5 glow-primary xl:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-wider">
                  {mockPlan.name}
                </span>
                <p className="text-3xl font-bold text-foreground mt-3">
                  R$ {mockPlan.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/mês</span>
                </p>
              </div>
              <CreditCard className="w-6 h-6 text-primary shrink-0" />
            </div>
            <div className="space-y-1.5 mb-4">
              {mockPlan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-lg bg-primary/15 hover:bg-primary/25 text-xs text-primary font-medium transition-colors">
              Gerenciar plano
            </button>
          </div>

          {/* Usage grid */}
          <div className="xl:col-span-2 glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Uso do Plano</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Ciclo atual — Mai 2026</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Créditos IA restantes</p>
                <p className="text-lg font-bold text-primary">$ {creditBalance.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockUsage.map((u) => {
                const pct = Math.min((u.used / u.limit) * 100, 100);
                const isUnlimited = u.limit >= 999999;
                return (
                  <div key={u.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-muted-foreground">{u.label}</span>
                      <span className="text-[11px] font-semibold text-foreground">
                        {u.used.toLocaleString()} {isUnlimited ? "" : `/ ${u.limit >= 1000 ? `${(u.limit/1000).toFixed(0)}K` : u.limit}`}
                        <span className="text-muted-foreground font-normal ml-1">{u.unit}</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: isUnlimited ? "3%" : `${pct}%`, background: u.color }}
                      />
                    </div>
                    {!isUnlimited && (
                      <p className="text-[10px] text-muted-foreground mt-0.5 text-right">{pct.toFixed(1)}%</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Billing history + Credits */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* History */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Histórico de Cobranças</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Total pago: <span className="text-emerald-400 font-semibold">R$ {totalPago.toLocaleString()}</span>
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground">
                <Download className="w-3.5 h-3.5" /> Exportar
              </button>
            </div>
            <div className="space-y-0">
              {mockBillingHistory.map((b) => {
                const st = statusCfg[b.status];
                return (
                  <div key={b.id} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{b.description}</p>
                      <p className="text-[10px] text-muted-foreground">{fmtDate(b.date)} · {b.invoice}</p>
                    </div>
                    <span className="font-bold text-foreground text-xs shrink-0">R$ {b.amount.toLocaleString()}</span>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", st.color, st.bg)}>
                      {st.label}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Credits log */}
          <div className="glass-card rounded-xl p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">Créditos IA</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Saldo atual: <span className="text-primary font-semibold">$ {creditBalance.toFixed(2)}</span>
              </p>
            </div>
            <div className="space-y-0">
              {mockCredits.map((c, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
                  <div className={cn("flex items-center justify-center w-7 h-7 rounded-md shrink-0",
                    c.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                  )}>
                    {c.type === "credit"
                      ? <TrendingUp  className="w-3.5 h-3.5 text-emerald-400" />
                      : <Zap         className="w-3.5 h-3.5 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-foreground truncate">{c.description}</p>
                    <p className="text-[10px] text-muted-foreground">{fmtDate(c.date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn("text-xs font-bold", c.type === "credit" ? "text-emerald-400" : "text-red-400")}>
                      {c.type === "credit" ? "+" : ""}${c.amount.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">saldo ${c.balance.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
