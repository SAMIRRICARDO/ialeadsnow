export type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  active?: boolean;
};

export type MetricCard = {
  title: string;
  value: string | number;
  delta: number;
  deltaLabel: string;
  trend: "up" | "down" | "neutral";
  prefix?: string;
  suffix?: string;
  sparkline?: number[];
};

export type Agent = {
  id: string;
  name: string;
  type: "sourcing" | "outreach" | "enrichment" | "qualification" | "followup";
  status: "running" | "idle" | "error" | "paused";
  tasksCompleted: number;
  tasksQueued: number;
  lastRunAt: string;
  successRate: number;
  avgLatencyMs: number;
};

export type Lead = {
  id: string;
  company: string;
  contactName: string;
  role: string;
  email: string;
  status: "HOT" | "WARM" | "COLD" | "DNC";
  score: number;
  source: string;
  createdAt: string;
  lastContactedAt?: string;
  stage: "new" | "contacted" | "replied" | "qualified" | "won" | "lost";
};

export type ActivityEvent = {
  id: string;
  type: "email_sent" | "email_opened" | "email_replied" | "lead_added" | "agent_run" | "lead_qualified";
  title: string;
  description: string;
  timestamp: string;
  meta?: Record<string, string>;
};

export type ChartDataPoint = {
  date: string;
  leads?: number;
  emails?: number;
  opens?: number;
  replies?: number;
  revenue?: number;
};

export type Pipeline = {
  stage: string;
  count: number;
  value: number;
  color: string;
};
