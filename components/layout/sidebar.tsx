"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Bot,
  CreditCard,
  Code2,
  Settings,
  Zap,
} from "lucide-react";

const navGroups = [
  {
    label: "Principal",
    items: [
      { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
    ],
  },
  {
    label: "Operações",
    items: [
      { label: "Comercial",  href: "/comercial",  icon: TrendingUp, badge: 18 },
      { label: "Financeiro", href: "/financeiro", icon: DollarSign },
      { label: "RH",         href: "/rh",         icon: Users },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { label: "Analytics",  href: "/analytics",  icon: BarChart3 },
      { label: "Agentes IA", href: "/agentes",    icon: Bot, badge: 3 },
    ],
  },
  {
    label: "Plataforma",
    items: [
      { label: "Billing",        href: "/billing",        icon: CreditCard },
      { label: "APIs",           href: "/apis",           icon: Code2 },
      { label: "Configurações",  href: "/configuracoes",  icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-[220px] shrink-0 h-screen bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] overflow-hidden">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-[52px] border-b border-[var(--sidebar-border)] shrink-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 glow-primary shrink-0">
          <Zap className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[13px] font-bold text-foreground tracking-tight leading-none">
            IALEADSNOW
          </p>
          <p className="text-[10px] text-[var(--sidebar-foreground)] leading-none mt-[3px] opacity-60">
            Enterprise Platform
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="section-label px-2.5 mb-1.5">{group.label}</p>
            <div className="space-y-px">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative group flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] transition-all duration-150 select-none",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
                    )}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-r-full bg-primary" />
                    )}

                    <Icon
                      className={cn(
                        "w-[15px] h-[15px] shrink-0 transition-opacity",
                        isActive ? "text-primary opacity-100" : "opacity-50 group-hover:opacity-80"
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    <span className="flex-1 truncate">{item.label}</span>

                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-px rounded-full leading-none tabular-nums",
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-white/8 text-[var(--sidebar-foreground)]"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-3 py-3 border-t border-[var(--sidebar-border)]">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--sidebar-accent)] transition-colors cursor-pointer group">
          <div className="relative shrink-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">SR</span>
            </div>
            <span className="absolute -bottom-px -right-px w-2 h-2 rounded-full bg-emerald-400 border-2 border-[var(--sidebar)] status-online" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-foreground truncate leading-none">Samir Ricardo</p>
            <p className="text-[10px] text-[var(--sidebar-foreground)] truncate mt-0.5 opacity-70">Admin · Enterprise</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-[var(--sidebar-foreground)] opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
        </div>
      </div>
    </aside>
  );
}
