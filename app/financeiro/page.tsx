import { AppShell } from "@/components/layout/app-shell";
import { FinanceiroKpis } from "@/components/financeiro/financeiro-kpis";
import { RevenueTrend } from "@/components/financeiro/revenue-trend";
import { CashflowChart } from "@/components/financeiro/cashflow-chart";
import { RevenueBreakdown } from "@/components/financeiro/revenue-breakdown";
import { CostBreakdown } from "@/components/financeiro/cost-breakdown";
import { InvoicesTable } from "@/components/financeiro/invoices-table";
import { ForecastCard } from "@/components/financeiro/forecast-card";
import { mockFinancePoints, mockInvoices } from "@/lib/mock-financeiro";
import { Download, Plus, AlertTriangle } from "lucide-react";

const ytdReceita = mockFinancePoints.filter((p) => !p.month.includes("*")).reduce((s, p) => s + p.receita, 0);
const ytdLucro   = mockFinancePoints.filter((p) => !p.month.includes("*")).reduce((s, p) => s + p.lucro,   0);
const margin     = ytdReceita ? ((ytdLucro / ytdReceita) * 100).toFixed(0) : "0";
const atrasadas  = mockInvoices.filter((i) => i.status === "atrasado");

export default function FinanceiroPage() {
  return (
    <AppShell
      title="Financeiro"
      subtitle="Receita, custos, fluxo de caixa e forecast 2026"
    >
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* ── Alert: faturas atrasadas ─────────────────────────── */}
        {atrasadas.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-xs text-foreground flex-1">
              <span className="font-semibold text-red-400">{atrasadas.length} fatura(s) em atraso.</span>
              {" "}{atrasadas.map((i) => `${i.client} — R$ ${i.value.toLocaleString()}`).join(", ")}.
            </p>
            <button className="text-[11px] font-medium text-red-400 hover:underline shrink-0">
              Ver faturas
            </button>
          </div>
        )}

        {/* ── Actions bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span>YTD Receita: <span className="text-foreground font-semibold">R$ {(ytdReceita / 1000).toFixed(0)}K</span></span>
            <span className="text-border">·</span>
            <span>Margem: <span className="text-emerald-400 font-semibold">{margin}%</span></span>
            <span className="text-border">·</span>
            <span>Lucro: <span className="text-primary font-semibold">R$ {(ytdLucro / 1000).toFixed(0)}K</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Download className="w-3.5 h-3.5" /> DRE
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 text-xs text-primary font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" /> Nova fatura
            </button>
          </div>
        </div>

        {/* ── KPIs ────────────────────────────────────────────── */}
        <FinanceiroKpis />

        {/* ── Revenue Trend + Revenue Breakdown ───────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RevenueTrend />
          </div>
          <RevenueBreakdown />
        </div>

        {/* ── Cashflow + Cost Breakdown + Forecast ────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <CashflowChart />
          <CostBreakdown />
          <ForecastCard />
        </div>

        {/* ── Invoices Table ───────────────────────────────────── */}
        <InvoicesTable />

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="flex items-center gap-4 pt-1 pb-2 text-[11px] text-muted-foreground border-t border-border/40 flex-wrap">
          <span>Exercício: Jan–Dez 2026</span>
          <span>·</span>
          <span>Moeda: BRL</span>
          <span>·</span>
          <span>Regime: competência</span>
          <span>·</span>
          <span>
            Próximo vencimento:{" "}
            <span className="text-amber-400 font-medium">
              {mockInvoices.find((i) => i.status === "pendente")?.client} —{" "}
              {new Date(mockInvoices.find((i) => i.status === "pendente")?.due ?? "").toLocaleDateString("pt-BR")}
            </span>
          </span>
        </div>

      </div>
    </AppShell>
  );
}
