import { mockInvoices } from "@/lib/mock-financeiro";
import type { Invoice } from "@/lib/mock-financeiro";
import { cn } from "@/lib/utils";
import { FileText, Plus, Download } from "lucide-react";

const statusCfg: Record<Invoice["status"], { label: string; cls: string }> = {
  pago:     { label: "Pago",     cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pendente: { label: "Pendente", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20"           },
  atrasado: { label: "Atrasado", cls: "bg-red-500/10 text-red-400 border-red-500/20"              },
  rascunho: { label: "Rascunho", cls: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"           },
};

const typeCfg: Record<Invoice["type"], string> = {
  projeto:     "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  retainer:    "bg-violet-500/10 text-violet-400 border-violet-500/20",
  consultoria: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  licenca:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function daysUntil(iso: string) {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  if (days < 0)   return { label: `${Math.abs(days)}d atraso`, cls: "text-red-400 font-bold"    };
  if (days === 0) return { label: "Hoje",                      cls: "text-amber-400 font-bold"   };
  if (days <= 7)  return { label: `${days}d`,                  cls: "text-amber-400 font-semibold"};
  return           { label: `${days}d`,                        cls: "text-muted-foreground opacity-70" };
}

export function InvoicesTable() {
  const totalPago    = mockInvoices.filter((i) => i.status === "pago").reduce((s, i) => s + i.value, 0);
  const totalPending = mockInvoices.filter((i) => i.status !== "pago" && i.status !== "rascunho").reduce((s, i) => s + i.value, 0);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 flex-wrap gap-3">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Faturas</h3>
          <div className="flex items-center gap-3 mt-1 text-[11px]">
            <span className="text-muted-foreground opacity-75">
              Recebido: <span className="text-emerald-400 font-bold">R$ {(totalPago / 1000).toFixed(0)}K</span>
            </span>
            <span className="text-border">·</span>
            <span className="text-muted-foreground opacity-75">
              A receber: <span className="text-blue-400 font-bold">R$ {(totalPending / 1000).toFixed(0)}K</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-white/[0.03] hover:bg-white/[0.05] text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-3 h-3" /> Exportar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/12 hover:bg-primary/18 text-[11px] font-semibold text-primary transition-colors">
            <Plus className="w-3 h-3" /> Nova fatura
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              {["Número", "Cliente", "Descrição", "Valor", "Emissão", "Venc.", "Prazo", "Tipo", "Status", ""].map((h) => (
                <th key={h + Math.random()}
                  className="px-4 py-2.5 text-left data-table-header whitespace-nowrap first:pl-5 last:pr-5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv) => {
              const st   = statusCfg[inv.status];
              const due  = daysUntil(inv.due);
              const type = typeCfg[inv.type] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
              return (
                <tr key={inv.id}
                  className={cn(
                    "table-row-hover border-b border-border/25 last:border-0 group cursor-pointer",
                    inv.status === "atrasado" && "bg-red-500/[0.025]"
                  )}>
                  <td className="px-4 pl-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                      <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-semibold text-foreground whitespace-nowrap">{inv.client}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-[11px] text-muted-foreground opacity-70 truncate">{inv.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-bold text-foreground whitespace-nowrap tabular-nums">
                      R$ {inv.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-muted-foreground opacity-70 whitespace-nowrap tabular-nums">{formatDate(inv.issued)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-muted-foreground opacity-70 whitespace-nowrap tabular-nums">{formatDate(inv.due)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {inv.status !== "pago" && inv.status !== "rascunho"
                      ? <span className={cn("text-[11px] tabular-nums", due.cls)}>{due.label}</span>
                      : <span className="text-muted-foreground/30 text-[11px]">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md border capitalize whitespace-nowrap leading-none", type)}>
                      {inv.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md border whitespace-nowrap leading-none", st.cls)}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 pr-5 py-3">
                    <button className="p-1 rounded-md hover:bg-white/5 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </button>
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
