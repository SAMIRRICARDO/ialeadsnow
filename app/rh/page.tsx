import { AppShell } from "@/components/layout/app-shell";
import { mockTeam, mockOpenPositions } from "@/lib/mock-rh";
import { cn } from "@/lib/utils";
import { Users, TrendingUp, Briefcase, Award, Plus, MapPin, Calendar, ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/mock-rh";
import { RhPerfChart } from "@/components/rh/rh-perf-chart";

const deptConfig: Record<TeamMember["department"], { label: string; cls: string }> = {
  lideranca:  { label: "Liderança",  cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"  },
  tecnico:    { label: "Técnico",    cls: "bg-blue-500/10 text-blue-400 border-blue-500/20"         },
  design:     { label: "Design",     cls: "bg-violet-500/10 text-violet-400 border-violet-500/20"   },
  comercial:  { label: "Comercial",  cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
  operacoes:  { label: "Operações",  cls: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"   },
};

const statusCfg: Record<TeamMember["status"], { label: string; dot: string; cls: string }> = {
  ativo:   { label: "Ativo",   dot: "bg-emerald-400", cls: "text-emerald-400" },
  remoto:  { label: "Remoto",  dot: "bg-blue-400",    cls: "text-blue-400"    },
  ferias:  { label: "Férias",  dot: "bg-amber-400",   cls: "text-amber-400"   },
  licenca: { label: "Licença", dot: "bg-red-400",     cls: "text-red-400"     },
};

const prioConfig = {
  alta:  "text-red-400 bg-red-500/10 border-red-500/20",
  media: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  baixa: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
};

const typeConfig = {
  clt:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pj:      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  estagio: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const avatarPalette = [
  "from-indigo-500/50 to-purple-600/50",
  "from-blue-500/50 to-cyan-600/50",
  "from-emerald-500/50 to-teal-600/50",
  "from-rose-500/50 to-pink-600/50",
  "from-amber-500/50 to-orange-600/50",
  "from-violet-500/50 to-purple-600/50",
  "from-cyan-500/50 to-blue-600/50",
];

function timeAt(iso: string) {
  const months = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months < 12) return `${months}m`;
  return `${Math.floor(months / 12)}a ${months % 12}m`;
}

const avgPerf = Math.round(mockTeam.reduce((s, m) => s + m.performance, 0) / mockTeam.length);

export default function RhPage() {
  const active = mockTeam.filter((m) => m.status !== "ferias" && m.status !== "licenca").length;

  return (
    <AppShell title="RH" subtitle="Equipe, performance e posições abertas">
      <div className="p-5 space-y-4 max-w-[1600px]">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users,      label: "Headcount",       value: mockTeam.length,          sub: `${active} ativos agora`,   color: "text-primary",     bg: "bg-primary/8",        ring: "ring-primary/15"     },
            { icon: TrendingUp, label: "Performance Méd.", value: `${avgPerf}`,             sub: "team avg · maio 2026",     color: "text-emerald-400", bg: "bg-emerald-500/8",    ring: "ring-emerald-500/15" },
            { icon: Briefcase,  label: "Vagas Abertas",    value: mockOpenPositions.length, sub: "em recrutamento ativo",    color: "text-amber-400",   bg: "bg-amber-500/8",      ring: "ring-amber-500/15"   },
            { icon: Award,      label: "Top Performer",    value: "Samir",                  sub: "score 97 · maio 2026",     color: "text-yellow-400",  bg: "bg-yellow-500/8",     ring: "ring-yellow-500/15"  },
          ].map(({ icon: Icon, label, value, sub, color, bg, ring }) => (
            <div key={label} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ring-1", bg, ring)}>
                <Icon className={cn("w-5 h-5", color)} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.07em] font-semibold opacity-70">{label}</p>
                <p className={cn("text-xl font-bold leading-tight tabular-nums mt-0.5", color)}>{value}</p>
                <p className="text-[10px] text-muted-foreground opacity-60 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team table + perf chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass-card rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <div>
                <h3 className="text-[13px] font-semibold text-foreground">Time</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">{mockTeam.length} colaboradores</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/12 hover:bg-primary/18 text-[11px] font-semibold text-primary transition-colors">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    {["Pessoa", "Departamento", "Local", "Empresa há", "Tasks/mês", "Performance", "Status"].map((h) => (
                      <th key={h}
                        className="px-4 py-2.5 text-left data-table-header whitespace-nowrap first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockTeam.map((m, idx) => {
                    const st         = statusCfg[m.status];
                    const dept       = deptConfig[m.department];
                    const perfColor  = m.performance >= 92 ? "#4ade80" : m.performance >= 85 ? "#818cf8" : "#fbbf24";
                    const perfText   = m.performance >= 92 ? "text-emerald-400" : m.performance >= 85 ? "text-primary" : "text-amber-400";
                    return (
                      <tr key={m.id} className="table-row-hover border-b border-border/25 last:border-0 cursor-pointer">
                        <td className="px-4 pl-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center shrink-0",
                              avatarPalette[idx % avatarPalette.length]
                            )}>
                              <span className="text-[9px] font-bold text-white/90">{m.avatar}</span>
                            </div>
                            <div>
                              <p className="text-[12px] font-semibold text-foreground whitespace-nowrap">{m.name}</p>
                              <p className="text-[10px] text-muted-foreground opacity-70 truncate max-w-[140px] mt-0.5">{m.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md border whitespace-nowrap leading-none", dept.cls)}>
                            {dept.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                            <MapPin className="w-3 h-3 shrink-0 opacity-60" />
                            <span className="text-[11px]">{m.location.split(",")[0]}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3 opacity-60" />
                            <span className="text-[11px] tabular-nums">{timeAt(m.since)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[12px] font-bold text-foreground tabular-nums">{m.tasksMonth || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-14 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${m.performance}%`, background: perfColor }} />
                            </div>
                            <span className={cn("text-[12px] font-bold tabular-nums", perfText)}>{m.performance}</span>
                          </div>
                        </td>
                        <td className="px-4 pr-5 py-3">
                          <span className={cn("flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap", st.cls)}>
                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", st.dot)} />
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <RhPerfChart />
        </div>

        {/* Open positions */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Vagas Abertas</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 opacity-75">
                {mockOpenPositions.length} posições em recrutamento
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/12 hover:bg-primary/18 text-[11px] font-semibold text-primary transition-colors">
              <Plus className="w-3 h-3" /> Nova vaga
            </button>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {mockOpenPositions.map((pos) => (
              <div key={pos.id}
                className="group rounded-xl p-4 space-y-3.5 border border-white/[0.06] bg-white/[0.025] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-bold text-foreground">{pos.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 opacity-70">{pos.department}</p>
                  </div>
                  <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 uppercase", prioConfig[pos.priority])}>
                    {pos.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase", typeConfig[pos.type])}>
                    {pos.type}
                  </span>
                  <span className="text-[11px] text-muted-foreground opacity-70 tabular-nums">
                    {pos.candidates} candidatos
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                    <div className="h-full rounded-full bg-primary/50 transition-all duration-700"
                      style={{ width: `${Math.min(pos.candidates * 8, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground opacity-50">
                    <span>Pipeline</span>
                    <span>{Math.min(pos.candidates * 8, 100)}%</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border/50 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-white/10 transition-all opacity-0 group-hover:opacity-100">
                  Ver candidatos <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
