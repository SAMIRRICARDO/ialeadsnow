"use client";

import { AppShell } from "@/components/layout/app-shell";
import { mockApiKeys, mockWebhooks, mockApiUsage } from "@/lib/mock-apis";
import { cn } from "@/lib/utils";
import { Copy, Plus, Trash2, Eye, EyeOff, CheckCircle2, XCircle, Pause, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ApiUsageChart } from "@/components/apis/api-usage-chart";
import type { ApiKey } from "@/lib/mock-apis";

const scopeColor: Record<string, string> = {
  "leads:read":       "bg-blue-500/10 text-blue-400",
  "leads:write":      "bg-indigo-500/10 text-indigo-400",
  "emails:send":      "bg-violet-500/10 text-violet-400",
  "agents:run":       "bg-purple-500/10 text-purple-400",
  "analytics:read":   "bg-cyan-500/10 text-cyan-400",
  "comercial:read":   "bg-emerald-500/10 text-emerald-400",
  "comercial:write":  "bg-teal-500/10 text-teal-400",
};

const statusCfg: Record<ApiKey["status"], { label: string; color: string; bg: string; icon: any }> = {
  active:  { label: "Ativa",   color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
  revoked: { label: "Revogada",color: "text-red-400",     bg: "bg-red-500/10",     icon: XCircle      },
  expired: { label: "Expirada",color: "text-zinc-400",    bg: "bg-zinc-500/10",    icon: XCircle      },
};

const wStatusCfg = {
  active:  { label: "Ativo",   color: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400 animate-pulse" },
  paused:  { label: "Pausado", color: "text-amber-400",   bg: "bg-amber-500/10",   dot: "bg-amber-400"                  },
  failing: { label: "Falhas",  color: "text-red-400",     bg: "bg-red-500/10",     dot: "bg-red-400"                    },
};

function maskKey(key: string) {
  return key.slice(0, 12) + "•".repeat(20) + key.slice(-4);
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m atrás`;
  if (m < 1440) return `${Math.floor(m / 60)}h atrás`;
  return `${Math.floor(m / 1440)}d atrás`;
}

export default function ApisPage() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setRevealed((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <AppShell title="APIs" subtitle="Chaves de API, webhooks e integrações">
      <div className="p-5 space-y-5 max-w-[1600px]">

        {/* Usage chart + stats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <ApiUsageChart />
          </div>
          <div className="glass-card rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Status da API</h3>
            {[
              { label: "Uptime (30d)",       value: "99.94%",  color: "text-emerald-400" },
              { label: "Req. hoje",           value: "2.840",   color: "text-primary"     },
              { label: "Erros hoje",          value: "11",      color: "text-red-400"     },
              { label: "Latência p50",        value: "84ms",    color: "text-emerald-400" },
              { label: "Latência p99",        value: "312ms",   color: "text-amber-400"   },
              { label: "Rate limit",          value: "500K/mês",color: "text-muted-foreground"},
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{label}</span>
                <span className={cn("text-sm font-bold", color)}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Chaves de API</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {mockApiKeys.filter((k) => k.status === "active").length} chaves ativas
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-xs text-primary font-medium">
              <Plus className="w-3.5 h-3.5" /> Nova chave
            </button>
          </div>
          <div className="space-y-3">
            {mockApiKeys.map((key) => {
              const st  = statusCfg[key.status];
              const Icon = st.icon;
              const show = revealed.has(key.id);
              return (
                <div key={key.id} className={cn(
                  "border border-border/50 rounded-xl p-4 space-y-3 transition-colors",
                  key.status === "active" ? "bg-white/[0.02] hover:bg-white/[0.04]" : "opacity-50"
                )}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-foreground">{key.name}</p>
                        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1", st.color, st.bg)}>
                          <Icon className="w-2.5 h-2.5" />{st.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Criada {new Date(key.createdAt).toLocaleDateString("pt-BR")} · Último uso {timeAgo(key.lastUsed)} · {key.requestsMonth.toLocaleString()} req/mês
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => toggle(key.id)} className="p-1.5 rounded-md hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
                        {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {key.status === "active" && (
                        <button className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <code className="block text-[11px] font-mono px-3 py-2 rounded-lg bg-black/30 text-muted-foreground overflow-x-auto">
                    {show ? key.key : maskKey(key.key)}
                  </code>
                  <div className="flex flex-wrap gap-1.5">
                    {key.scopes.map((s) => (
                      <span key={s} className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", scopeColor[s] ?? "bg-zinc-500/10 text-zinc-400")}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Webhooks */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Webhooks</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{mockWebhooks.length} endpoints configurados</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-xs text-primary font-medium">
              <Plus className="w-3.5 h-3.5" /> Novo webhook
            </button>
          </div>
          <div className="space-y-3">
            {mockWebhooks.map((wh) => {
              const cfg = wStatusCfg[wh.status];
              return (
                <div key={wh.id} className="border border-border/50 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors space-y-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
                        <code className="text-xs font-mono text-foreground truncate">{wh.url}</code>
                        <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {wh.deliveries.toLocaleString()} entregas · {wh.successRate}% sucesso · último {timeAgo(wh.lastTriggered)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", cfg.color, cfg.bg)}>{cfg.label}</span>
                      <button className="p-1.5 rounded-md hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
                        <Pause className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {wh.events.map((e) => (
                      <span key={e} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground">{e}</span>
                    ))}
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${wh.successRate}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
