import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import {
  User, Bell, Shield, Palette, Globe, Key,
  CheckCircle2, AlertTriangle, Zap, Mail, Database,
  MessageSquare, GitBranch, Webhook,
} from "lucide-react";

type ToggleProps = { enabled: boolean; label: string; description: string };
function Toggle({ enabled, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0">
      <div>
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className={cn(
        "w-10 h-5 rounded-full flex items-center shrink-0 px-0.5 transition-colors cursor-pointer",
        enabled ? "bg-primary justify-end" : "bg-white/10 justify-start"
      )}>
        <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
      </div>
    </div>
  );
}

type IntegrationCardProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  detail?: string;
};
function IntegrationCard({ icon, name, description, status, detail }: IntegrationCardProps) {
  const cfg = {
    connected:    { label: "Conectado",    color: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
    disconnected: { label: "Desconectado", color: "text-zinc-400",    bg: "bg-zinc-500/10",    dot: "bg-zinc-500"    },
    error:        { label: "Erro",         color: "text-red-400",     bg: "bg-red-500/10",     dot: "bg-red-400"     },
  }[status];
  return (
    <div className="border border-border/50 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex items-start gap-3">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-xs font-semibold text-foreground">{name}</p>
          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1", cfg.color, cfg.bg)}>
            <span className={cn("w-1 h-1 rounded-full", cfg.dot)} />{cfg.label}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">{description}</p>
        {detail && <p className="text-[10px] text-muted-foreground/60 mt-0.5 font-mono">{detail}</p>}
      </div>
      <button className={cn("text-[11px] font-medium px-2.5 py-1 rounded-lg shrink-0 transition-colors",
        status === "connected"
          ? "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
          : "text-primary bg-primary/10 hover:bg-primary/20"
      )}>
        {status === "connected" ? "Desconectar" : "Conectar"}
      </button>
    </div>
  );
}

const sections = [
  { icon: User,    label: "Conta"         },
  { icon: Bell,    label: "Notificações"  },
  { icon: Shield,  label: "Segurança"     },
  { icon: Palette, label: "Aparência"     },
  { icon: Globe,   label: "Integrações"   },
  { icon: Key,     label: "Zona de risco" },
];

export default function ConfiguracoesPage() {
  return (
    <AppShell title="Configurações" subtitle="Conta, preferências e integrações da plataforma">
      <div className="p-5 max-w-[1600px]">
        <div className="flex gap-6">

          {/* Sidebar nav */}
          <div className="w-44 shrink-0 hidden xl:block">
            <nav className="space-y-0.5 sticky top-5">
              {sections.map(({ icon: Icon, label }, i) => (
                <a key={label} href={`#${label.toLowerCase().replace(" ", "-")}`}
                  className={cn("flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors",
                    i === 0 ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />{label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Conta */}
            <section id="conta" className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Perfil da Conta
              </h3>
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/40">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-indigo-300">SR</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Samir Ricardo</p>
                  <p className="text-[11px] text-muted-foreground">eliteasamir@gmail.com</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary mt-1 inline-block">
                    Admin · Enterprise
                  </span>
                </div>
                <button className="ml-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/8 text-xs text-muted-foreground hover:text-foreground border border-border transition-colors">
                  Editar perfil
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Nome completo",     value: "Samir Ricardo"          },
                  { label: "Email",             value: "eliteasamir@gmail.com"  },
                  { label: "Empresa",           value: "VRASHOWS"               },
                  { label: "Cargo",             value: "CEO / Head de Produto"  },
                  { label: "Fuso horário",      value: "America/Sao_Paulo (BRT)" },
                  { label: "Idioma",            value: "Português (Brasil)"     },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/50">
                      <span className="text-xs text-foreground">{value}</span>
                      <button className="text-[10px] text-primary hover:underline">Editar</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Notificações */}
            <section id="notificacoes" className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" /> Notificações
              </h3>
              <Toggle enabled={true}  label="Email — Lead qualificado"     description="Receber email quando um lead for classificado como HOT" />
              <Toggle enabled={true}  label="Email — Resposta recebida"     description="Notificar quando um lead responder ao outreach" />
              <Toggle enabled={false} label="Email — Resumo diário"         description="Relatório diário de métricas enviado às 08h" />
              <Toggle enabled={true}  label="Push — Agente com erro"        description="Alerta imediato quando um agente falhar" />
              <Toggle enabled={false} label="Push — Meta mensal atingida"   description="Notificar ao atingir 80% e 100% da meta" />
              <Toggle enabled={true}  label="Slack — Deal ganho"            description="Notificação no canal #comercial quando deal for ganho" />
            </section>

            {/* Segurança */}
            <section id="seguranca" className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Segurança
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Autenticação 2FA",     status: true,  detail: "Ativo via app autenticador" },
                  { label: "SSO / SAML",           status: false, detail: "Disponível no plano Enterprise" },
                  { label: "Sessões ativas",        status: true,  detail: "2 sessões — Chrome / Windows 11" },
                  { label: "Log de auditoria",      status: true,  detail: "Retendo 90 dias de histórico" },
                ].map(({ label, status, detail }) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-2.5 border-b border-border/40 last:border-0">
                    <div className="flex items-center gap-2.5">
                      {status
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        : <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                      <div>
                        <p className="text-xs font-medium text-foreground">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{detail}</p>
                      </div>
                    </div>
                    <button className="text-[11px] text-primary hover:underline shrink-0">
                      {status ? "Gerenciar" : "Ativar"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Integrações */}
            <section id="integracoes" className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Integrações
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <IntegrationCard icon={<Mail    className="w-4 h-4 text-blue-400"  />} name="Resend"         description="Envio de emails transacionais e outreach" status="connected"    detail="resend.com · vrashows.com.br" />
                <IntegrationCard icon={<Zap     className="w-4 h-4 text-violet-400"/>} name="Anthropic API"  description="Modelos Claude para agentes IA"          status="connected"    detail="claude-sonnet-4-6 · claude-haiku-4-5" />
                <IntegrationCard icon={<Database className="w-4 h-4 text-cyan-400"/>}  name="PostgreSQL"     description="Banco de dados principal + pgvector"     status="connected"    detail="localhost:5433 · ai_lab" />
                <IntegrationCard icon={<Webhook  className="w-4 h-4 text-amber-400"/>} name="Webhooks"       description="Endpoints de eventos Resend"             status="connected"    detail="3 endpoints ativos" />
                <IntegrationCard icon={<MessageSquare className="w-4 h-4 text-pink-400" />} name="Slack"          description="Notificações e alertas no workspace"     status="disconnected" />
                <IntegrationCard icon={<GitBranch     className="w-4 h-4 text-foreground"/>}name="GitHub"         description="Deploy automático e CI/CD"               status="disconnected" />
              </div>
            </section>

            {/* Zona de risco */}
            <section id="zona-de-risco" className="glass-card rounded-xl p-5 border-red-500/20">
              <h3 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Zona de Risco
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Resetar todos os dados de leads",   desc: "Remove todos os leads, campanhas e logs de outbound. Irreversível.",    btn: "Resetar leads"  },
                  { label: "Revogar todas as chaves de API",    desc: "Desativa todas as chaves de API imediatamente. Integrações serão quebradas.", btn: "Revogar chaves"},
                  { label: "Deletar conta e dados",            desc: "Remove permanentemente a conta, todos os dados e cancela o plano.",     btn: "Deletar conta" },
                ].map(({ label, desc, btn }) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-3 border-b border-red-500/10 last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 font-medium transition-colors shrink-0 border border-red-500/20">
                      {btn}
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
