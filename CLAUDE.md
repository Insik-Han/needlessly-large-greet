# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `pnpm dev` - Run all services in development mode (server + web apps)
- `pnpm build` - Build all packages
- `pnpm lint` - Run linting across all packages
- `pnpm check-types` - Run TypeScript type checking

### Protocol Buffer Generation
- `pnpm generate:proto` - Generate code from proto files for all apps
- Individual app proto generation:
  - Server: `cd apps/server && npm run generate:proto`
  - Nuxt: `cd apps/web-nuxt && npm run generate:proto`
  - Svelte: `cd apps/web-svelte && npm run generate:proto`

### Running Individual Services
- Go server: `cd apps/server && go run ./cmd/server/main.go` (runs on localhost:8080)
- Svelte app: `cd apps/web-svelte && pnpm dev` (runs on localhost:3000)
- Nuxt app: `cd apps/web-nuxt && pnpm dev` (runs on localhost:3001)

## Architecture Overview

This is a monorepo using pnpm workspaces and Turborepo for a gRPC/Connect-RPC application with:

### Core Components
1. **Protocol Buffers** (`packages/proto/greet/v1/greet.proto`)
   - Defines the `GreetService` with a single `Greet` RPC method
   - Shared contract between server and clients

2. **Go Server** (`apps/server/`)
   - Connect-RPC server implementing the GreetService
   - Uses HTTP/2 with h2c for gRPC-Web compatibility
   - CORS configured for localhost:3000 and localhost:3001

3. **Web Clients**
   - **Nuxt** (`apps/web-nuxt/`) - Vue-based SSR app using Connect-RPC client
   - **Svelte** (`apps/web-svelte/`) - SvelteKit SSR app using Connect-RPC client
   - Both use server-side rendering to make gRPC calls via Connect-RPC's Node transport

### Code Generation Flow
1. Proto files in `packages/proto/` are the source of truth
2. Each app has its own `buf.gen.yaml` configuration
3. Generated code:
   - Go: `apps/server/gen/` (uses protoc-gen-go and protoc-gen-connect-go)
   - TypeScript: `apps/web-*/src/gen/` or `shared/gen/` (uses protoc-gen-es)

### Key Dependencies
- **Go**: Requires buf, grpcurl, protoc-gen-go, and protoc-gen-connect-go installed
- **Node**: Uses pnpm as package manager (v10.13.1)
- **Turborepo**: Orchestrates builds and development across all packages