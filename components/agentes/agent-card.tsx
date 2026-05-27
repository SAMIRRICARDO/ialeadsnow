"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockAgentConfigs } from "@/lib/mock-agents";
import type { Agent } from "@/types";
import {
  Bot, Play, Pause, RefreshCw, Settings2,
  ChevronDown, ChevronUp,
} from "lucide-react";

const statusCfg = {
  running: { label: "Ativo",   dot: "bg-emerald-400 animate-pulse", badge: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25" },
  idle:    { label: "Ocioso",  dot: "bg-white/20",                  badge: "bg-white/5 text-muted-foreground ring-1 ring-white/10"         },
  error:   { label: "Erro",    dot: "bg-red-400",                   badge: "bg-red-500/10 text-red-400 ring-1 ring-red-500/25"             },
  paused:  { label: "Pausado", dot: "bg-amber-400",                 badge: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25"       },
};

const typeGradient: Record<Agent["type"], string> = {
  sourcing:      "from-indigo-600/15 via-blue-700/10 to-transparent",
  outreach:      "from-violet-600/15 via-purple-700/10 to-transparent",
  enrichment:    "from-cyan-600/15 via-teal-700/10 to-transparent",
  qualification: "from-amber-600/15 via-orange-700/10 to-transparent",
  followup:      "from-rose-600/15 via-pink-700/10 to-transparent",
};

const typeBorder: Record<Agent["type"], string> = {
  sourcing:      "border-indigo-500/20",
  outreach:      "border-violet-500/20",
  enrichment:    "border-cyan-500/20",
  qualification: "border-amber-500/20",
  followup:      "border-rose-500/20",
};

const typeAccent: Record<Agent["type"], string> = {
  sourcing:      "text-indigo-400",
  outreach:      "text-violet-400",
  enrichment:    "text-cyan-400",
  qualification: "text-amber-400",
  followup:      "text-rose-400",
};

const typeLabel: Record<Agent["type"], string> = {
  sourcing:      "Sourcing",
  outreach:      "Outreach",
  enrichment:    "Enrichment",
  qualification: "Qualification",
  followup:      "Follow-up",
};

export function AgentCard({ agent }: { agent: Agent }) {
  const [expanded, setExpanded] = useState(false);
  const cfg    = statusCfg[agent.status];
  const config = mockAgentConfigs[agent.id];

  const successColor =
    agent.successRate >= 95 ? "#4ade80" :
    agent.successRate >= 85 ? "#fbbf24" : "#f87171";

  const successText =
    agent.successRate >= 95 ? "text-emerald-400" :
    agent.successRate >= 85 ? "text-amber-400" : "text-red-400";

  const latencyText =
    agent.avgLatencyMs < 500  ? "text-emerald-400" :
    agent.avgLatencyMs < 1500 ? "text-amber-400" : "text-red-400";

  return (
    <div className={cn(
      "glass-card rounded-xl overflow-hidden transition-all duration-200 hover:border-white/10",
      agent.status === "running" ? typeBorder[agent.type] : ""
    )}>
      {/* Header gradient */}
      <div className={cn("bg-gradient-to-b p-5 pb-4", typeGradient[agent.type])}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
              "bg-white/5 ring-1 ring-white/10"
            )}>
              <Bot className={cn("w-5 h-5", typeAccent[agent.type])} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground leading-none">{agent.name}</p>
              <p className={cn("text-[10px] font-semibold mt-1 uppercase tracking-wider", typeAccent[agent.type])}>
                {typeLabel[agent.type]}
              </p>
            </div>
          </div>
          <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 leading-none", cfg.badge)}>
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-5 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Tasks",      value: agent.tasksCompleted.toLocaleString(), cls: "text-foreground" },
            { label: "Na fila",    value: agent.tasksQueued,                     cls: agent.tasksQueued > 0 ? "text-amber-400" : "text-muted-foreground" },
            { label: "Sucesso",    value: `${agent.successRate}%`,               cls: successText },
            { label: "Latência",   value: agent.avgLatencyMs >= 1000 ? `${(agent.avgLatencyMs/1000).toFixed(1)}s` : `${agent.avgLatencyMs}ms`, cls: latencyText },
          ].map(({ label, value, cls }) => (
            <div key={label} className="rounded-lg px-3 py-2.5 bg-white/[0.028] border border-white/[0.05]">
              <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-1.5 opacity-70">{label}</p>
              <p className={cn("text-[15px] font-bold tabular-nums leading-none", cls)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Performance bar */}
        <div>
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-muted-foreground opacity-70">Performance</span>
            <span className={successText + " font-semibold"}>{agent.successRate}%</span>
          </div>
          <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${agent.successRate}%`, background: successColor }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {agent.status === "running" ? (
            <button className="flex-1 flex items-center justify-center gap-2 py-[7px] rounded-lg bg-amber-500/10 hover:bg-amber-500/15 text-amber-400 text-[11px] font-semibold transition-colors border border-amber-500/15">
              <Pause className="w-3.5 h-3.5" /> Pausar
            </button>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-2 py-[7px] rounded-lg bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold transition-colors border border-emerald-500/15">
              <Play className="w-3.5 h-3.5" /> Iniciar
            </button>
          )}
          <button className="flex items-center justify-center px-3 py-[7px] rounded-lg bg-white/[0.04] hover:bg-white/[0.07] text-muted-foreground hover:text-foreground transition-colors border border-white/[0.06]">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center px-3 py-[7px] rounded-lg bg-white/[0.04] hover:bg-white/[0.07] text-muted-foreground hover:text-foreground transition-colors border border-white/[0.06]"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Config expandable */}
        {expanded && config && (
          <div className="pt-3 border-t border-border/40 space-y-2.5">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5 opacity-60">
              <Settings2 className="w-3 h-3" /> Configuração
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
              {[
                ["Modelo",      config.model],
                ["Max tokens",  config.maxTokens.toLocaleString()],
                ["Temperature", String(config.temperature)],
                ["Rate limit",  config.rateLimit],
                ["Retries",     String(config.retries)],
                ["Schedule",    config.schedule],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-muted-foreground opacity-70">{k}</span>
                  <span className="text-foreground font-semibold font-mono text-[10px] truncate">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
