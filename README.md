# Go Barber App

Aplicação web de agendamento de barbearia que conecta clientes e barbeiros. Permite que usuários agendem horários e que barbeiros gerenciem agenda e atendimentos.

---

## Descrição do projeto

O **Go Barber App** é o frontend de um sistema de agendamento para barbearias. Possui dois perfis:

- **Usuário (cliente)**  
  Faz login, agenda horários com barbeiros, visualiza próximo agendamento e histórico.

- **Barbeiro**  
  Faz login em área separada, visualiza agenda do dia, lista de agendamentos e histórico, e pode confirmar/cancelar atendimentos.

A aplicação consome uma API REST (backend à parte) para autenticação, listagem de barbeiros, criação e atualização de agendamentos.

---

## Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** (ou yarn/pnpm/bun)

### Instalação

```bash
# Clonar o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd go-barber-app

# Instalar dependências
npm install
```

### Variáveis de ambiente

A API é configurada por ambiente. Use os scripts do projeto para gerar o `.env.local`:

| Comando        | Uso |
|----------------|-----|
| `npm run env:dev`  | Gera `.env.local` para **desenvolvimento** (API em `http://localhost:3333`) |
| `npm run env:prod` | Gera `.env.local` para **produção** (API em `https://api-gb-vowe.onrender.com`) |

**Desenvolvimento (API local):**

```bash
npm run env:dev
npm run dev
```

**Desenvolvimento apontando para API de produção:**

```bash
npm run env:prod
npm run dev
```

Ou use os atalhos que já configuram o ambiente e sobem o servidor:

```bash
# API local
npm run dev:local

# API de produção
npm run dev:prod
```

### Servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O projeto usa **Turbopack** por padrão.

### Build e produção

```bash
# Build (usa NODE_ENV e API configurados no .env.local)
npm run build

# Build forçando ambiente de produção da API
npm run build:prod

# Servir build
npm run start
```

### Outros scripts

| Script     | Descrição |
|-----------|-----------|
| `npm run lint` | Roda o ESLint |
| `npm run commit` | Abre o Commitizen para commits convencionais |

---

## Decisões técnicas e arquiteturais

### Stack principal

- **Next.js 15** (App Router) – roteamento, SSR quando necessário e DX atual.
- **React 19** – versão estável do React.
- **TypeScript** – tipagem estática e contratos com a API.
- **Tailwind CSS 4** – estilização utilitária e tema consistente.
- **shadcn/ui (estilo New York)** – componentes acessíveis e customizáveis (Radix), com tema **zinc** e variáveis CSS.

### Autenticação

- Dois fluxos independentes: **usuário** e **barbeiro**, com tokens distintos (`authUserToken` e `authBarberToken`) no `localStorage`.
- **AuthContext** expõe `userToken`, `setUserToken`, `barberToken`, `setBarberToken` e é usado para estado global de autenticação.
- O cliente **Axios** (`src/lib/axios.ts`) usa interceptors para:
  - Enviar `Authorization: Bearer <token>` (usuário ou barbeiro, conforme o que existir).
  - Em respostas **401**, limpar os tokens e redirecionar para `/` (usuário) ou `/login-barber` (barbeiro), conforme a rota atual.

### API e ambiente

- Base URL e timeout vêm de **`src/config/environment.ts`**, que escolhe config de `development` ou `production` com base em `NODE_ENV`.
- O script **`scripts/set-env.js`** escreve o `.env.local` (ex.: `NEXT_PUBLIC_API_URL`) para padronizar uso em `dev` e `prod` sem alterar código.

### Formulários e validação

- **React Hook Form** para estado e performance dos formulários.
- **Zod** + **@hookform/resolvers** para validação e tipos inferidos (ex.: login, registro).

### UI e UX

- **shadcn/ui**: Button, Input, Card, Avatar, Form, Select, Label, Dialog, Drawer (Vaul), Calendar (react-day-picker).
- **react-toastify** para feedback (sucesso, erro, avisos), com tema escuro.
- **date-fns** e **react-day-picker** para datas no calendário e agendamentos.
- **lucide-react** e **react-icons** para ícones.

### Estrutura de pastas (resumo)

- **`src/app/`** – rotas do App Router (páginas e layouts).
- **`src/components/`** – componentes de domínio (listas de agendamentos, cabeçalhos, modais, etc.) e **`ui/`** com componentes base (shadcn).
- **`src/contexts/`** – AuthContext.
- **`src/config/`** – configuração da API por ambiente.
- **`src/lib/`** – cliente Axios e utilitários (ex.: `utils.ts`).
- **`src/@types/`** – tipos e contratos (usuários, barbeiros, agendamentos).

### Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Login do usuário (página inicial) |
| `/login-barber` | Login do barbeiro |
| `/register-user`, `/register-barber` | Cadastro de usuário e barbeiro |
| `/dashboard-user`, `/dashboard-barber` | Painel do cliente e do barbeiro |
| `/profile-user`, `/profile-barber` | Perfil e dados do usuário/barbeiro |
| `/history-user`, `/history-barber` | Histórico de agendamentos |

### Convenções

- Uso de **path alias** `@/` para imports (ex.: `@/components`, `@/lib`, `@/config`), configurado no `tsconfig` e no `components.json` do shadcn.
- Tipos de domínio concentrados em **`src/@types/`** para manter contrato com a API e reuso (ex.: `Scheduling`, `Barber`, `CreateSchedulingRequest`).

---

## Licença

Projeto de uso privado/educacional.
