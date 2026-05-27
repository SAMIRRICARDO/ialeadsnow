import { AppShell } from "@/components/layout/app-shell";
import { AnalyticsKpis } from "@/components/analytics/analytics-kpis";
import { EmailPerformanceChart } from "@/components/analytics/email-performance-chart";
import { SourceBreakdown } from "@/components/analytics/source-breakdown";
import { SegmentChart } from "@/components/analytics/segment-chart";
import { SendHeatmap } from "@/components/analytics/send-heatmap";
import { CampaignComparison } from "@/components/analytics/campaign-comparison";
import { DomainStats } from "@/components/analytics/domain-stats";
import { Download, RefreshCw, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics"
      subtitle="Performance de outbound, conversão por segmento e entregabilidade"
    >
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* ── Actions bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {["7d", "30d", "90d", "Todo período"].map((r, i) => (
              <button key={r} className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors ${
                i === 1
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-border"
              }`}>{r}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Calendar className="w-3.5 h-3.5" /> Período
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <RefreshCw className="w-3.5 h-3.5" /> Atualizar
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 text-xs text-primary font-medium transition-colors">
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>
        </div>

        {/* ── KPIs ────────────────────────────────────────────── */}
        <AnalyticsKpis />

        {/* ── Email Performance + Source ───────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <EmailPerformanceChart />
          </div>
          <SourceBreakdown />
        </div>

        {/* ── Segment Chart + Heatmap ──────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <SegmentChart />
          <SendHeatmap />
        </div>

        {/* ── Campaign Comparison ──────────────────────────────── */}
        <CampaignComparison />

        {/* ── Domain Stats ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <DomainStats />

          {/* Insight card */}
          <div className="glass-card rounded-xl p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Insights Automáticos</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Gerado pelos agentes IA — 27/05/2026</p>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { color: "bg-emerald-400", title: "Melhor janela de envio", body: "Quarta-feira às 10h concentra o maior volume de aberturas (21 opens). Priorizar envios neste horário pode aumentar a taxa em até 18%." },
                { color: "bg-primary",     title: "Segmento com maior ROI", body: "Telecom / Carriers lidera em volume (48 leads) e tem o melhor score médio (88). Futurecom 2026 é a fonte de maior retorno." },
                { color: "bg-amber-400",   title: "Atenção: domínios problemáticos", body: "linkedin.com.br com 0% de entrega e amazon.com com 25% de bounce. Remover antes do próximo batch." },
                { color: "bg-violet-400",  title: "Campanha destaque", body: "Futurecom — Top 5 lidera com 60% de abertura, 20% de resposta e ROI de 12.4x. Replicar abordagem de personalização nos próximos batches." },
              ].map(({ color, title, body }) => (
                <div key={title} className="flex gap-3">
                  <div className={`w-1 rounded-full shrink-0 self-stretch ${color}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="flex items-center gap-4 pt-1 pb-2 text-[11px] text-muted-foreground border-t border-border/40 flex-wrap">
          <span>Período: 01/05/2026 – 27/05/2026</span>
          <span>·</span>
          <span>234 leads processados</span>
          <span>·</span>
          <span>1.204 emails enviados</span>
          <span>·</span>
          <span>Última atualização: 13:47 BRT</span>
        </div>

      </div>
    </AppShell>
  );
}
