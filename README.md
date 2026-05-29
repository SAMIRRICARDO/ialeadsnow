# IALEADSNOW — Commercial AI Runtime

> Módulo comercial da plataforma **VRAXIA** — frontend de referência para o runtime de
> automação de outbound, gestão de leads e operações orientadas por IA.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel_GRU1-000000?style=flat-square&logo=vercel)](https://ialeadsnow.vercel.app)
[![Status](https://img.shields.io/badge/Status-Frontend_Reference-818cf8?style=flat-square)]()

**Demo ao vivo:** [ialeadsnow.vercel.app](https://ialeadsnow.vercel.app/dashboard)

---

## Contexto

Este repositório é o **frontend de referência** do módulo comercial VRAXIA.

Demonstra a arquitetura de UI, design system enterprise e estrutura de módulos de uma
plataforma AI-native para operações B2B. Os dados são mockados com tipagem completa —
o objetivo é demonstrar estrutura, experiência e capacidade de design de sistema.

O backend (agentes IA, RAG pipeline, LLM orchestration, pgvector, Redis) está sendo
desenvolvido no monorepo [VRAXIA](https://vrashows.com.br/vraxia), com arquitetura
Turborepo + Fastify + TypeScript.

```
┌─────────────────────────────────────────────────────┐
│                  VRAXIA Platform                    │
│                                                     │
│  ┌──────────────┐      ┌────────────────────────┐  │
│  │  ialeadsnow  │ ───► │   VRAXIA Backend       │  │
│  │  (este repo) │      │   Fastify · pgvector   │  │
│  │  Next.js UI  │      │   Redis · LLMs · RAG   │  │
│  └──────────────┘      └────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │              Human RAG Layer                 │  │
│  │   Preservação de conhecimento organizacional │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## O que este repo demonstra

- Arquitetura de frontend enterprise com **Next.js 15 App Router**
- Design system dark AI-native com **Tailwind CSS v4 + shadcn/ui**
- Estrutura modular por domínio de negócio (Comercial, Financeiro, RH, Analytics, Agentes)
- Tipagem completa com **TypeScript strict** — todos os contratos de dados definidos em `types/`
- Organização de componentes escalável para produto SaaS multi-módulo
- Padrões de dashboard enterprise: KPIs, funil, heatmap, runtime de agentes, billing

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript 5 (strict) |
| Estilo | Tailwind CSS v4 |
| Componentes | shadcn/ui + Radix primitives |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Tipografia | Geist Sans + Geist Mono |
| Deploy | Vercel (região GRU1 — São Paulo) |

---

## Módulos

| Módulo | Rota | Descrição |
|--------|------|-----------|
| Dashboard | `/dashboard` | Visão consolidada — KPIs, leads, funil, agentes |
| Comercial | `/comercial` | Pipeline, deals, receita, próximas ações |
| Financeiro | `/financeiro` | Tendência de receita, cashflow, forecast |
| RH | `/rh` | Performance de time, headcount, vagas |
| Analytics | `/analytics` | Métricas de email, heatmap, segmentação |
| Agentes IA | `/agentes` | Runtime de agentes, log de execução, fila |
| Billing | `/billing` | Plano, uso, histórico de créditos |
| APIs | `/apis` | Chaves, webhooks, status de integração |
| Configurações | `/configuracoes` | Conta, segurança, notificações |

---

## Estrutura do projeto

```
app/                    Next.js App Router
  dashboard/
  comercial/
  financeiro/
  rh/
  analytics/
  agentes/
  billing/
  apis/
  configuracoes/
  layout.tsx            Root layout (dark mode forçado)
  globals.css           Design system tokens

components/
  layout/               AppShell, Sidebar, Topbar
  dashboard/
  comercial/
  financeiro/
  rh/
  analytics/
  agentes/
  apis/
  ui/                   Base UI (shadcn)

lib/
  mock-*.ts             Dados mockados tipados por módulo
  utils.ts              cn() utility

types/
  index.ts              Contratos TypeScript compartilhados
```

---

## Design system

- **Background:** `#07070e` — base dark profundo
- **Primary:** `#818cf8` — accent indigo
- **Cards:** `glass-card` — vidro em camadas com depth via box-shadow
- **Tipografia:** Geist Sans, `tabular-nums` em todos os valores numéricos
- **Dark mode:** forçado via classe `dark` no `<html>`
- **Radius:** `--radius: 0.5rem`

---

## Rodar localmente

```bash
git clone https://github.com/SAMIRRICARDO/ialeadsnow.git
cd ialeadsnow
npm install
npm run dev
```

Abre em `http://localhost:3000` — redireciona automaticamente para `/dashboard`.

```bash
npm run build       # build de produção
npm run typecheck   # checagem de tipos
```

---

## Arquitetura completa — VRAXIA

O backend e os agentes IA que alimentarão este frontend estão sendo desenvolvidos
na plataforma VRAXIA:

| Componente | Tecnologia | Status |
|------------|-----------|--------|
| API Gateway | Fastify + TypeScript | Em desenvolvimento |
| Agent Runtime | Node.js + Ollama + OpenAI | Em desenvolvimento |
| Human RAG | pgvector + text-embedding-3-small | Em desenvolvimento |
| Outbound Pipeline | Lead enrichment + scoring + LLM | Em desenvolvimento |
| Cache | Redis | Em desenvolvimento |
| Infra | Docker Compose + PostgreSQL | Definido |

**Página institucional:** [vrashows.com.br/vraxia](https://vrashows.com.br/vraxia)

---

## Licença

Proprietário — VRASHOWS © 2026. Todos os direitos reservados.




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
