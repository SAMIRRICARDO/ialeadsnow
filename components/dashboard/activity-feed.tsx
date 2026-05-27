import { Mail, MailOpen, MessageSquare, UserPlus, Bot, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockActivity } from "@/lib/mock-data";
import type { ActivityEvent } from "@/types";

const eventConfig = {
  email_sent:     { icon: Mail,          color: "bg-indigo-500/12 text-indigo-400",  ring: "ring-indigo-500/20"  },
  email_opened:   { icon: MailOpen,      color: "bg-amber-500/12 text-amber-400",    ring: "ring-amber-500/20"   },
  email_replied:  { icon: MessageSquare, color: "bg-emerald-500/12 text-emerald-400",ring: "ring-emerald-500/20" },
  lead_added:     { icon: UserPlus,      color: "bg-blue-500/12 text-blue-400",      ring: "ring-blue-500/20"    },
  agent_run:      { icon: Bot,           color: "bg-violet-500/12 text-violet-400",  ring: "ring-violet-500/20"  },
  lead_qualified: { icon: Star,          color: "bg-yellow-500/12 text-yellow-400",  ring: "ring-yellow-500/20"  },
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const cfg  = eventConfig[event.type];
  const Icon = cfg.icon;
  return (
    <div className="flex gap-3 py-2.5 border-b border-border/25 last:border-0 group">
      <div className={cn(
        "flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5 ring-1",
        cfg.color, cfg.ring
      )}>
        <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-foreground truncate">{event.title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1 opacity-75">{event.description}</p>
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0 mt-1 tabular-nums opacity-60">
        {formatTime(event.timestamp)}
      </span>
    </div>
  );
}

export function ActivityFeed() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Atividade Recente</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">Últimas 24h</p>
        </div>
        <button className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
          Ver log
        </button>
      </div>
      <div>
        {mockActivity.map((event) => (
          <ActivityRow key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
