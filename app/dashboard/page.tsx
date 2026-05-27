import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { LeadChart } from "@/components/dashboard/lead-chart";
import { AgentStatus } from "@/components/dashboard/agent-status";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PipelineBar } from "@/components/dashboard/pipeline-bar";
import { OutboundFunnel } from "@/components/dashboard/outbound-funnel";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { mockMetrics, mockCampaigns } from "@/lib/mock-data";
import { ArrowUpRight, Zap, AlertCircle } from "lucide-react";

const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
const pendingBatches  = mockCampaigns.filter((c) => c.status === "paused").length;

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Visão consolidada — leads, outbound, agentes e pipeline"
    >
      <div className="p-5 space-y-4 max-w-[1600px]">

        {/* ── Alert banner ─────────────────────────────────── */}
        {pendingBatches > 0 && (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
            style={{
              background: "rgba(129,140,248,0.05)",
              borderColor: "rgba(129,140,248,0.18)",
            }}>
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/15 shrink-0">
              <Zap className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <p className="text-[12px] text-foreground flex-1">
              <span className="font-bold text-primary">{pendingBatches} batch(es) prontos para envio</span>
              <span className="text-muted-foreground"> · Batch 02 (25 leads — Forte Telecom, Huge Networks…) aguarda aprovação.</span>
            </p>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors shrink-0">
              Ver campanhas <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* ── KPIs ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {mockMetrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        {/* ── Chart + Funnel ───────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <LeadChart />
          </div>
          <OutboundFunnel />
        </div>

        {/* ── Campaign table ───────────────────────────────── */}
        <CampaignTable />

        {/* ── Leads table ──────────────────────────────────── */}
        <LeadsTable />

        {/* ── Agents + Activity + Pipeline ─────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <AgentStatus />
          <ActivityFeed />
          <PipelineBar />
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="flex items-center gap-3 pt-1 pb-2 text-[11px] text-muted-foreground border-t border-border/30 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">Sistemas OK</span>
          </span>
          <span className="text-border">·</span>
          <span>{activeCampaigns} campanha(s) ativa(s)</span>
          <span className="text-border">·</span>
          <span>Sync: 13:47 BRT</span>
          <span className="ml-auto flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
            Exportar relatório <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

      </div>
    </AppShell>
  );
}
