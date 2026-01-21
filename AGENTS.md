# AGENTS.md - Fastify Bun Starter

Essential information for AI coding agents working in this TypeScript Bun repository.

## Tech Stack

- **Framework**: Fastify v5.7.1
- **Language**: TypeScript v5.9.3 (ES2017 target, ES modules)
- **Runtime**: Bun v1.3.5
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

**Testing Framework**: Vitest (recommended)

#### Setup Testing

1. Install Vitest: `bun add -D vitest @types/node @vitest/ui`
2. Add test scripts: `"test": "vitest", "test:run": "vitest run"`

#### Running Tests

- `bun run test` - Run tests in watch mode
- `bun run test:run` - Run all tests once
- `bun run test:run componentName.test.ts` - Run specific test file

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** - All TypeScript strict checks are active
- **ES2017 target** - Use modern JavaScript features available in ES2017+
- **ES modules** - Use `import`/`export` syntax (package.json has `"type": "module"`)
- **Path mapping** - Use `@/*` to import from `src/` directory

### Import/Export Style

- Prefer named imports over default imports
- Group imports by type: external libraries, then local imports
- Use type-only imports for types/interfaces

### Naming Conventions

- **Variables/Functions**: camelCase (`userRoutes`, `getLoggerConfig`)
- **Types/Interfaces/Classes**: PascalCase (`FastifyInstance`, `UserData`)
- **Files**: kebab-case (`user-router.ts`, `error-handler.ts`)
- **Database columns**: snake_case (Drizzle ORM convention)

### Formatting (Prettier)

- No semicolons, double quotes, 2-space indentation, trailing commas

### Linting (ESLint)

- Flat config with TypeScript ESLint, uses eslint-config-love
- Prettier integration, lint-staged runs on commits

### TypeScript Types and Interfaces

```typescript
// Always use explicit types for function parameters
const userRoutes = (fastify: FastifyInstance): void => {
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{ Body: { name: string; age: number } }>,
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

### Fastify Patterns

```typescript
// Register plugins and routes
fastify.register(helmet, { global: true })
fastify.register(userRoutes, { prefix: "/api/users" })

// Route handlers with proper typing
fastify.get("/api/user/:id", {
  schema: {
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  handler: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params
    // Implementation
  },
})
```

### Project Structure

```
src/
├── index.ts              # Application entry point
├── router/               # Route handlers (Fastify plugin pattern)
├── models/               # Database schemas (Drizzle ORM)
├── controllers/          # Business logic layer
├── utils/                # Utility functions and helpers
├── plugins/              # Fastify plugins (middleware, error handlers)
└── drizzle.config.ts     # Database configuration
```

### Environment Variables

- **PORT**: Server port (default: 5000)
- **DATABASE_URL**: PostgreSQL connection string (required for production)
- Create `.env` file based on `.env.example`

### Git Hooks & Quality Assurance

- **Husky**: Pre-commit hooks for code quality
- **lint-staged**: Runs ESLint on staged files before commits
- **Pre-commit**: Automatically runs `bun run lint` on `*.{js,ts}` files

## Quick Start for New Agents

1. **Setup**: `bun install`
2. **Development**: `bun run dev`
3. **Code Quality**: `bun run lint:fix && bun run format`
4. **Build**: `bun run build`
5. **Type Check**: `bun run type-check`

Always run `bun run lint:fix` and `bun run format` before committing changes.

### Database Development

- **Local**: `bun run db:push` for schema changes
- **Production**: `bun run db:generate` and `bun run db:migrate`
- **Studio**: `bun run db:studio` for database visualization

### Additional Guidelines for Agents

#### Code Review Checklist

- [ ] All imports follow the specified pattern (named imports preferred)
- [ ] Functions have explicit return types
- [ ] Database queries use proper typing with Drizzle ORM
- [ ] Error handling follows the custom plugin pattern
- [ ] Routes use proper Fastify schema validation
- [ ] No console.log statements in production code

#### File Organization

- **Routes**: `src/router/` with kebab-case naming
- **Models**: `src/models/` for database schemas
- **Controllers**: `src/controllers/` for business logic
- **Utils**: `src/utils/` for shared utilities
- **Plugins**: `src/plugins/` for Fastify plugins
