export type Deal = {
  id: string;
  company: string;
  contactName: string;
  role: string;
  email: string;
  stage: "novo" | "contatado" | "respondeu" | "reuniao" | "proposta" | "ganho" | "perdido";
  value: number;
  probability: number;
  score: number;
  source: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  nextAction?: string;
  nextActionAt?: string;
  tags: string[];
  event: string;
};

export type RevenuePoint = {
  month: string;
  pipeline: number;
  ganho: number;
  meta: number;
};

export type TopCompany = {
  rank: number;
  company: string;
  sector: string;
  totalDeals: number;
  totalValue: number;
  stage: string;
  score: number;
  lastContact: string;
};

export const stageConfig: Record<Deal["stage"], { label: string; color: string; bg: string; border: string }> = {
  novo:       { label: "Novo",        color: "text-slate-400",   bg: "bg-slate-500/10",   border: "border-slate-500/20"   },
  contatado:  { label: "Contatado",   color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20"    },
  respondeu:  { label: "Respondeu",   color: "text-indigo-400",  bg: "bg-indigo-500/10",  border: "border-indigo-500/20"  },
  reuniao:    { label: "Reunião",     color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  proposta:   { label: "Proposta",    color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
  ganho:      { label: "Ganho",       color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  perdido:    { label: "Perdido",     color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/20"     },
};

export const mockDeals: Deal[] = [
  {
    id: "d-001", company: "Groq", contactName: "Rafael Costa", role: "Events Lead",
    email: "rafael.costa@groq.com", stage: "reuniao", value: 48000, probability: 75,
    score: 95, source: "ialeads-exclusive", owner: "Samir Ricardo",
    createdAt: "2026-05-27T12:00:00Z", updatedAt: "2026-05-27T13:00:00Z",
    nextAction: "Demo VRASHOWS — enviar proposta", nextActionAt: "2026-05-28T10:00:00Z",
    tags: ["HOT", "AI", "Tech"], event: "Web Summit Rio 2026",
  },
  {
    id: "d-002", company: "Atlassian", contactName: "Fernanda Rocha", role: "Marketing Director",
    email: "fernanda.rocha@atlassian.com", stage: "respondeu", value: 36000, probability: 45,
    score: 78, source: "ialeads-exclusive", owner: "Samir Ricardo",
    createdAt: "2026-05-27T11:30:00Z", updatedAt: "2026-05-27T12:45:00Z",
    nextAction: "Follow-up com case Futurecom", nextActionAt: "2026-05-29T09:00:00Z",
    tags: ["WARM", "SaaS"], event: "Futurecom 2026",
  },
  {
    id: "d-003", company: "Ericsson", contactName: "Isabella Nascimento", role: "Events Marketing Manager",
    email: "isabella.nascimento@ericsson.com", stage: "contatado", value: 72000, probability: 30,
    score: 93, source: "Futurecom 2026", owner: "Samir Ricardo",
    createdAt: "2026-05-27T10:00:00Z", updatedAt: "2026-05-27T10:00:00Z",
    nextAction: "Aguardar resposta D+3", nextActionAt: "2026-05-30T09:00:00Z",
    tags: ["HOT", "Telecom", "Enterprise"], event: "Futurecom 2026",
  },
  {
    id: "d-004", company: "Nokia", contactName: "Carolina Ferreira", role: "Events Marketing Manager",
    email: "carolina.ferreira@nokia.com", stage: "contatado", value: 68000, probability: 28,
    score: 90, source: "Futurecom 2026", owner: "Samir Ricardo",
    createdAt: "2026-05-27T10:05:00Z", updatedAt: "2026-05-27T10:05:00Z",
    nextAction: "Follow-up com deck 5G", nextActionAt: "2026-05-30T10:00:00Z",
    tags: ["HOT", "5G", "Enterprise"], event: "Futurecom 2026",
  },
  {
    id: "d-005", company: "Replit", contactName: "Lucas Mendes", role: "Head of Partnerships",
    email: "lucas.mendes@replit.com", stage: "contatado", value: 24000, probability: 25,
    score: 82, source: "ialeads-exclusive", owner: "Samir Ricardo",
    createdAt: "2026-05-27T11:00:00Z", updatedAt: "2026-05-27T13:47:00Z",
    nextAction: "Aguardar abertura do email", nextActionAt: "2026-05-28T12:00:00Z",
    tags: ["WARM", "Dev", "Cloud"], event: "Web Summit Rio 2026",
  },
  {
    id: "d-006", company: "Mozilla", contactName: "Ana Beatriz Lima", role: "Brand Partnerships",
    email: "ana.lima@mozilla.org", stage: "novo", value: 18000, probability: 15,
    score: 71, source: "ialeads-exclusive", owner: "Samir Ricardo",
    createdAt: "2026-05-26T09:00:00Z", updatedAt: "2026-05-26T09:00:00Z",
    nextAction: "Enviar cold outreach", nextActionAt: "2026-05-28T08:00:00Z",
    tags: ["WARM", "Open Source"], event: "Web Summit Rio 2026",
  },
  {
    id: "d-007", company: "Forte Telecom", contactName: "Lucas Silva", role: "Events Manager",
    email: "lucas.silva@fortetelecom.com.br", stage: "novo", value: 22000, probability: 15,
    score: 82, source: "batch-02", owner: "Samir Ricardo",
    createdAt: "2026-05-27T13:28:00Z", updatedAt: "2026-05-27T13:28:00Z",
    nextAction: "Enviar outreach batch-02", nextActionAt: "2026-05-28T09:00:00Z",
    tags: ["WARM", "Telecom"], event: "Futurecom 2026",
  },
  {
    id: "d-008", company: "Huge Networks", contactName: "Mariana Costa", role: "Marketing Manager",
    email: "mariana.costa@hugenetworks.com.br", stage: "novo", value: 19000, probability: 15,
    score: 79, source: "batch-02", owner: "Samir Ricardo",
    createdAt: "2026-05-27T13:28:00Z", updatedAt: "2026-05-27T13:28:00Z",
    nextAction: "Enviar outreach batch-02", nextActionAt: "2026-05-28T09:00:00Z",
    tags: ["WARM", "Network"], event: "Futurecom 2026",
  },
  {
    id: "d-009", company: "Ciena", contactName: "Rafael Mendes", role: "Events Director",
    email: "rafael.mendes@ciena.com", stage: "proposta", value: 55000, probability: 65,
    score: 88, source: "Futurecom 2025", owner: "Samir Ricardo",
    createdAt: "2026-05-10T10:00:00Z", updatedAt: "2026-05-25T14:00:00Z",
    nextAction: "Aguardar aprovação interna", nextActionAt: "2026-05-30T17:00:00Z",
    tags: ["HOT", "Optical", "Enterprise"], event: "Futurecom 2026",
  },
  {
    id: "d-010", company: "Ascenty", contactName: "Thais Araujo", role: "Marketing Manager",
    email: "thais.araujo@ascenty.com", stage: "ganho", value: 42000, probability: 100,
    score: 91, source: "Futurecom 2025", owner: "Samir Ricardo",
    createdAt: "2026-04-15T09:00:00Z", updatedAt: "2026-05-20T16:00:00Z",
    nextAction: "Executar contrato", nextActionAt: "2026-06-01T10:00:00Z",
    tags: ["Data Center", "Enterprise"], event: "Futurecom 2026",
  },
  {
    id: "d-011", company: "Ellalink", contactName: "João Pereira", role: "Business Dev",
    email: "joao.pereira@ellalink.com", stage: "ganho", value: 38000, probability: 100,
    score: 85, source: "Futurecom 2025", owner: "Samir Ricardo",
    createdAt: "2026-04-20T09:00:00Z", updatedAt: "2026-05-15T11:00:00Z",
    nextAction: "Onboarding VRASHOWS", nextActionAt: "2026-06-03T10:00:00Z",
    tags: ["Cable", "Submarine"], event: "Futurecom 2026",
  },
  {
    id: "d-012", company: "Datora Arqia", contactName: "Rafael Mendonça", role: "Mkt Director",
    email: "rafael.mendonca@datora.net", stage: "perdido", value: 28000, probability: 0,
    score: 72, source: "Futurecom 2025", owner: "Samir Ricardo",
    createdAt: "2026-04-01T09:00:00Z", updatedAt: "2026-05-10T10:00:00Z",
    nextAction: "Re-ativar em Q3 2026", nextActionAt: "2026-08-01T09:00:00Z",
    tags: ["IoT", "Connectivity"], event: "Futurecom 2026",
  },
];

export const mockRevenue: RevenuePoint[] = [
  { month: "Jan",  pipeline: 120000, ganho: 0,      meta: 80000  },
  { month: "Fev",  pipeline: 145000, ganho: 38000,  meta: 80000  },
  { month: "Mar",  pipeline: 168000, ganho: 42000,  meta: 100000 },
  { month: "Abr",  pipeline: 210000, ganho: 80000,  meta: 100000 },
  { month: "Mai",  pipeline: 482000, ganho: 80000,  meta: 120000 },
  { month: "Jun*", pipeline: 310000, ganho: 0,       meta: 150000 },
];

export const mockTopCompanies: TopCompany[] = [
  { rank: 1, company: "Ericsson",    sector: "Telecom",      totalDeals: 1, totalValue: 72000, stage: "Contatado", score: 93, lastContact: "2026-05-27" },
  { rank: 2, company: "Nokia",       sector: "Telecom / 5G", totalDeals: 1, totalValue: 68000, stage: "Contatado", score: 90, lastContact: "2026-05-27" },
  { rank: 3, company: "Ciena",       sector: "Optical Net",  totalDeals: 1, totalValue: 55000, stage: "Proposta",  score: 88, lastContact: "2026-05-25" },
  { rank: 4, company: "Groq",        sector: "AI Infra",     totalDeals: 1, totalValue: 48000, stage: "Reunião",   score: 95, lastContact: "2026-05-27" },
  { rank: 5, company: "Ascenty",     sector: "Data Center",  totalDeals: 1, totalValue: 42000, stage: "Ganho",     score: 91, lastContact: "2026-05-20" },
  { rank: 6, company: "Ellalink",    sector: "Cable",        totalDeals: 1, totalValue: 38000, stage: "Ganho",     score: 85, lastContact: "2026-05-15" },
  { rank: 7, company: "Atlassian",   sector: "SaaS",         totalDeals: 1, totalValue: 36000, stage: "Respondeu", score: 78, lastContact: "2026-05-27" },
  { rank: 8, company: "Forte Telecom",sector:"Telecom",      totalDeals: 1, totalValue: 22000, stage: "Novo",      score: 82, lastContact: "2026-05-27" },
];
