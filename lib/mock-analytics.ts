export type EmailMetricPoint = {
  date: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
};

export type SourceData = {
  name: string;
  leads: number;
  color: string;
  pct: number;
};

export type SegmentData = {
  segment: string;
  leads: number;
  contacted: number;
  replied: number;
  qualified: number;
  avgScore: number;
};

export type HeatCell = {
  day: number;   // 0=Mon … 4=Fri
  hour: number;  // 8–18
  opens: number;
};

export type CampaignComparison = {
  campaign: string;
  event: string;
  sent: number;
  openRate: number;
  replyRate: number;
  qualifiedRate: number;
  avgScore: number;
  totalValue: number;
  roi: number;
};

export type DomainStat = {
  domain: string;
  sent: number;
  delivered: number;
  opened: number;
  bounced: number;
  deliveryRate: number;
};

// ── Email metrics (30 days) ───────────────────────────────────────────────────

export const mockEmailMetrics: EmailMetricPoint[] = [
  { date: "01/05", sent: 0,   delivered: 0,   opened: 0,   clicked: 0,  replied: 0,  bounced: 0  },
  { date: "05/05", sent: 28,  delivered: 27,  opened: 9,   clicked: 2,  replied: 1,  bounced: 1  },
  { date: "10/05", sent: 45,  delivered: 44,  opened: 15,  clicked: 4,  replied: 3,  bounced: 1  },
  { date: "15/05", sent: 62,  delivered: 61,  opened: 21,  clicked: 5,  replied: 4,  bounced: 1  },
  { date: "19/05", sent: 10,  delivered: 10,  opened: 3,   clicked: 1,  replied: 1,  bounced: 0  },
  { date: "21/05", sent: 20,  delivered: 19,  opened: 8,   clicked: 2,  replied: 2,  bounced: 1  },
  { date: "22/05", sent: 25,  delivered: 24,  opened: 9,   clicked: 3,  replied: 3,  bounced: 1  },
  { date: "27/05", sent: 44,  delivered: 43,  opened: 15,  clicked: 4,  replied: 4,  bounced: 1  },
];

// ── Lead sources ──────────────────────────────────────────────────────────────

export const mockSources: SourceData[] = [
  { name: "Futurecom 2026",       leads: 45,  pct: 32, color: "#818cf8" },
  { name: "ialeads Exclusive",    leads: 44,  pct: 31, color: "#a78bfa" },
  { name: "Batch-02",             leads: 25,  pct: 18, color: "#c084fc" },
  { name: "Futurecom 2025",       leads: 18,  pct: 13, color: "#4ade80" },
  { name: "Outros",               leads:  9,  pct:  6, color: "#6b6b80" },
];

// ── Segments ──────────────────────────────────────────────────────────────────

export const mockSegments: SegmentData[] = [
  { segment: "Telecom / Carriers",   leads: 48, contacted: 35, replied: 8,  qualified: 4, avgScore: 88 },
  { segment: "AI / Cloud / SaaS",    leads: 32, contacted: 28, replied: 7,  qualified: 3, avgScore: 84 },
  { segment: "Enterprise Software",  leads: 24, contacted: 18, replied: 4,  qualified: 2, avgScore: 79 },
  { segment: "Network Infra",        leads: 19, contacted: 14, replied: 3,  qualified: 2, avgScore: 82 },
  { segment: "Data Center",          leads: 12, contacted: 10, replied: 3,  qualified: 2, avgScore: 86 },
  { segment: "Cybersecurity",        leads: 6,  contacted: 4,  replied: 1,  qualified: 0, avgScore: 75 },
];

// ── Heatmap — opens by day × hour ────────────────────────────────────────────

