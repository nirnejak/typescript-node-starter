# TypeScript Node Starter

Node.js(Bun) and Fastify project starter using TypeScript.

## Tech Stack

- **Framework**: Fastify v5.7.1
- **Language**: TypeScript v5.9.3
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Runtime**: Node.js 24.12.0 (Volta)

## Getting Started

1. Clone and install: `git clone https://github.com/nirnejak/typescript-node-starter.git && cd typescript-node-starter && bun install`

2. Set up environment: `cp .env.example .env` and update `.env` with your config

3. Start dev server: `bun run dev`

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run format` - Format with Prettier
- `bun run db:generate` - Generate migrations
- `bun run db:migrate` - Run migrations

## Setup

Configure `.env` file for local development. See AGENTS.md for detailed agent instructions.

## Next Steps

- API Documentation ([@fastify/swagger](https://github.com/fastify/fastify-swagger))
- WebSockets ([@fastify/websocket](https://github.com/fastify/fastify-websocket))
- GraphQL ([Mercurius](https://mercurius.dev/))
