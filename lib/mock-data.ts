import type { Agent, Lead, ActivityEvent, ChartDataPoint, MetricCard, Pipeline } from "@/types";

export const mockMetrics: MetricCard[] = [
  {
    title: "Leads Gerados",
    value: "2,847",
    delta: 18.4,
    deltaLabel: "vs mês anterior",
    trend: "up",
    sparkline: [42, 55, 48, 72, 88, 95, 110, 125, 118, 142, 158, 165],
  },
  {
    title: "Emails Enviados",
    value: "1,204",
    delta: 12.1,
    deltaLabel: "vs mês anterior",
    trend: "up",
    sparkline: [30, 45, 52, 60, 55, 70, 85, 92, 88, 105, 112, 118],
  },
  {
    title: "Taxa de Abertura",
    value: "34.2",
    suffix: "%",
    delta: 5.3,
    deltaLabel: "vs mês anterior",
    trend: "up",
    sparkline: [28, 30, 29, 32, 31, 33, 34, 33, 35, 34, 34, 34],
  },
  {
    title: "Receita Pipeline",
    value: "R$ 482K",
    delta: -3.2,
    deltaLabel: "vs mês anterior",
    trend: "down",
    sparkline: [95, 88, 102, 115, 98, 120, 135, 128, 142, 138, 145, 148],
  },
  {
    title: "Taxa de Resposta",
    value: "8.7",
    suffix: "%",
    delta: 2.1,
    deltaLabel: "vs mês anterior",
    trend: "up",
    sparkline: [5, 6, 5.5, 6.8, 7, 7.5, 8, 7.8, 8.2, 8.5, 8.6, 8.7],
  },
  {
    title: "Reuniões Agendadas",
    value: "23",
    delta: 35.3,
    deltaLabel: "vs mês anterior",
    trend: "up",
    sparkline: [4, 6, 5, 8, 9, 11, 14, 13, 16, 18, 21, 23],
  },
];

export const mockAgents: Agent[] = [
  {
    id: "agent-sourcing-01",
    name: "Lead Sourcer",
    type: "sourcing",
    status: "running",
    tasksCompleted: 1842,
    tasksQueued: 23,
    lastRunAt: "2026-05-27T13:45:00Z",
    successRate: 94.2,
    avgLatencyMs: 1240,
  },
  {
    id: "agent-outreach-01",
    name: "Outreach Builder",
    type: "outreach",
    status: "running",
    tasksCompleted: 1204,
    tasksQueued: 44,
    lastRunAt: "2026-05-27T13:47:00Z",
    successRate: 99.1,
    avgLatencyMs: 380,
  },
  {
    id: "agent-enrich-01",
    name: "Enrichment Agent",
    type: "enrichment",
    status: "idle",
    tasksCompleted: 3201,
    tasksQueued: 0,
    lastRunAt: "2026-05-27T12:30:00Z",
    successRate: 87.5,
    avgLatencyMs: 2100,
  },
  {
    id: "agent-qualify-01",
    name: "Qualification AI",
    type: "qualification",
    status: "running",
    tasksCompleted: 912,
    tasksQueued: 12,
    lastRunAt: "2026-05-27T13:46:00Z",
    successRate: 91.8,
    avgLatencyMs: 890,
  },
  {
    id: "agent-followup-01",
    name: "Follow-up Engine",
    type: "followup",
    status: "paused",
    tasksCompleted: 445,
    tasksQueued: 0,
    lastRunAt: "2026-05-26T18:00:00Z",
    successRate: 82.3,
    avgLatencyMs: 450,
  },
];

