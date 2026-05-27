import type { Agent } from "@/types";

export { mockAgents } from "@/lib/mock-data";

export type TaskLog = {
  id: string;
  agentId: string;
  agentName: string;
  taskType: string;
  status: "success" | "failed" | "running" | "skipped";
  input: string;
  output: string;
  durationMs: number;
  tokensUsed: number;
  cost: number;
  startedAt: string;
};

export type AgentPerfPoint = {
  time: string;
  successRate: number;
  latencyMs: number;
  tasks: number;
};

export const mockTaskLog: TaskLog[] = [
  {
    id: "t-001", agentId: "agent-outreach-01", agentName: "Outreach Builder",
    taskType: "build_email", status: "success",
    input: "lucas.mendes@replit.com — Head of Partnerships",
    output: "Subject: VRASHOWS × Replit — Futurecom 2026 | Score: 91/100",
    durationMs: 342, tokensUsed: 1240, cost: 0.0004,
    startedAt: "2026-05-27T13:47:12Z",
  },
  {
    id: "t-002", agentId: "agent-qualify-01", agentName: "Qualification AI",
    taskType: "qualify_lead", status: "success",
    input: "rafael.costa@groq.com — Events Lead",
    output: "Status: HOT | Score: 95 | FitScore: 98",
    durationMs: 890, tokensUsed: 2100, cost: 0.0012,
    startedAt: "2026-05-27T13:46:30Z",
  },
  {
    id: "t-003", agentId: "agent-sourcing-01", agentName: "Lead Sourcer",
    taskType: "source_leads", status: "success",
    input: "segment=telecom&event=Futurecom2026&limit=25",
    output: "25 leads sourced — batch-02 | 0 failed",
    durationMs: 12400, tokensUsed: 8200, cost: 0.0048,
    startedAt: "2026-05-27T13:28:00Z",
  },
  {
    id: "t-004", agentId: "agent-outreach-01", agentName: "Outreach Builder",
    taskType: "build_email", status: "success",
    input: "ana.lima@mozilla.org — Brand Partnerships",
    output: "Subject: VRASHOWS × Mozilla — presença enterprise | Score: 84/100",
    durationMs: 318, tokensUsed: 1180, cost: 0.0004,
    startedAt: "2026-05-27T13:44:55Z",
  },
  {
    id: "t-005", agentId: "agent-enrich-01", agentName: "Enrichment Agent",
    taskType: "enrich_contact", status: "success",
    input: "fernanda.rocha@atlassian.com",
    output: "LinkedIn: confirmed | Role: Marketing Director | Seniority: director",
    durationMs: 2100, tokensUsed: 980, cost: 0.0003,
    startedAt: "2026-05-27T12:31:10Z",
  },
  {
    id: "t-006", agentId: "agent-qualify-01", agentName: "Qualification AI",
    taskType: "qualify_lead", status: "failed",
    input: "unknown@linkedin.com.br — unknown role",
    output: "Error: email domain is linkedin.com.br — skipping (social domain)",
    durationMs: 120, tokensUsed: 400, cost: 0.0001,
    startedAt: "2026-05-27T13:20:00Z",
  },
  {
    id: "t-007", agentId: "agent-sourcing-01", agentName: "Lead Sourcer",
    taskType: "validate_mx", status: "success",
    input: "batch: exclusive-50-batch-01 (50 candidates)",
    output: "44 passed MX validation | 6 rejected (NO_MX)",
    durationMs: 5800, tokensUsed: 0, cost: 0,
    startedAt: "2026-05-27T11:00:00Z",
  },
  {
    id: "t-008", agentId: "agent-outreach-01", agentName: "Outreach Builder",
    taskType: "build_email", status: "running",
    input: "lucas.silva@fortetelecom.com.br — Events Manager",
    output: "—",
    durationMs: 0, tokensUsed: 0, cost: 0,
    startedAt: "2026-05-27T13:48:00Z",
  },
];

export const mockPerfHistory: AgentPerfPoint[] = [
  { time: "08:00", successRate: 91, latencyMs: 1100, tasks: 42 },
  { time: "09:00", successRate: 94, latencyMs: 980,  tasks: 68 },
  { time: "10:00", successRate: 96, latencyMs: 920,  tasks: 95 },
  { time: "11:00", successRate: 93, latencyMs: 1050, tasks: 124 },
  { time: "12:00", successRate: 97, latencyMs: 870,  tasks: 88 },
  { time: "13:00", successRate: 95, latencyMs: 910,  tasks: 142 },
  { time: "13:47", successRate: 96, latencyMs: 895,  tasks: 58 },
];

export type AgentConfig = {
  id: string;
  model: string;
  maxTokens: number;
  temperature: number;
  rateLimit: string;
  retries: number;
  schedule: string;
};

export const mockAgentConfigs: Record<string, AgentConfig> = {
  "agent-sourcing-01": {
    id: "agent-sourcing-01", model: "claude-haiku-4-5", maxTokens: 4096,
    temperature: 0.3, rateLimit: "10 req/min", retries: 3, schedule: "on-demand",
  },
  "agent-outreach-01": {
    id: "agent-outreach-01", model: "claude-sonnet-4-6", maxTokens: 2048,
    temperature: 0.7, rateLimit: "20 req/min", retries: 2, schedule: "on-demand",
  },
  "agent-enrich-01": {
    id: "agent-enrich-01", model: "claude-haiku-4-5", maxTokens: 1024,
    temperature: 0.1, rateLimit: "15 req/min", retries: 3, schedule: "hourly",
  },
  "agent-qualify-01": {
    id: "agent-qualify-01", model: "claude-sonnet-4-6", maxTokens: 2048,
    temperature: 0.2, rateLimit: "10 req/min", retries: 2, schedule: "on-demand",
  },
  "agent-followup-01": {
    id: "agent-followup-01", model: "claude-haiku-4-5", maxTokens: 1024,
    temperature: 0.6, rateLimit: "5 req/min", retries: 2, schedule: "daily 09:00",
  },
};
