# Typescript Node Starter

Node.js and Fastify project starter using TypeScript

> Note: Need to configure `.env` file to use local server

---

## Additional Packages Used

- drizzle - for database ORM
- date-fns - for date operations and formatting

---

## Available Scripts

**Install Dependencies**

```bash
bun install
```

**Setup Pre-commit**

```bash
bun run prepare
```

**Check ESLint issues**

```bash
bun run lint
```

**Format with Prettier**

```bash
bun run format
```

**Start Development Server**

```bash
bun run develop
```

**Create Migrations**

```bash
bun run db:generate
```

**Run Migrations**

```bash
bun run db:migrate
```

**Push Migration changes**

```bash
bun run db:push
```

**Build for Production**

```bash
bun run build
```

**Start Production Server**

```bash
bun start
```

---

## Docker Config

**Build Image**

```bash
docker build
```

**Run Image**

```bash
docker run -p 5000:5000 <image-id>
```

---

## Development Setup

- VS Code - Install the recommended extensions
- Volta - For managing node versions

## Guides

- [Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## Next Steps

- API Doc - [@fastify/swagger](https://github.com/fastify/fastify-swagger)
- Web Sockets - [@fastify/websocket](https://github.com/fastify/fastify-websocket)
- GraphQL - [Mercurius](https://mercurius.dev/)
- Background Worker - [BullMQ](https://docs.bullmq.io/)
