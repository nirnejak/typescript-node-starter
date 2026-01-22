# AGENTS.md - Hono Bun Starter

Essential information for AI coding agents working in this TypeScript Bun repository.

## Tech Stack

- **Framework**: Hono v4.x
- **Language**: TypeScript v5.x (ES2017 target, ES modules)
- **Runtime**: Bun v1.3.5
- **Package Manager**: Bun
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Authentication**: Better Auth v1.x
- **Validation**: Zod v4.x

## Essential Commands

### Development

- `bun run dev` - Start development server with hot reload
- `bun start` - Start production server from dist/
- `bun run build` - Compile TypeScript to `dist/`
- `bun run type-check` - Type checking without compilation

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

**Note**: No testing framework is currently configured, but the CI pipeline expects tests. To add Vitest:

1. Install Vitest: `bun add -D vitest @vitest/ui jsdom`
2. Add test scripts to package.json:
   ```json
   "scripts": {
     "test": "vitest",
     "test:run": "vitest run",
     "test:watch": "vitest --watch",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest run --coverage"
   }
   ```
3. Create `vitest.config.ts`:

   ```typescript
   import { defineConfig } from "vitest/config"

   export default defineConfig({
     test: {
       globals: true,
       environment: "node",
     },
   })
   ```

4. Run all tests: `bun run test:run`
5. Run specific test: `bun run test:run path/to/test-file.test.ts`
6. Run tests in watch mode: `bun run test:watch`
7. View test coverage: `bun run test:coverage`

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
import { z } from "zod"

import { db } from "@/db"
import { waitlist } from "@/db/schema"
import { addToWaitlist } from "@/controllers/waitlist"
```

### Naming Conventions

- **Variables/Functions**: camelCase (`userRoutes`, `getLoggerConfig`, `addToWaitlist`)
- **Types/Interfaces/Classes**: PascalCase (`UserData`, `HonoInstance`, `WaitlistController`)
- **Files**: kebab-case (`user-router.ts`, `error-handler.ts`, `auth-utils.ts`)
- **Database tables/columns**: snake_case (Drizzle ORM convention)
- **Constants**: UPPER_SNAKE_CASE
- **Router instances**: descriptive names ending with "Routes" or "Route"

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

// Route groups with validation
const api = new Hono()
api.get("/users", getUsersHandler)
app.route("/api", api)

// Authentication routes
app.on(
  ["POST", "GET"],
  "/api/auth/*",
  async (c) => await auth.handler(c.req.raw)
)
```

### Database Patterns (Drizzle ORM)

```typescript
// Schema definition with relations
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Database connection
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

// Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
}))

// Queries with error handling
export async function getUsers() {
  return await db.select().from(user)
}

export async function createUser(email: string, name: string) {
  return await db.insert(user).values({ email, name }).returning()
}
```

### Controller Patterns

```typescript
// Business logic separation with proper error handling
export async function getUsers() {
  try {
    const users = await db.select().from(userTable)
    return { success: true, data: users }
  } catch (error) {
    console.error("Database error:", error)
    return { success: false, message: "Failed to fetch users" }
  }
}

export async function addToWaitlist(email: string) {
  try {
    await db.insert(waitlist).values({ email })
    return { success: true, message: "Joined waitlist!" }
  } catch (error) {
    console.error("Error processing request:", error)
    return { success: false, message: "Failed to add to waitlist!" }
  }
}
```

### Router Patterns

```typescript
import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const router = new Hono()

// GET routes
router.get("/", async (c) => {
  const result = await getData()
  return result.success
    ? c.json(result.data)
    : c.json({ error: result.message }, 500)
})

// POST routes with validation
router.post(
  "/",
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
      name: z.string().min(1),
    })
  ),
  async (c) => {
    const body = c.req.valid("json")
    const result = await createData(body)
    return result.success
      ? c.json(result.data, 201)
      : c.json({ error: result.message }, 400)
  }
)

export default router
```

### Authentication Patterns (Better Auth)

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
})
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

// Process-level error handling
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  throw new Error(reason)
})

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error)
  process.exit(1)
})
```

## Project Structure

```
src/
├── index.ts              # Application entry point and middleware setup
├── router/               # Route definitions (Hono sub-apps)
│   ├── user.ts          # User-related routes
│   ├── waitlist.ts      # Waitlist routes
│   └── stream.ts        # Streaming routes
├── db/                   # Database schemas (Drizzle ORM tables)
│   ├── index.ts         # Database connection
│   ├── schema.ts        # Table definitions and relations
│   └── migrations/      # Generated migrations
├── controllers/          # Business logic and data operations
│   └── waitlist.ts      # Waitlist controller functions
└── utils/                # Utility functions and helpers
    ├── auth.ts          # Authentication utilities
    └── datetime.ts      # Date/time utilities
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

### Testing Development

- **Add Testing**: Follow the testing setup instructions above
- **Run Tests**: `bun run test:run`
- **Watch Mode**: `bun run test:watch` for continuous testing
- **Coverage**: `bun run test:coverage` to generate coverage reports

## Additional Guidelines for Agents

### Code Review Checklist

- [ ] All imports follow the specified pattern (named imports preferred)
- [ ] Functions have explicit return types where beneficial
- [ ] Database operations include proper error handling
- [ ] Routes use appropriate HTTP status codes (200, 201, 400, 404, 500)
- [ ] Zod validation schemas are used for request bodies
- [ ] No console.log statements in production code (use proper logging)
- [ ] Environment variables are properly validated
- [ ] Database queries use parameterized statements (Drizzle handles this)
- [ ] Controllers return consistent response objects with success/error structure
- [ ] Authentication routes are properly integrated with Better Auth
- [ ] Router files export default Hono instances

### File Organization

- **Routes**: `src/router/` - Keep route definitions clean, delegate to controllers
- **Models**: `src/db/` - Database schemas and types only
- **Controllers**: `src/controllers/` - Business logic and data operations
- **Utils**: `src/utils/` - Pure functions, helpers, shared logic
- **Auth**: `src/utils/auth.ts` - Authentication configuration and utilities

### Security Best Practices

- Use Zod for all input validation
- Implement proper error handling without exposing sensitive information
- Use parameterized queries (automatically handled by Drizzle)
- Validate environment variables
- Implement secure headers via Hono middleware
- Use HTTPS in production
- Never log sensitive data like passwords or tokens