export const mockHeatmap: HeatCell[] = [
  // Monday
  { day: 0, hour: 8,  opens: 2  }, { day: 0, hour: 9,  opens: 8  }, { day: 0, hour: 10, opens: 14 },
  { day: 0, hour: 11, opens: 12 }, { day: 0, hour: 12, opens: 5  }, { day: 0, hour: 13, opens: 4  },
  { day: 0, hour: 14, opens: 9  }, { day: 0, hour: 15, opens: 11 }, { day: 0, hour: 16, opens: 6  },
  { day: 0, hour: 17, opens: 3  }, { day: 0, hour: 18, opens: 1  },
  // Tuesday
  { day: 1, hour: 8,  opens: 3  }, { day: 1, hour: 9,  opens: 12 }, { day: 1, hour: 10, opens: 18 },
  { day: 1, hour: 11, opens: 15 }, { day: 1, hour: 12, opens: 7  }, { day: 1, hour: 13, opens: 5  },
  { day: 1, hour: 14, opens: 11 }, { day: 1, hour: 15, opens: 13 }, { day: 1, hour: 16, opens: 8  },
  { day: 1, hour: 17, opens: 4  }, { day: 1, hour: 18, opens: 1  },
  // Wednesday
  { day: 2, hour: 8,  opens: 4  }, { day: 2, hour: 9,  opens: 14 }, { day: 2, hour: 10, opens: 21 },
  { day: 2, hour: 11, opens: 17 }, { day: 2, hour: 12, opens: 6  }, { day: 2, hour: 13, opens: 6  },
  { day: 2, hour: 14, opens: 12 }, { day: 2, hour: 15, opens: 14 }, { day: 2, hour: 16, opens: 9  },
  { day: 2, hour: 17, opens: 5  }, { day: 2, hour: 18, opens: 2  },
  // Thursday
  { day: 3, hour: 8,  opens: 3  }, { day: 3, hour: 9,  opens: 11 }, { day: 3, hour: 10, opens: 16 },
  { day: 3, hour: 11, opens: 13 }, { day: 3, hour: 12, opens: 5  }, { day: 3, hour: 13, opens: 4  },
  { day: 3, hour: 14, opens: 8  }, { day: 3, hour: 15, opens: 10 }, { day: 3, hour: 16, opens: 7  },
  { day: 3, hour: 17, opens: 3  }, { day: 3, hour: 18, opens: 1  },
  // Friday
  { day: 4, hour: 8,  opens: 2  }, { day: 4, hour: 9,  opens: 7  }, { day: 4, hour: 10, opens: 11 },
  { day: 4, hour: 11, opens: 9  }, { day: 4, hour: 12, opens: 4  }, { day: 4, hour: 13, opens: 3  },
  { day: 4, hour: 14, opens: 6  }, { day: 4, hour: 15, opens: 7  }, { day: 4, hour: 16, opens: 4  },
  { day: 4, hour: 17, opens: 2  }, { day: 4, hour: 18, opens: 1  },
];

// ── Campaign comparison ───────────────────────────────────────────────────────

export const mockCampaignComparison: CampaignComparison[] = [
  {
    campaign: "Futurecom — Top 5",   event: "Futurecom 2026",
    sent: 5,   openRate: 60.0, replyRate: 20.0, qualifiedRate: 20.0, avgScore: 91, totalValue: 42000, roi: 12.4,
  },
  {
    campaign: "Futurecom — Rem. 20", event: "Futurecom 2026",
    sent: 20,  openRate: 40.0, replyRate: 10.0, qualifiedRate: 5.0,  avgScore: 84, totalValue: 68000, roi: 8.2,
  },
  {
    campaign: "Futurecom — Expansion", event: "Futurecom 2026",
    sent: 25,  openRate: 36.0, replyRate: 12.0, qualifiedRate: 8.0,  avgScore: 86, totalValue: 55000, roi: 6.8,
  },
  {
    campaign: "ialeads Exclusive — Batch 01", event: "Multi-event",
    sent: 44,  openRate: 34.1, replyRate: 9.1,  qualifiedRate: 4.5,  avgScore: 80, totalValue: 82000, roi: 5.4,
  },
];

// ── Domain delivery stats ─────────────────────────────────────────────────────

export const mockDomainStats: DomainStat[] = [
  { domain: "gmail.com",     sent: 12, delivered: 12, opened: 5,  bounced: 0, deliveryRate: 100 },
  { domain: "ericsson.com",  sent: 3,  delivered: 3,  opened: 1,  bounced: 0, deliveryRate: 100 },
  { domain: "nokia.com",     sent: 3,  delivered: 3,  opened: 1,  bounced: 0, deliveryRate: 100 },
  { domain: "replit.com",    sent: 5,  delivered: 5,  opened: 2,  bounced: 0, deliveryRate: 100 },
  { domain: "atlassian.com", sent: 4,  delivered: 4,  opened: 2,  bounced: 0, deliveryRate: 100 },
  { domain: "groq.com",      sent: 3,  delivered: 3,  opened: 2,  bounced: 0, deliveryRate: 100 },
  { domain: "mozilla.org",   sent: 4,  delivered: 4,  opened: 1,  bounced: 0, deliveryRate: 100 },
  { domain: "amazon.com",    sent: 8,  delivered: 6,  opened: 2,  bounced: 2, deliveryRate: 75  },
  { domain: "huawei.com",    sent: 6,  delivered: 5,  opened: 2,  bounced: 1, deliveryRate: 83  },
  { domain: "linkedin.com.br",sent:1,  delivered: 0,  opened: 0,  bounced: 1, deliveryRate: 0   },
];
