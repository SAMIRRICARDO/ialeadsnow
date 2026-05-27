import { mockAgents } from "@/lib/mock-data";
import { mockTaskLog } from "@/lib/mock-agents";
import { TrendingUp, Zap, Clock, CheckCircle } from "lucide-react";

export function AgentKpis() {
  const running   = mockAgents.filter((a) => a.status === "running").length;
  const totalDone = mockAgents.reduce((s, a) => s + a.tasksCompleted, 0);
  const avgOk     = (mockAgents.reduce((s, a) => s + a.successRate, 0) / mockAgents.length).toFixed(1);
  const avgLatMs  = Math.round(mockAgents.reduce((s, a) => s + a.avgLatencyMs, 0) / mockAgents.length);
  const todayTasks = mockTaskLog.filter((t) => t.status === "success").length;

  const kpis = [
    { icon: Zap,          label: "Agentes Ativos",     value: `${running} / ${mockAgents.length}`,    color: "text-primary",     bg: "bg-primary/10" },
    { icon: CheckCircle,  label: "Tasks Concluídas",   value: totalDone.toLocaleString(),              color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: TrendingUp,   label: "Taxa de Sucesso",    value: `${avgOk}%`,                            color: "text-amber-400",   bg: "bg-amber-500/10" },
    { icon: Clock,        label: "Latência Média",     value: `${avgLatMs}ms`,                        color: "text-blue-400",    bg: "bg-blue-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map(({ icon: Icon, label, value, color, bg }) => (
        <div key={label} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4">
          <div className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${bg}`}>
            <Icon className={`w-4.5 h-4.5 ${color}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`text-xl font-bold leading-tight mt-0.5 ${color}`}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
