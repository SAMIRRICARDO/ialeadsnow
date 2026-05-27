"use client";

import { Bell, Search, RefreshCw, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const pageMap: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":    { title: "Dashboard",    subtitle: "Visão consolidada em tempo real" },
  "/comercial":    { title: "Comercial",    subtitle: "Pipeline, deals e oportunidades" },
  "/financeiro":   { title: "Financeiro",   subtitle: "Receita, cashflow e projeções" },
  "/rh":           { title: "RH",           subtitle: "Equipe, performance e headcount" },
  "/analytics":    { title: "Analytics",    subtitle: "Email, segmentos e conversões" },
  "/agentes":      { title: "Agentes IA",   subtitle: "Runtime, logs e orquestração" },
  "/billing":      { title: "Billing",      subtitle: "Plano, uso e histórico de cobranças" },
  "/apis":         { title: "APIs",         subtitle: "Chaves, webhooks e integrações" },
  "/configuracoes":{ title: "Configurações",subtitle: "Conta, segurança e preferências" },
};

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const pathname = usePathname();
  const page = pageMap[pathname] ?? { title, subtitle: subtitle ?? "" };

  return (
    <header className="flex items-center h-[52px] px-5 border-b border-border shrink-0 gap-3"
      style={{ background: "rgba(7,7,14,0.85)", backdropFilter: "blur(20px)" }}>

      {/* Breadcrumb + title */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-[11px] text-muted-foreground hidden sm:inline font-medium opacity-60">
          IALEADSNOW
        </span>
        <ChevronRight className="w-3 h-3 text-muted-foreground/40 hidden sm:inline shrink-0" />
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-[13px] font-semibold text-foreground truncate leading-none">
            {page.title}
          </h1>
          {page.subtitle && (
            <>
              <span className="text-muted-foreground/30 hidden md:inline">·</span>
              <p className="text-[11px] text-muted-foreground truncate hidden md:block opacity-75">
                {page.subtitle}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Search */}
      <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-muted-foreground transition-colors w-56 group"
        style={{ background: "rgba(255,255,255,0.032)" }}>
        <Search className="w-3.5 h-3.5 shrink-0 opacity-60" />
        <span className="flex-1 text-left text-[12px] opacity-60">Buscar...</span>
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </div>
      </button>

      {/* System status */}
      <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20"
        style={{ background: "rgba(74,222,128,0.06)" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-medium text-emerald-400">Sistemas OK</span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-border hidden md:block shrink-0" />

      {/* Refresh */}
      <button className="p-1.5 rounded-md hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
        <RefreshCw className="w-[15px] h-[15px]" />
      </button>

      {/* Notifications */}
      <button className="relative p-1.5 rounded-md hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
        <Bell className="w-[15px] h-[15px]" />
        <span className="absolute top-1 right-1 w-[5px] h-[5px] rounded-full bg-primary" />
      </button>

      {/* User avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 flex items-center justify-center shrink-0 cursor-pointer ring-1 ring-white/10 hover:ring-primary/40 transition-all">
        <span className="text-[10px] font-bold text-white">SR</span>
      </div>
    </header>
  );
}