export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    company: "Ericsson",
    contactName: "Isabella Nascimento",
    role: "Events Marketing Manager",
    email: "isabella.nascimento@ericsson.com",
    status: "HOT",
    score: 93,
    source: "Futurecom 2026",
    createdAt: "2026-05-27T10:00:00Z",
    stage: "contacted",
  },
  {
    id: "lead-002",
    company: "Nokia",
    contactName: "Carolina Ferreira",
    role: "Events Marketing Manager",
    email: "carolina.ferreira@nokia.com",
    status: "HOT",
    score: 90,
    source: "Futurecom 2026",
    createdAt: "2026-05-27T10:05:00Z",
    stage: "contacted",
  },
  {
    id: "lead-003",
    company: "Groq",
    contactName: "Rafael Costa",
    role: "Events Lead",
    email: "rafael.costa@groq.com",
    status: "HOT",
    score: 95,
    source: "ialeads-exclusive",
    createdAt: "2026-05-27T12:00:00Z",
    stage: "qualified",
  },
  {
    id: "lead-004",
    company: "Atlassian",
    contactName: "Fernanda Rocha",
    role: "Marketing Director",
    email: "fernanda.rocha@atlassian.com",
    status: "WARM",
    score: 78,
    source: "ialeads-exclusive",
    createdAt: "2026-05-27T11:30:00Z",
    lastContactedAt: "2026-05-27T12:45:00Z",
    stage: "replied",
  },
  {
    id: "lead-005",
    company: "Replit",
    contactName: "Lucas Mendes",
    role: "Head of Partnerships",
    email: "lucas.mendes@replit.com",
    status: "WARM",
    score: 82,
    source: "ialeads-exclusive",
    createdAt: "2026-05-27T11:00:00Z",
    stage: "contacted",
  },
  {
    id: "lead-006",
    company: "Mozilla",
    contactName: "Ana Beatriz Lima",
    role: "Brand Partnerships",
    email: "ana.lima@mozilla.org",
    status: "WARM",
    score: 71,
    source: "ialeads-exclusive",
    createdAt: "2026-05-26T09:00:00Z",
    stage: "new",
  },
  {
    id: "lead-007",
    company: "Forte Telecom",
    contactName: "Lucas Silva",
    role: "Events Manager",
    email: "lucas.silva@fortetelecom.com.br",
    status: "WARM",
    score: 82,
    source: "batch-02",
    createdAt: "2026-05-27T13:28:00Z",
    stage: "new",
  },
  {
    id: "lead-008",
    company: "Huge Networks",
    contactName: "Mariana Costa",
    role: "Marketing Manager",
    email: "mariana.costa@hugenetworks.com.br",
    status: "WARM",
    score: 79,
    source: "batch-02",
    createdAt: "2026-05-27T13:28:00Z",
    stage: "new",
  },
];

export const mockActivity: ActivityEvent[] = [
  {
    id: "act-001",
    type: "email_sent",
    title: "Email enviado",
    description: "Cold outreach para lucas.mendes@replit.com",
    timestamp: "2026-05-27T13:47:00Z",
  },
  {
    id: "act-002",
    type: "agent_run",
    title: "Agente executado",
    description: "Outreach Builder processou 44 leads do batch ialeads-exclusive",
    timestamp: "2026-05-27T13:45:00Z",
  },
  {
    id: "act-003",
    type: "email_opened",
    title: "Email aberto",
    description: "fernanda.rocha@atlassian.com abriu o email (2x)",
    timestamp: "2026-05-27T13:30:00Z",
  },
  {
    id: "act-004",
    type: "lead_qualified",
    title: "Lead qualificado",
    description: "Groq — rafael.costa@groq.com classificado como HOT (score 95)",
    timestamp: "2026-05-27T13:00:00Z",
  },
  {
    id: "act-005",
    type: "email_replied",
    title: "Resposta recebida",
    description: "fernanda.rocha@atlassian.com respondeu ao outreach inicial",
    timestamp: "2026-05-27T12:45:00Z",
  },
  {
    id: "act-006",
    type: "lead_added",
    title: "Leads importados",
    description: "25 novos leads adicionados — batch-02 exclusive 2026-05-27",
    timestamp: "2026-05-27T13:28:00Z",
  },
  {
    id: "act-007",
    type: "email_sent",
    title: "Email enviado",
    description: "Follow-up D+3 para isabella.nascimento@ericsson.com",
    timestamp: "2026-05-27T11:00:00Z",
  },
];

