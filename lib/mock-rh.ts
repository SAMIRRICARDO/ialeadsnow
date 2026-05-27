export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: "comercial" | "tecnico" | "design" | "operacoes" | "lideranca";
  status: "ativo" | "ferias" | "remoto" | "licenca";
  since: string;
  performance: number;
  tasksMonth: number;
  location: string;
  avatar: string;
};

export type OpenPosition = {
  id: string;
  title: string;
  department: string;
  type: "clt" | "pj" | "estagio";
  priority: "alta" | "media" | "baixa";
  openedAt: string;
  candidates: number;
};

export type PerfPoint = { month: string; avg: number; target: number };

export const mockTeam: TeamMember[] = [
  { id: "m-001", name: "Samir Ricardo",      role: "CEO / Head de Produto",       department: "lideranca",  status: "ativo",   since: "2023-01-01", performance: 97, tasksMonth: 142, location: "São Paulo, SP",   avatar: "SR" },
  { id: "m-002", name: "Ana Oliveira",        role: "Lead de Operações",            department: "operacoes",  status: "ativo",   since: "2024-03-15", performance: 91, tasksMonth: 98,  location: "São Paulo, SP",   avatar: "AO" },
  { id: "m-003", name: "Bruno Nascimento",    role: "Engenheiro de Software",       department: "tecnico",    status: "remoto",  since: "2024-06-01", performance: 88, tasksMonth: 115, location: "Florianópolis, SC",avatar:"BN" },
  { id: "m-004", name: "Carla Mendes",        role: "Designer de Experiências",     department: "design",     status: "ativo",   since: "2024-09-10", performance: 93, tasksMonth: 87,  location: "São Paulo, SP",   avatar: "CM" },
  { id: "m-005", name: "Diego Alves",         role: "Account Executive",            department: "comercial",  status: "ativo",   since: "2025-01-20", performance: 85, tasksMonth: 76,  location: "Rio de Janeiro, RJ",avatar:"DA"},
  { id: "m-006", name: "Fernanda Torres",     role: "Produtora de Eventos",         department: "operacoes",  status: "ferias",  since: "2025-04-01", performance: 90, tasksMonth: 0,   location: "São Paulo, SP",   avatar: "FT" },
  { id: "m-007", name: "Gustavo Lima",        role: "Especialista em AI/Automação", department: "tecnico",    status: "remoto",  since: "2025-07-15", performance: 94, tasksMonth: 128, location: "Recife, PE",      avatar: "GL" },
];

export const mockOpenPositions: OpenPosition[] = [
  { id: "v-001", title: "SDR / Closer",          department: "Comercial",  type: "pj",      priority: "alta",  openedAt: "2026-05-10", candidates: 8  },
  { id: "v-002", title: "Engenheiro Full-Stack",  department: "Técnico",    type: "pj",      priority: "alta",  openedAt: "2026-05-15", candidates: 12 },
  { id: "v-003", title: "Produtora Jr.",          department: "Operações",  type: "clt",     priority: "media", openedAt: "2026-05-20", candidates: 5  },
  { id: "v-004", title: "Estágio em Design",      department: "Design",     type: "estagio", priority: "baixa", openedAt: "2026-05-22", candidates: 18 },
];

export const mockPerfHistory: PerfPoint[] = [
  { month: "Jan", avg: 82, target: 85 },
  { month: "Fev", avg: 85, target: 85 },
  { month: "Mar", avg: 87, target: 87 },
  { month: "Abr", avg: 89, target: 87 },
  { month: "Mai", avg: 91, target: 90 },
];
