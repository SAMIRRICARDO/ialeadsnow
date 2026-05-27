import { mockAgents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Clock, Bot } from "lucide-react";

const typeColor: Record<string, string> = {
  sourcing:      "bg-indigo-500/15 text-indigo-400",
  outreach:      "bg-violet-500/15 text-violet-400",
  enrichment:    "bg-cyan-500/15 text-cyan-400",
  qualification: "bg-amber-500/15 text-amber-400",
  followup:      "bg-pink-500/15 text-pink-400",
};

type QueueItem = {
  id: string; agentId: string; agentName: string; agentType: string;
  task: string; target: string; priority: "high" | "normal" | "low"; eta: string;
};

const mockQueue: QueueItem[] = [
  { id: "q-001", agentId: "agent-outreach-01", agentName: "Outreach Builder", agentType: "outreach",      task: "build_email",      target: "lucas.silva@fortetelecom.com.br",   priority: "high",   eta: "~1min"  },
  { id: "q-002", agentId: "agent-outreach-01", agentName: "Outreach Builder", agentType: "outreach",      task: "build_email",      target: "mariana.costa@hugenetworks.com.br", priority: "high",   eta: "~2min"  },
  { id: "q-003", agentId: "agent-qualify-01",  agentName: "Qualification AI", agentType: "qualification", task: "qualify_lead",     target: "Forte Telecom — 3 leads",           priority: "normal", eta: "~3min"  },
  { id: "q-004", agentId: "agent-sourcing-01", agentName: "Lead Sourcer",     agentType: "sourcing",      task: "source_leads",     target: "segment=saas&limit=50",             priority: "low",    eta: "~10min" },
  { id: "q-005", agentId: "agent-qualify-01",  agentName: "Qualification AI", agentType: "qualification", task: "re_qualify_batch", target: "batch-01 — 44 leads revisão",       priority: "low",    eta: "~15min" },
];

const priorityBadge = {
  high:   "bg-red-500/10 text-red-400",
  normal: "bg-blue-500/10 text-blue-400",
  low:    "bg-zinc-500/10 text-zinc-400",
};

export function TaskQueue() {
  const totalQueued = mockAgents.reduce((s, a) => s + a.tasksQueued, 0);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Fila de Tasks</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{totalQueued} tasks pendentes</p>
        </div>
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400">
          {mockQueue.length} na fila
        </span>
      </div>

      <div className="space-y-2">
        {mockQueue.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
            <span className="text-[10px] font-mono text-muted-foreground/50 w-4 shrink-0">{i + 1}</span>
            <div className={cn("flex items-center justify-center w-7 h-7 rounded-md shrink-0", typeColor[item.agentType])}>
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">{item.agentName}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">{item.task}</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">{item.target}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", priorityBadge[item.priority])}>
                {item.priority}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />{item.eta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
