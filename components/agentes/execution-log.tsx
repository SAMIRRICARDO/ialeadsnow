import { mockTaskLog } from "@/lib/mock-agents";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader2, SkipForward } from "lucide-react";

const statusCfg = {
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "OK"       },
  failed:  { icon: XCircle,      color: "text-red-400",     bg: "bg-red-500/10",     label: "ERRO"     },
  running: { icon: Loader2,      color: "text-primary",     bg: "bg-primary/10",     label: "RODANDO"  },
  skipped: { icon: SkipForward,  color: "text-zinc-400",    bg: "bg-zinc-500/10",    label: "SKIP"     },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDuration(ms: number) {
  if (!ms) return "—";
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}ms`;
}

function formatCost(n: number) {
  if (!n) return "—";
  return `$${n.toFixed(4)}`;
}

export function ExecutionLog() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Log de Execuções</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Últimas {mockTaskLog.length} tasks — tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              {["Horário", "Agente", "Task", "Input", "Output", "Duração", "Tokens", "Custo", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-medium text-muted-foreground pb-2.5 pr-4 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTaskLog.map((task) => {
              const s = statusCfg[task.status];
              const Icon = s.icon;
              return (
                <tr
                  key={task.id}
                  className={cn(
                    "border-b border-border/30 last:border-0 hover:bg-white/[0.02] transition-colors",
                    task.status === "running" && "bg-primary/[0.03]"
                  )}
                >
                  <td className="py-2.5 pr-4 text-muted-foreground whitespace-nowrap font-mono text-[10px]">
                    {formatTime(task.startedAt)}
                  </td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">
                    <span className="font-medium text-foreground">{task.agentName}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground font-mono whitespace-nowrap">
                      {task.taskType}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 max-w-[180px]">
                    <p className="text-muted-foreground truncate text-[11px]">{task.input}</p>
                  </td>
                  <td className="py-2.5 pr-4 max-w-[200px]">
                    <p className={cn("truncate text-[11px]",
                      task.status === "success" ? "text-foreground" :
                      task.status === "failed"  ? "text-red-400" :
                      task.status === "running" ? "text-muted-foreground italic" :
                      "text-muted-foreground"
                    )}>{task.output}</p>
                  </td>
                  <td className="py-2.5 pr-4 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                    {formatDuration(task.durationMs)}
                  </td>
                  <td className="py-2.5 pr-4 whitespace-nowrap text-muted-foreground">
                    {task.tokensUsed ? task.tokensUsed.toLocaleString() : "—"}
                  </td>
                  <td className="py-2.5 pr-4 whitespace-nowrap text-muted-foreground">
                    {formatCost(task.cost)}
                  </td>
                  <td className="py-2.5">
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", s.color, s.bg)}>
                      <Icon className={cn("w-2.5 h-2.5", task.status === "running" && "animate-spin")} />
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
