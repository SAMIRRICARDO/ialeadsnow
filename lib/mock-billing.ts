export type Plan = {
  name: string;
  price: number;
  billingCycle: "mensal" | "anual";
  features: string[];
  limits: { leads: number; emails: number; agents: number; users: number };
};

export type UsageMetric = {
  label: string;
  used: number;
  limit: number;
  unit: string;
  color: string;
};

export type BillingRecord = {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: "pago" | "pendente" | "falhou";
  invoice: string;
};

export type CreditItem = {
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  balance: number;
};

export const mockPlan: Plan = {
  name: "Enterprise",
  price: 2400,
  billingCycle: "mensal",
  features: [
    "Leads ilimitados", "Agentes IA ilimitados", "Dashboard Master",
    "Webhooks avançados", "API completa", "Suporte prioritário 24/7",
    "SLA 99.9%", "SSO / SAML", "Exportações ilimitadas",
  ],
  limits: { leads: 999999, emails: 50000, agents: 20, users: 25 },
};

export const mockUsage: UsageMetric[] = [
  { label: "Leads processados",  used: 2847,  limit: 999999, unit: "leads",  color: "#818cf8" },
  { label: "Emails enviados",    used: 1204,  limit: 50000,  unit: "emails", color: "#4ade80" },
  { label: "Chamadas de API",    used: 18420, limit: 500000, unit: "req",    color: "#fbbf24" },
  { label: "Tokens IA (maio)",   used: 284000,limit: 5000000,unit: "tokens", color: "#a78bfa" },
  { label: "Agentes ativos",     used: 5,     limit: 20,     unit: "agentes",color: "#60a5fa" },
  { label: "Usuários ativos",    used: 7,     limit: 25,     unit: "users",  color: "#f87171" },
];

export const mockBillingHistory: BillingRecord[] = [
  { id: "b-001", description: "IALEADSNOW Enterprise — Jun 2026", amount: 2400, date: "2026-06-01", status: "pendente", invoice: "INV-2026-006" },
  { id: "b-002", description: "IALEADSNOW Enterprise — Mai 2026", amount: 2400, date: "2026-05-01", status: "pago",     invoice: "INV-2026-005" },
  { id: "b-003", description: "IALEADSNOW Enterprise — Abr 2026", amount: 2400, date: "2026-04-01", status: "pago",     invoice: "INV-2026-004" },
  { id: "b-004", description: "IALEADSNOW Enterprise — Mar 2026", amount: 2400, date: "2026-03-01", status: "pago",     invoice: "INV-2026-003" },
  { id: "b-005", description: "IALEADSNOW Enterprise — Fev 2026", amount: 2400, date: "2026-02-01", status: "pago",     invoice: "INV-2026-002" },
  { id: "b-006", description: "IALEADSNOW Enterprise — Jan 2026", amount: 2400, date: "2026-01-01", status: "pago",     invoice: "INV-2026-001" },
];

export const mockCredits: CreditItem[] = [
  { date: "2026-05-27", description: "Uso — Outreach Builder (44 emails)",    type: "debit",  amount: -0.48, balance: 127.52 },
  { date: "2026-05-27", description: "Uso — Qualification AI (12 leads)",     type: "debit",  amount: -0.14, balance: 128.00 },
  { date: "2026-05-01", description: "Crédito mensal Enterprise",             type: "credit", amount: 128.00,balance: 128.14 },
  { date: "2026-04-30", description: "Uso — Lead Sourcer (25 leads)",         type: "debit",  amount: -0.48, balance: 0.14  },
  { date: "2026-04-01", description: "Crédito mensal Enterprise",             type: "credit", amount: 128.00,balance: 0.62  },
];
