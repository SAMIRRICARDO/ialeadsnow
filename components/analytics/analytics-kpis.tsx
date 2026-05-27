import { mockEmailMetrics } from "@/lib/mock-analytics";
import { Mail, MailOpen, MousePointer, MessageSquare, AlertTriangle, TrendingUp } from "lucide-react";

export function AnalyticsKpis() {
  const totals = mockEmailMetrics.reduce(
    (acc, p) => ({
      sent:      acc.sent      + p.sent,
      delivered: acc.delivered + p.delivered,
      opened:    acc.opened    + p.opened,
      clicked:   acc.clicked   + p.clicked,
      replied:   acc.replied   + p.replied,
      bounced:   acc.bounced   + p.bounced,
    }),
    { sent: 0, delivered: 0, opened: 0, clicked: 0, replied: 0, bounced: 0 }
  );

  const openRate    = totals.delivered ? ((totals.opened   / totals.delivered) * 100).toFixed(1) : "0";
  const clickRate   = totals.opened    ? ((totals.clicked  / totals.opened)    * 100).toFixed(1) : "0";
  const replyRate   = totals.delivered ? ((totals.replied  / totals.delivered) * 100).toFixed(1) : "0";
  const bounceRate  = totals.sent      ? ((totals.bounced  / totals.sent)      * 100).toFixed(1) : "0";
  const delivRate   = totals.sent      ? ((totals.delivered/ totals.sent)      * 100).toFixed(1) : "0";

  const kpis = [
    { icon: Mail,          label: "Total Enviados",    value: totals.sent.toLocaleString(),   sub: `${delivRate}% entregues`,  color: "text-primary",     bg: "bg-primary/10",     delta: "+44 hoje",      up: true  },
    { icon: MailOpen,      label: "Taxa de Abertura",  value: `${openRate}%`,                 sub: `${totals.opened} opens`,   color: "text-amber-400",   bg: "bg-amber-500/10",   delta: "+5.3pp vs ant.", up: true  },
    { icon: MousePointer,  label: "Taxa de Clique",    value: `${clickRate}%`,                sub: `${totals.clicked} cliques`,color: "text-blue-400",    bg: "bg-blue-500/10",    delta: "+1.2pp vs ant.", up: true  },
    { icon: MessageSquare, label: "Taxa de Resposta",  value: `${replyRate}%`,                sub: `${totals.replied} respostas`,color:"text-emerald-400", bg: "bg-emerald-500/10", delta: "+2.1pp vs ant.", up: true  },
    { icon: AlertTriangle, label: "Taxa de Bounce",    value: `${bounceRate}%`,               sub: `${totals.bounced} bounces`,color: "text-red-400",     bg: "bg-red-500/10",     delta: "-0.4pp vs ant.", up: false },
    { icon: TrendingUp,    label: "Score Médio",       value: "84.2",                         sub: "leads qualificados",       color: "text-violet-400",  bg: "bg-violet-500/10",  delta: "+2.1 vs ant.",   up: true  },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map(({ icon: Icon, label, value, sub, color, bg, delta, up }) => (
        <div key={label} className="glass-card rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            }`}>{delta}</span>
          </div>
          <div>
            <p className={`text-2xl font-bold leading-tight ${color}`}>{value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            <p className="text-[11px] text-muted-foreground/70 mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