export const mockChartData: ChartDataPoint[] = [
  { date: "01/05", leads: 42,  emails: 28,  opens: 9,  replies: 2 },
  { date: "05/05", leads: 68,  emails: 45,  opens: 15, replies: 4 },
  { date: "10/05", leads: 95,  emails: 62,  opens: 21, replies: 7 },
  { date: "15/05", leads: 124, emails: 88,  opens: 30, replies: 11 },
  { date: "20/05", leads: 158, emails: 112, opens: 38, replies: 14 },
  { date: "22/05", leads: 182, emails: 130, opens: 44, replies: 18 },
  { date: "25/05", leads: 214, emails: 148, opens: 51, replies: 22 },
  { date: "27/05", leads: 248, emails: 168, opens: 58, replies: 25 },
];

export const mockPipeline: Pipeline[] = [
  { stage: "Novo",        count: 312, value: 0,      color: "#6366f1" },
  { stage: "Contatado",   count: 204, value: 82000,  color: "#8b5cf6" },
  { stage: "Respondeu",   count: 87,  value: 148000, color: "#a78bfa" },
  { stage: "Qualificado", count: 42,  value: 168000, color: "#22c55e" },
  { stage: "Ganho",       count: 18,  value: 84000,  color: "#4ade80" },
];

export type Campaign = {
  id: string;
  name: string;
  event: string;
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
  qualified: number;
  status: "active" | "paused" | "completed";
  lastSentAt: string;
};

export const mockCampaigns: Campaign[] = [
  {
    id: "c-001",
    name: "Futurecom 2026 — Top 5",
    event: "Futurecom 2026",
    sent: 5, delivered: 5, opened: 3, replied: 1, qualified: 1,
    status: "completed",
    lastSentAt: "2026-05-19T10:00:00Z",
  },
  {
    id: "c-002",
    name: "Futurecom 2026 — Remaining 20",
    event: "Futurecom 2026",
    sent: 20, delivered: 19, opened: 8, replied: 2, qualified: 1,
    status: "completed",
    lastSentAt: "2026-05-20T11:00:00Z",
  },
  {
    id: "c-003",
    name: "Futurecom 2026 — Expansion",
    event: "Futurecom 2026",
    sent: 25, delivered: 24, opened: 9, replied: 3, qualified: 2,
    status: "completed",
    lastSentAt: "2026-05-21T14:00:00Z",
  },
  {
    id: "c-004",
    name: "ialeads Exclusive — Batch 01",
    event: "Multi-event",
    sent: 44, delivered: 43, opened: 15, replied: 4, qualified: 2,
    status: "active",
    lastSentAt: "2026-05-27T13:47:00Z",
  },
  {
    id: "c-005",
    name: "ialeads Exclusive — Batch 02",
    event: "Multi-event",
    sent: 0, delivered: 0, opened: 0, replied: 0, qualified: 0,
    status: "paused",
    lastSentAt: "",
  },
];

export type FunnelStep = {
  label: string;
  count: number;
  pct: number;
  color: string;
};

export const mockFunnel: FunnelStep[] = [
  { label: "Enviados",   count: 1204, pct: 100,  color: "#6366f1" },
  { label: "Entregues",  count: 1180, pct: 98.0, color: "#8b5cf6" },
  { label: "Abertos",    count: 412,  pct: 34.9, color: "#a78bfa" },
  { label: "Clicaram",   count: 98,   pct: 8.3,  color: "#fbbf24" },
  { label: "Responderam",count: 105,  pct: 8.7,  color: "#4ade80" },
  { label: "Qualificados",count: 42,  pct: 3.5,  color: "#22c55e" },
];
