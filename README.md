# IALEADSNOW — Enterprise Platform

AI-native lead intelligence & outbound automation platform. Built for the enterprise — dark, fast, and precision-crafted.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix primitives |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |
| Deploy | Vercel (region: GRU1 — São Paulo) |

---

## Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/dashboard` | Consolidated view — KPIs, leads, funnel, agents |
| Comercial | `/comercial` | Pipeline, deals, revenue, next actions |
| Financeiro | `/financeiro` | Revenue trend, cashflow, invoices, forecast |
| RH | `/rh` | Team performance, headcount, open positions |
| Analytics | `/analytics` | Email metrics, heatmap, segmentation, domain stats |
| Agentes IA | `/agentes` | Agent runtime, execution log, task queue |
| Billing | `/billing` | Plan, usage, credit history |
| APIs | `/apis` | API keys, webhooks, integration status |
| Configurações | `/configuracoes` | Account, security, notifications, integrations |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Type check
npm run typecheck
```

Open [http://localhost:3000](http://localhost:3000) — redirects automatically to `/dashboard`.

---

## Project Structure

```
app/                   Next.js App Router pages
  dashboard/           Master dashboard
  comercial/           Sales pipeline
  financeiro/          Financial management
  rh/                  People & HR
  analytics/           Email & conversion analytics
  agentes/             AI agent runtime
  billing/             Plan & billing
  apis/                API management
  configuracoes/       Settings
  layout.tsx           Root layout (dark mode forced)
  globals.css          Design system tokens

components/
  layout/              AppShell, Sidebar, Topbar
  dashboard/           Dashboard-specific components
  comercial/           Sales components
  financeiro/          Finance components
  rh/                  HR components
  analytics/           Analytics charts
  agentes/             Agent cards and logs
  apis/                API usage chart
  ui/                  Base UI components (shadcn)

lib/
  mock-*.ts            Typed mock data per module
  utils.ts             cn() utility

types/
  index.ts             Shared TypeScript types
```

---

## Design System

- **Background:** `#07070e` — deep dark base
- **Primary:** `#818cf8` — indigo accent
- **Cards:** `glass-card` — layered glass with box-shadow depth
- **Typography:** Geist Sans, tabular-nums on all numeric values
- **Dark mode:** forced via `dark` class on `<html>`
- **Radius:** `--radius: 0.5rem` base scale

---

## Deploy on Vercel

### Manual deploy

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod

# 5. Add custom domain
vercel domains add ialeadsnow.com.br
vercel alias set <deployment-url> ialeadsnow.com.br
```

### Environment variables

This is a fully static frontend — no environment variables required for deployment.

---

## Performance

All pages are statically generated at build time. No server-side rendering, no API routes, no runtime dependencies.

```
Route (app)        Size    Status
/ ────────────────────────── redirect to /dashboard
/dashboard ───────────────── Static
/comercial ───────────────── Static
/financeiro ──────────────── Static
/rh ──────────────────────── Static
/analytics ───────────────── Static
/agentes ─────────────────── Static
/billing ─────────────────── Static
/apis ────────────────────── Static
/configuracoes ───────────── Static
```

---

## License

Private — VRASHOWS © 2026. All rights reserved.
