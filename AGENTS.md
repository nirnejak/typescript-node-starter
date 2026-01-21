# AGENTS.md - TypeScript Node.js Fastify Starter

Essential information for AI coding agents working in this TypeScript Node.js repository.

## Tech Stack

- **Framework**: Fastify v5.7.1
- **Language**: TypeScript v5.9.3 (ES2017 target, ES modules)
- **Runtime**: Node.js 24.12.0 (managed with Volta)
- **Package Manager**: Bun
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Security**: Helmet for security headers
- **Logging**: Pino with pino-pretty

## Essential Commands

### Development

- `bun run dev` - Start development server with hot reload
- `bun start` - Start production server from dist/

### Build & Quality

- `bun run build` - Compile TypeScript to `dist/`
- `bun run type-check` - Type checking without compilation
- `bun run lint` - Run ESLint on `src/` directory
- `bun run lint:fix` - Auto-fix ESLint issues
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check Prettier formatting

### Database

- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:push` - Push schema changes directly
- `bun run db:studio` - Open Drizzle Studio

### Testing

**No testing framework configured yet.** When adding tests:

1. Install Vitest: `bun add -D vitest @types/node`
2. Add scripts: `"test": "vitest", "test:run": "vitest run"`
3. Create `*.test.ts` files in `__tests__/` or alongside source files

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** - All TypeScript strict checks are active
- **ES2017 target** - Use modern JavaScript features available in ES2017+
- **ES modules** - Use `import`/`export` syntax (package.json has `"type": "module"`)
- **Path mapping** - Use `@/*` to import from `src/` directory

### Import/Export Style

```typescript
// Prefer named imports over default imports
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Fastify from "fastify"

// Group imports by type: external libraries, then local imports
import userRoutes from "./router/user"
import { getLoggerConfig } from "./utils/logger"

// Use type-only imports for types/interfaces
import type { PinoLoggerOptions } from "fastify/types/logger"
```

### Naming Conventions

- **Variables/Functions**: camelCase (`userRoutes`, `getLoggerConfig`)
- **Types/Interfaces/Classes**: PascalCase (`FastifyInstance`, `UserData`)
- **Files**: kebab-case (`user-router.ts`, `error-handler.ts`)
- **Database columns**: snake_case (Drizzle ORM convention)

### Formatting (Prettier)

- **No semicolons** at end of statements
- **Double quotes** for strings
- **2-space indentation**
- **Trailing commas** in ES5 style (objects, arrays, function parameters)

### TypeScript Types and Interfaces

```typescript
// Always use explicit types for function parameters
const userRoutes = (fastify: FastifyInstance): void => {
  // Use proper typing for request/response bodies
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{
        Body: { name: string; age: number }
      }>,
      reply: FastifyReply
    ) => {
      // Implementation
    },
  })
}
```

### Error Handling

```typescript
// Use custom error handler plugin pattern
function errorHandlerPlugin(fastify: FastifyInstance): void {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error)
    if (error.validation) {
      reply
        .status(400)
        .send({ error: "Validation Error", message: error.message })
    } else {
      reply
        .status(500)
        .send({ error: "Internal Server Error", message: error.message })
    }
  })
}
```

### Database (Drizzle ORM)

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
})
```

### Fastify Patterns

```typescript
// Register plugins and routes
fastify.register(helmet, { global: true })
fastify.register(userRoutes, { prefix: "/api/users" })

// Use hooks for cross-cutting concerns
fastify.addHook("onRequest", () => {
  fastify.log.info("Got a request")
})
```

### Project Structure

```
src/
├── index.ts              # Application entry point
├── router/               # Route handlers
├── models/               # Database schemas
├── utils/                # Utility functions
├── plugins/              # Fastify plugins
└── controllers/          # Business logic (if applicable)
```

## Quick Start for New Agents

1. **Setup**: `bun install`
2. **Development**: `bun run dev`
3. **Code Quality**: `bun run lint:fix && bun run format`
4. **Build**: `bun run build`
5. **Type Check**: `bun run type-check`

Always run `bun run lint:fix` and `bun run format` before committing changes.</content>
<parameter name="filePath">AGENTS.md
