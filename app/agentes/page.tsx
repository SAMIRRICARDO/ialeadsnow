import { AppShell } from "@/components/layout/app-shell";
import { AgentKpis } from "@/components/agentes/agent-kpis";
import { AgentCard } from "@/components/agentes/agent-card";
import { PerformanceChart } from "@/components/agentes/performance-chart";
import { ExecutionLog } from "@/components/agentes/execution-log";
import { TaskQueue } from "@/components/agentes/task-queue";
import { mockAgents } from "@/lib/mock-data";
import { Plus, Download } from "lucide-react";

export default function AgentesPage() {
  return (
    <AppShell
      title="Agentes IA"
      subtitle="Monitoramento, controle e configuração dos agentes autônomos"
    >
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* ── Actions bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {mockAgents.filter((a) => a.status === "running").length} agentes rodando agora
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Download className="w-3.5 h-3.5" /> Exportar logs
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 text-xs text-primary font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" /> Novo agente
            </button>
          </div>
        </div>

        {/* ── KPIs ────────────────────────────────────────────── */}
        <AgentKpis />

        {/* ── Agent cards grid ────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Agentes configurados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
            {mockAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* ── Performance chart + Queue ────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <PerformanceChart />
          </div>
          <TaskQueue />
        </div>

        {/* ── Execution log ───────────────────────────────────── */}
        <ExecutionLog />

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="flex items-center gap-4 pt-1 pb-2 text-[11px] text-muted-foreground border-t border-border/40">
          <span>
            Total tasks hoje:{" "}
            <span className="text-foreground font-medium">
              {mockAgents.reduce((s, a) => s + a.tasksCompleted, 0).toLocaleString()}
            </span>
          </span>
          <span>·</span>
          <span>
            Custo estimado hoje:{" "}
            <span className="text-foreground font-medium">$0.0072</span>
          </span>
          <span>·</span>
          <span>Modelos: claude-haiku-4-5 · claude-sonnet-4-6</span>
        </div>

      </div>
    </AppShell>
  );
}
