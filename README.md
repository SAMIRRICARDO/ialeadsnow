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
