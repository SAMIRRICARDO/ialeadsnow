export type ApiKey = {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string;
  requestsMonth: number;
  status: "active" | "revoked" | "expired";
};

export type WebhookEndpoint = {
  id: string;
  url: string;
  events: string[];
  status: "active" | "paused" | "failing";
  successRate: number;
  lastTriggered: string;
  deliveries: number;
};

export type ApiUsagePoint = { date: string; requests: number; errors: number };

export const mockApiKeys: ApiKey[] = [
  {
    id: "k-001", name: "Produção — Backend",
    key: "ial_prod_sk_4f8a2b9c1d3e5f7a8b9c0d1e2f3a4b5c",
    scopes: ["leads:read", "leads:write", "emails:send", "agents:run"],
    createdAt: "2026-01-15", lastUsed: "2026-05-27T13:47:00Z",
    requestsMonth: 12840, status: "active",
  },
  {
    id: "k-002", name: "Dashboard — Frontend",
    key: "ial_prod_pk_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    scopes: ["leads:read", "analytics:read"],
    createdAt: "2026-01-15", lastUsed: "2026-05-27T13:00:00Z",
    requestsMonth: 5280, status: "active",
  },
  {
    id: "k-003", name: "Integração CRM",
    key: "ial_prod_sk_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k",
    scopes: ["leads:read", "comercial:read", "comercial:write"],
    createdAt: "2026-03-10", lastUsed: "2026-05-25T10:00:00Z",
    requestsMonth: 300, status: "active",
  },
  {
    id: "k-004", name: "Staging — Testes",
    key: "ial_test_sk_revogedXXXXXXXXXXXXXXXXXXXXXXXXXX",
    scopes: ["leads:read"],
    createdAt: "2026-02-01", lastUsed: "2026-04-10T08:00:00Z",
    requestsMonth: 0, status: "revoked",
  },
];

export const mockWebhooks: WebhookEndpoint[] = [
  {
    id: "wh-001", url: "https://vrashows.com.br/webhooks/resend",
    events: ["email.delivered", "email.opened", "email.clicked", "email.bounced"],
    status: "active", successRate: 98.4, lastTriggered: "2026-05-27T13:47:00Z", deliveries: 1180,
  },
  {
    id: "wh-002", url: "https://vrashows.com.br/webhooks/leads",
    events: ["lead.created", "lead.qualified", "lead.stage_changed"],
    status: "active", successRate: 100, lastTriggered: "2026-05-27T13:28:00Z", deliveries: 312,
  },
  {
    id: "wh-003", url: "https://n8n.vrashows.com.br/webhook/pipeline",
    events: ["deal.won", "deal.lost", "deal.stage_changed"],
    status: "paused", successRate: 94.1, lastTriggered: "2026-05-20T10:00:00Z", deliveries: 87,
  },
];

export const mockApiUsage: ApiUsagePoint[] = [
  { date: "22/05", requests: 1840, errors: 12 },
  { date: "23/05", requests: 2210, errors: 8  },
  { date: "24/05", requests: 1950, errors: 15 },
  { date: "25/05", requests: 2480, errors: 6  },
  { date: "26/05", requests: 2100, errors: 9  },
  { date: "27/05", requests: 2840, errors: 11 },
];
