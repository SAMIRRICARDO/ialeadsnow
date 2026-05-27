import { AppShell } from "@/components/layout/app-shell";
import { ComercialKpis } from "@/components/comercial/comercial-kpis";
import { RevenueChart } from "@/components/comercial/revenue-chart";
import { PipelineKanban } from "@/components/comercial/pipeline-kanban";
import { DealsTable } from "@/components/comercial/deals-table";
import { TopCompanies } from "@/components/comercial/top-companies";
import { NextActions } from "@/components/comercial/next-actions";
import { mockDeals } from "@/lib/mock-comercial";
import { Plus, Upload, Filter, ArrowUpRight } from "lucide-react";

const pipeline = mockDeals
  .filter((d) => d.stage !== "perdido")
  .reduce((s, d) => s + d.value, 0);

const wonValue = mockDeals
  .filter((d) => d.stage === "ganho")
  .reduce((s, d) => s + d.value, 0);

export default function ComercialPage() {
  return (
    <AppShell
      title="Comercial"
      subtitle="Pipeline de vendas, deals ativos e gestão de oportunidades"
    >
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* ── Actions bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-muted-foreground">
              Pipeline:{" "}
              <span className="text-foreground font-semibold">R$ {(pipeline / 1000).toFixed(0)}K</span>
            </span>
            <span className="text-border">·</span>
            <span className="text-muted-foreground">
              Ganho:{" "}
              <span className="text-emerald-400 font-semibold">R$ {(wonValue / 1000).toFixed(0)}K</span>
            </span>
            <span className="text-border">·</span>
            <span className="text-muted-foreground">
              Deals ativos:{" "}
              <span className="text-foreground font-semibold">
                {mockDeals.filter((d) => d.stage !== "perdido" && d.stage !== "ganho").length}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Filter className="w-3.5 h-3.5" /> Filtrar
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Upload className="w-3.5 h-3.5" /> Importar leads
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 text-xs text-primary font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" /> Novo deal
            </button>
          </div>
        </div>

        {/* ── KPIs ────────────────────────────────────────────── */}
        <ComercialKpis />

        {/* ── Revenue Chart + Next Actions ────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <NextActions />
        </div>

        {/* ── Kanban ──────────────────────────────────────────── */}
        <PipelineKanban />

        {/* ── Deals Table + Top Companies ─────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <DealsTable />
          </div>
          <TopCompanies />
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="flex items-center gap-4 pt-1 pb-2 text-[11px] text-muted-foreground border-t border-border/40 flex-wrap">
          <span>
            Forecast Junho:{" "}
            <span className="text-foreground font-medium">R$ 150K meta</span>
          </span>
          <span>·</span>
          <span>
            Win rate:{" "}
            <span className="text-emerald-400 font-medium">
              {((mockDeals.filter((d) => d.stage === "ganho").length / mockDeals.length) * 100).toFixed(0)}%
            </span>
          </span>
          <span>·</span>
          <span>
            Deals em risco:{" "}
            <span className="text-amber-400 font-medium">
              {mockDeals.filter((d) => d.stage === "proposta").length} (proposta aberta)
            </span>
          </span>
          <span>·</span>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            Relatório completo <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </AppShell>
  );
}
