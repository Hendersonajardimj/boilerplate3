# My TypeScript Vite Express Prisma

A production-ready full-stack TypeScript web application with a Vite-powered React client, Express server, and PostgreSQL database accessed through Prisma.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) (for PostgreSQL)

## Quick Start

Clone and run in three commands:

```bash
git clone <repo-url>
cd my-ts-vite-express-prisma
pnpm install
docker compose up -d
pnpm prisma migrate dev
pnpm dev
```

This will:
1. Install all dependencies
2. Start PostgreSQL in Docker
3. Run database migrations
4. Start both the client and server in development mode

The web client will be available at http://localhost:5173 and the API at http://localhost:8080.

## Database Migration Flow

```bash
# Create a new migration
pnpm --filter prisma migrate dev --name your_migration_name

# Apply migrations to the database
pnpm migrate

# Generate Prisma client
pnpm generate
```

## Script Glossary

| Command | Description |
| --- | --- |
| `pnpm dev` | Start both client and server in development mode |
| `pnpm build` | Build both client and server for production |
| `pnpm start` | Start the server in production mode |
| `pnpm migrate` | Run database migrations |
| `pnpm generate` | Generate Prisma client |
| `pnpm test` | Run all tests |
| `pnpm lint` | Run ESLint on all files |
| `pnpm format` | Run Prettier on all files |

## Project Structure

```
my-ts-vite-express-prisma/
├─ apps/
│  ├─ web/          ⇢ Vite React client
│  └─ api/          ⇢ Express server source
├─ prisma/          ⇢ schema.prisma and seed script
├─ docker/
│  └─ docker-compose.yml  ⇢ PostgreSQL for dev + CI
├─ .github/workflows/     ⇢ continuous integration and deployment
├─ packages/        ⇢ shared code (e.g. ui, utils)
├─ .env.example     ⇢ documented environment variables
├─ tsconfig.base.json     ⇢ shared compiler options
├─ package.json     ⇢ pnpm workspaces and root scripts
```

## Deployment with Fly.io

1. Install the Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login to Fly: `flyctl auth login`
3. Create a new app: `flyctl apps create my-app-name`
4. Set required secrets:

```bash
flyctl secrets set DATABASE_URL="your-production-db-url"
flyctl secrets set API_PORT="8080"
```

5. Deploy the app: `flyctl deploy`

For CI/CD deployment, add your `FLY_API_TOKEN` to your GitHub repository secrets.

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /users` - Create a new user with email

Example:

```bash
curl -X POST http://localhost:8080/users -d '{"email":"me@example.com"}'
```

## Environment Variables

See `.env.example` for all required environment variables. Create a `.env` file in the root directory with your local values.
