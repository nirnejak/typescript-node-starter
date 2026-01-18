# AGENTS.md - TypeScript Node.js Fastify Starter

This file provides essential information for AI coding agents working in this TypeScript Node.js repository using Fastify framework.

## Build, Lint, and Test Commands

### Build Commands

- `bun run build` - Compile TypeScript to JavaScript (outputs to `dist/`)
- `bun run type-check` - Run TypeScript type checking without emitting files

### Development Commands

- `bun run dev` - Start development server with nodemon auto-reload
- `bun start` - Start production server from compiled dist files

### Code Quality Commands

- `bun run lint` - Run ESLint on src/ directory
- `bun run lint:fix` - Run ESLint with auto-fix on src/ directory
- `bun run format` - Format code with Prettier (writes changes)
- `bun run format:check` - Check if code is properly formatted with Prettier

### Database Commands

- `bun run db:generate` - Generate database migration files with Drizzle
- `bun run db:migrate` - Run database migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open Drizzle Studio for database management

### Testing Commands

**Note: No testing framework is currently configured. To add testing:**

1. Install a testing framework (recommended: Vitest for fast testing)
2. Add test scripts to package.json
3. Create test files with `.test.ts` or `.spec.ts` extension

Example setup:

```bash
bun install --save-dev vitest @types/node
```

Add to package.json scripts:

```json
"test": "vitest",
"test:run": "vitest run",
"test:watch": "vitest --watch",
"test:coverage": "vitest --coverage"
```

To run a single test file:

```bash
bun test path/to/file.test.ts
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** - All TypeScript strict checks are active
- **ES2017 target** - Use modern JavaScript features available in ES2017+
- **ES modules** - Use `import`/`export` syntax (package.json has `"type": "module"`)
- **Path mapping** - Use `@/*` to import from `src/` directory
- **Output directory** - Compiled code goes to `dist/` directory

### Import/Export Style

```typescript
// Prefer named imports over default imports
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Fastify from "fastify"
import dotenv from "dotenv"

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
- **Constants**: UPPER_SNAKE_CASE for global constants

### Formatting (Prettier)

```json
{
  "endOfLine": "auto",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

- **No semicolons** at end of statements
- **Double quotes** for strings
- **2-space indentation**
- **Trailing commas** in ES5 style (objects, arrays, function parameters)
- **Auto end-of-line** detection

### EditorConfig

```
[*]
end_of_line = lf
insert_final_newline = true

[*.{js,ts,json,scss,css}]
charset = utf-8
indent_style = space
indent_size = 2
```

### TypeScript Types and Interfaces

```typescript
// Always use explicit types for function parameters
const userRoutes = (fastify: FastifyInstance): void => {
  // Use proper typing for request/response bodies
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          name: string
          age: number
        }
      }>,
      reply: FastifyReply
    ) => {
      // Implementation
    },
  })
}

// Use type-only imports when only importing types
import type { FastifyInstance } from "fastify"
```

### Error Handling

```typescript
// Use custom error handler plugin pattern
function errorHandlerPlugin(fastify: FastifyInstance): void {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    // Handle different error types appropriately
    if (error.validation) {
      reply.status(400).send({
        error: "Validation Error",
        message: error.message,
      })
    } else {
      reply.status(500).send({
        error: "Internal Server Error",
        message: error.message,
      })
    }
  })
}

// Process-level error handling in main file
process.on("unhandledRejection", (reason: string, p: Promise<any>) => {
  console.log(p)
  throw new Error(reason)
})

process.on("uncaughtException", (error: Error) => {
  console.error(error)
  // Consider graceful shutdown
})
```

### Async/Await Patterns

```typescript
// Always use async/await over Promise chains
const main = async (): Promise<void> => {
  await fastify.listen({
    port: parseInt(process.env.PORT ?? "5000"),
    host: "0.0.0.0",
  })
}

// eslint-disable-next-line "@typescript-eslint/no-floating-promises"
main()
```

### Database (Drizzle ORM)

```typescript
// Schema definition with explicit types
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
})
```

### Logging

```typescript
// Environment-based logger configuration
export const getLoggerConfig = (): boolean | PinoLoggerOptions => {
  switch (process.env.NODE_ENV) {
    case "production":
      return true // Use default Pino production config
    case "test":
      return false // Disable logging in tests
    case "development":
    default:
      return {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      }
  }
}
```

### Environment Variables

- Use `dotenv` for environment configuration
- Load environment variables at application start
- Provide default values where appropriate
- Use `.env.example` as template (don't commit actual `.env`)

### Fastify Patterns

```typescript
// Register plugins and routes
fastify.register(helmet, { global: true })
fastify.register(userRoutes, { prefix: "/api/users" })

// Use hooks for cross-cutting concerns
fastify.addHook("onRequest", () => {
  fastify.log.info("Got a request")
})

fastify.addHook("onResponse", () => {
  fastify.log.info("Responding")
})
```

### ESLint Rules

- Uses `eslint-config-love` for TypeScript best practices
- Includes security, promise, and Node.js specific rules
- Prettier integration to avoid conflicts
- Some rules disabled: magic numbers, missing import descriptions

### Git Hooks

- **Husky** configured for pre-commit hooks
- **lint-staged** runs ESLint on staged files
- Pre-commit hook prevents commits with linting errors

### Security

- **Helmet** plugin for security headers
- **CORS** configured (check implementation for specifics)
- Input validation through Fastify schemas
- Use parameterized queries (Drizzle ORM handles this)

### Project Structure

```
src/
├── index.ts              # Application entry point
├── router/               # Route handlers
├── models/               # Database schemas
├── utils/                # Utility functions
├── plugins/              # Fastify plugins
└── controllers/          # Business logic (if applicable)

dist/                     # Compiled JavaScript output
```

### Dependencies

**Runtime:**

- Fastify (web framework)
- Drizzle ORM (database ORM)
- Neon Database (serverless Postgres)
- Helmet (security headers)
- CORS (cross-origin requests)
- dotenv (environment variables)

**Development:**

- TypeScript & ts-node
- ESLint with various plugins
- Prettier (formatting)
- Nodemon (development server)
- Husky & lint-staged (git hooks)
- Drizzle Kit (database tooling)

### Node.js Version

- **Node.js 24.12.0** (specified in volta config)
- **Bun** for package management
- **ES modules** throughout the application

### Performance Considerations

- Use Fastify's built-in performance optimizations
- Implement proper logging levels for production
- Consider connection pooling for database operations
- Use environment-specific configurations

### Deployment

- Supports multiple platforms (Railway, Heroku, Docker)
- Environment-based configuration
- Production builds compiled to `dist/`

---

## Quick Start for New Agents

1. **Setup**: `bun install`
2. **Development**: `bun run dev`
3. **Code Quality**: `bun run lint:fix && bun run format`
4. **Build**: `bun run build`
5. **Type Check**: `bun run type-check`

Always run `bun run lint:fix` and `bun run format` before committing changes.</content>
<parameter name="filePath">AGENTS.md
