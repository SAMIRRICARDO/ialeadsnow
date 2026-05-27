export type FinancePoint = {
  month: string;
  receita: number;
  custo: number;
  lucro: number;
  meta: number;
};

export type CashflowPoint = {
  month: string;
  entradas: number;
  saidas: number;
  saldo: number;
};

export type RevenueCategory = {
  name: string;
  value: number;
  pct: number;
  color: string;
  growth: number;
};

export type CostItem = {
  name: string;
  category: "fixed" | "variable";
  monthly: number;
  pct: number;
  color: string;
};

export type Invoice = {
  id: string;
  client: string;
  description: string;
  value: number;
  issued: string;
  due: string;
  status: "pago" | "pendente" | "atrasado" | "rascunho";
  type: "projeto" | "retainer" | "consultoria" | "licenca";
};

export type ForecastItem = {
  month: string;
  pessimista: number;
  realista: number;
  otimista: number;
};

// ── P&L trend ─────────────────────────────────────────────────────────────────

export const mockFinancePoints: FinancePoint[] = [
  { month: "Jan", receita: 0,      custo: 8200,  lucro: -8200,  meta: 50000 },
  { month: "Fev", receita: 38000,  custo: 9100,  lucro: 28900,  meta: 60000 },
  { month: "Mar", receita: 42000,  custo: 9800,  lucro: 32200,  meta: 70000 },
  { month: "Abr", receita: 80000,  custo: 11200, lucro: 68800,  meta: 80000 },
  { month: "Mai", receita: 80000,  custo: 12400, lucro: 67600,  meta: 90000 },
  { month: "Jun*",receita: 55000,  custo: 13000, lucro: 42000,  meta: 100000 },
  { month: "Jul*",receita: 95000,  custo: 13500, lucro: 81500,  meta: 110000 },
  { month: "Ago*",receita: 110000, custo: 14000, lucro: 96000,  meta: 120000 },
];

// ── Cash flow ─────────────────────────────────────────────────────────────────

export const mockCashflow: CashflowPoint[] = [
  { month: "Jan", entradas: 5000,   saidas: 13200, saldo: -8200  },
  { month: "Fev", entradas: 38000,  saidas: 9100,  saldo: 28900  },
  { month: "Mar", entradas: 48000,  saidas: 9800,  saldo: 38200  },
  { month: "Abr", entradas: 80000,  saidas: 11200, saldo: 68800  },
  { month: "Mai", entradas: 92000,  saidas: 12400, saldo: 79600  },
  { month: "Jun*",entradas: 55000,  saidas: 13000, saldo: 42000  },
];

// ── Revenue categories ────────────────────────────────────────────────────────

export const mockRevenueCategories: RevenueCategory[] = [
  { name: "Produção de Eventos",   value: 160000, pct: 66, color: "#818cf8", growth: 42  },
  { name: "Consultoria Estratégica",value: 48000,  pct: 20, color: "#a78bfa", growth: 18  },
  { name: "Licença SaaS",          value: 24000,  pct: 10, color: "#4ade80", growth: 120 },
  { name: "Treinamentos",          value:  8000,  pct:  4, color: "#fbbf24", growth: -5  },
];

// ── Cost structure ────────────────────────────────────────────────────────────

export const mockCosts: CostItem[] = [
  { name: "Equipe / Freelancers",   category: "fixed",    monthly: 6200,  pct: 50, color: "#818cf8" },
  { name: "Infraestrutura Cloud",   category: "fixed",    monthly: 1800,  pct: 15, color: "#a78bfa" },
  { name: "APIs IA (Anthropic/Resend)", category: "variable", monthly: 840, pct: 7, color: "#c084fc" },
  { name: "Ferramentas SaaS",       category: "fixed",    monthly: 920,   pct: 7,  color: "#4ade80" },
  { name: "Marketing / Eventos",    category: "variable", monthly: 1240,  pct: 10, color: "#fbbf24" },
  { name: "Jurídico / Contábil",    category: "fixed",    monthly: 800,   pct: 6,  color: "#f87171" },
  { name: "Outros",                 category: "variable", monthly: 600,   pct: 5,  color: "#6b6b80" },
];

// ── Invoices ──────────────────────────────────────────────────────────────────

export const mockInvoices: Invoice[] = [
  {
    id: "NF-2026-011", client: "Ascenty", description: "Produção stand + experiência — Futurecom 2026",
    value: 42000, issued: "2026-05-20", due: "2026-06-05",
    status: "pendente", type: "projeto",
  },
  {
    id: "NF-2026-010", client: "Ellalink", description: "Identidade visual + ativação — Futurecom 2026",
    value: 38000, issued: "2026-05-15", due: "2026-06-01",
    status: "pago", type: "projeto",
  },
  {
    id: "NF-2026-009", client: "Ciena", description: "Proposta: produção completa — Futurecom 2026",
    value: 55000, issued: "2026-05-25", due: "2026-06-20",
    status: "rascunho", type: "projeto",
  },
  {
    id: "NF-2026-008", client: "Groq", description: "Consultoria estratégica — posicionamento eventos AI",
    value: 12000, issued: "2026-05-10", due: "2026-05-25",
    status: "pago", type: "consultoria",
  },
  {
    id: "NF-2026-007", client: "Atlassian", description: "Consultoria: presença evento SaaS Brasil",
    value: 8000, issued: "2026-05-01", due: "2026-05-20",
    status: "atrasado", type: "consultoria",
  },
  {
    id: "NF-2026-006", client: "IALEADSNOW Enterprise", description: "Licença plataforma — Mai 2026",
    value: 2400, issued: "2026-05-01", due: "2026-05-10",
    status: "pago", type: "licenca",
  },
  {
    id: "NF-2026-005", client: "IALEADSNOW Enterprise", description: "Licença plataforma — Abr 2026",
    value: 2400, issued: "2026-04-01", due: "2026-04-10",
    status: "pago", type: "licenca",
  },
  {
    id: "NF-2026-004", client: "Nokia", description: "Workshop: eventos enterprise premium — team mktg",
    value: 4500, issued: "2026-04-20", due: "2026-05-05",
    status: "pago", type: "treinamentos" as any,
  },
];

// ── Forecast ──────────────────────────────────────────────────────────────────

export const mockForecast: ForecastItem[] = [
  { month: "Jun", pessimista: 40000,  realista: 65000,  otimista: 90000  },
  { month: "Jul", pessimista: 55000,  realista: 95000,  otimista: 135000 },
  { month: "Ago", pessimista: 70000,  realista: 120000, otimista: 160000 },
  { month: "Set", pessimista: 80000,  realista: 140000, otimista: 185000 },
  { month: "Out", pessimista: 95000,  realista: 165000, otimista: 210000 },
  { month: "Nov", pessimista: 110000, realista: 190000, otimista: 240000 },
];
