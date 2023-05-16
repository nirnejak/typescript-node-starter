# Typescript Node Starter

Node.js and Fastify project starter using TypeScript

> Note: Need to configure `.env` file to use local server

---

## Additional Packages Used

- colorette - for styling console output
- date-fns - for date operations and formatting
- heapdump - for getting dump of the current memory heap

---

## Available Scripts

**Install Dependencies**

```bash
npm install
```

**Setup Pre-commit**

```bash
npm run prepare
```

**Start Development Server**

```bash
npm run develop
```

**Build for Production**

```bash
npm run build
```

**Start Production Server**

```bash
npm start
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

- Database - [Prisma](https://www.prisma.io/), [Drizzle](https://github.com/drizzle-team/drizzle-orm) or [Kysely](https://github.com/kysely-org/kysely)
- API Doc - [Swagger](https://swagger.io/)
- Web Socket - [Socket.io](https://socket.io/)
- Background Worker - [BullMQ](https://docs.bullmq.io/)
- GraphQL - [Mercurius](https://mercurius.dev/)
