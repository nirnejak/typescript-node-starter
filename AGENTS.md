# AGENTS.md - Hono Bun Starter

Essential information for AI coding agents working in this TypeScript Bun repository.

## Tech Stack

- **Framework**: Hono v4.x
- **Language**: TypeScript v5.x (ES2017 target, ES modules)
- **Runtime**: Bun v1.3.5
- **Package Manager**: Bun
- **Database**: Drizzle ORM with Neon PostgreSQL

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

**Note**: No testing framework is currently configured. To add testing:

1. Install Vitest: `bun add -D vitest @vitest/ui`
2. Add test scripts to package.json: `"test": "vitest", "test:run": "vitest run"`
3. Run all tests: `bun run test:run`
4. Run specific test: `bun run test:run path/to/test-file.test.ts`

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** - All TypeScript strict checks are active
- **ES2017 target** - Use modern JavaScript features available in ES2017+
- **ES modules** - Use `import`/`export` syntax (package.json has `"type": "module"`)
- **Path mapping** - Use `@/*` to import from `src/` directory

### Import/Export Style

- Prefer named imports over default imports for better tree-shaking
- Group imports by type: external libraries first, then local imports
- Use absolute imports with `@/` prefix for internal modules
- One import per line for clarity

```typescript
import { Hono } from "hono"
import { logger } from "hono/logger"

import { db } from "@/drizzle.config"
import { users } from "@/models/schema"
```

### Naming Conventions

- **Variables/Functions**: camelCase (`userRoutes`, `getLoggerConfig`)
- **Types/Interfaces/Classes**: PascalCase (`UserData`, `HonoInstance`)
- **Files**: kebab-case (`user-router.ts`, `error-handler.ts`)
- **Database tables/columns**: snake_case (Drizzle ORM convention)
- **Constants**: UPPER_SNAKE_CASE

### Formatting (Prettier)

- No semicolons
- Double quotes for strings
- 2-space indentation
- Trailing commas in ES5 style
- Auto end-of-line handling

### Linting (ESLint)

- Flat config with TypeScript ESLint and eslint-config-love
- Prettier integration for consistent formatting
- Additional plugins: node, promise, security
- Custom rules disable several strict checks for developer experience

### Hono Patterns

```typescript
// Application setup
const app = new Hono()

// Middleware
app.use(logger())
app.use(secureHeaders())

// Routes
app.get("/", (c) => c.text("Hello Hono!"))

// Route groups
const api = new Hono()
api.get("/users", getUsersHandler)
app.route("/api", api)

export default app
```

### Database Patterns (Drizzle ORM)

```typescript
// Schema definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
})

// Database connection
const sql = neon(Bun.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

// Queries
export async function getUsers() {
  return await db.select().from(users)
}

export async function createUser(email: string) {
  return await db.insert(users).values({ email }).returning()
}
```

### Error Handling

```typescript
// Controller error handling
export async function someOperation() {
  try {
    // Operation logic
    return { success: true, data }
  } catch (error) {
    console.error("Operation failed:", error)
    return { success: false, message: "Operation failed" }
  }
}

// Global error handling in main app
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text("Internal Server Error", 500)
})
```

### Controller Patterns

```typescript
// Business logic separation
export async function getUsers() {
  try {
    const users = await db.select().from(usersTable)
    return { success: true, data: users }
  } catch (error) {
    console.error("Database error:", error)
    return { success: false, message: "Failed to fetch users" }
  }
}

// Route handler integration
app.get("/users", async (c) => {
  const result = await getUsers()
  return result.success
    ? c.json(result.data)
    : c.json({ error: result.message }, 500)
})
```

## Project Structure

```
src/
├── index.ts              # Application entry point and middleware setup
├── router/               # Route definitions (Hono sub-apps)
├── models/               # Database schemas (Drizzle ORM tables)
├── controllers/          # Business logic and data operations
├── utils/                # Utility functions and helpers
└── drizzle.config.ts     # Database configuration
```

## Environment Variables

- **PORT**: Server port (default: 9000 in .env.example)
- **DATABASE_URL**: Neon PostgreSQL connection string (required)
- Create `.env` file based on `.env.example`

## Git Hooks & Quality Assurance

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
- [ ] Functions have explicit return types where beneficial
- [ ] Database operations include proper error handling
- [ ] Routes use appropriate HTTP status codes
- [ ] No console.log statements in production code (use proper logging)
- [ ] Environment variables are properly validated
- [ ] Database queries use parameterized statements (Drizzle handles this)

#### File Organization

- **Routes**: `src/router/` - Keep route definitions clean, delegate to controllers
- **Models**: `src/models/` - Database schemas and types only
- **Controllers**: `src/controllers/` - Business logic and data operations
- **Utils**: `src/utils/` - Pure functions, helpers, shared logic
