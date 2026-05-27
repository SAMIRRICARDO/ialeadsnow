import { Bot, Play, Pause, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAgents } from "@/lib/mock-data";
import type { Agent } from "@/types";

const statusConfig = {
  running: { label: "Ativo",   color: "text-emerald-400", dot: "bg-emerald-400", ring: "ring-emerald-500/20", icon: Play        },
  idle:    { label: "Ocioso",  color: "text-muted-foreground", dot: "bg-white/20", ring: "ring-white/10", icon: Clock           },
  error:   { label: "Erro",    color: "text-red-400",     dot: "bg-red-400",    ring: "ring-red-500/20",    icon: AlertCircle   },
  paused:  { label: "Pausado", color: "text-amber-400",   dot: "bg-amber-400",  ring: "ring-amber-500/20",  icon: Pause         },
};

const typeLabel: Record<Agent["type"], string> = {
  sourcing:      "Sourcing",
  outreach:      "Outreach",
  enrichment:    "Enrich",
  qualification: "Qualify",
  followup:      "Follow-up",
};

function AgentRow({ agent }: { agent: Agent }) {
  const cfg = statusConfig[agent.status];
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0 group cursor-pointer hover:opacity-90 transition-opacity">
      <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ring-1", "bg-primary/8", cfg.ring)}>
        <Bot className="w-4 h-4 text-primary" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-foreground truncate">{agent.name}</p>
          <span className="text-[10px] text-muted-foreground shrink-0 opacity-60">{typeLabel[agent.type]}</span>
        </div>
        <div className="flex items-center gap-2.5 mt-0.5">
          <span className="text-[10px] text-muted-foreground opacity-70 tabular-nums">{agent.tasksCompleted.toLocaleString()} tasks</span>
          {agent.tasksQueued > 0 && (
            <span className="text-[10px] text-amber-400 font-medium">{agent.tasksQueued} fila</span>
          )}
          <span className="text-[10px] text-muted-foreground opacity-70">{agent.successRate}% ok</span>
        </div>
      </div>
      <div className={cn("flex items-center gap-1.5 text-[10px] font-semibold shrink-0", cfg.color)}>
        <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot, agent.status === "running" && "animate-pulse")} />
        {cfg.label}
      </div>
    </div>
  );
}

export function AgentStatus() {
  const running = mockAgents.filter((a) => a.status === "running").length;
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Agentes IA</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
            {running} de {mockAgents.length} ativos
          </p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
          Ver todos <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div>
        {mockAgents.map((agent) => (
          <AgentRow key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
