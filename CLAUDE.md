# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo using Turborepo that implements a gRPC/Connect-RPC greeting service with multiple frontend clients. The project demonstrates a full-stack architecture with:

- **Go backend server** using Connect-RPC (gRPC-compatible protocol)
- **Nuxt.js (Vue) frontend**
- **SvelteKit frontend**
- **Shared Protocol Buffer definitions**

## Architecture

### Key Components

1. **`/packages/proto/`** - Protocol Buffer definitions for the gRPC service
   - Defines the `GreetService` with `Greet` RPC method
   - Shared across all applications

2. **`/apps/server/`** - Go backend server
   - Implements the gRPC/Connect-RPC service
   - Runs on `http://localhost:8080`
   - Uses Connect-RPC for HTTP/2 and HTTP/1.1 compatibility
   - CORS configured for frontend apps

3. **`/apps/web-nuxt/`** - Nuxt.js frontend
   - Runs on port 3000
   - Uses Connect-RPC web client

4. **`/apps/web-svelte/`** - SvelteKit frontend  
   - Runs on port 3001
   - Uses Connect-RPC web client

### Code Generation Flow

Protocol Buffers are used to generate type-safe code for all applications:
- Go server: generates to `apps/server/gen/`
- Nuxt app: generates to `apps/web-nuxt/src/gen/`
- Svelte app: generates to `apps/web-svelte/src/gen/`

## Common Commands

### Monorepo Commands (run from root)

```bash
# Install dependencies
pnpm install

# Start all development servers
pnpm dev

# Build all applications
pnpm build

# Run linting
pnpm lint

# Generate protobuf code for all apps
pnpm generate:proto

# Type checking
pnpm check-types
```

### Individual App Commands

#### Server (Go)
```bash
cd apps/server

# Start development server
pnpm dev
# or
go run ./cmd/server/main.go

# Generate protobuf code
pnpm generate:proto
```

#### Nuxt Frontend
```bash
cd apps/web-nuxt

# Start development server
pnpm dev

# Build for production
pnpm build

# Generate protobuf code
pnpm generate:proto
```

#### Svelte Frontend
```bash
cd apps/web-svelte

# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm check

# Generate protobuf code
pnpm generate:proto
```

## Required Tools

Before starting development, ensure these tools are installed:

```bash
# Protocol Buffer compiler and plugins
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## Development Workflow

1. **Modifying the API**: Edit `.proto` files in `/packages/proto/`
2. **Regenerate code**: Run `pnpm generate:proto` from root
3. **Implement changes**: Update server and client code to match new API
4. **Test locally**: Use `pnpm dev` to run all services

## Technical Stack

- **Monorepo Tool**: Turborepo
- **Package Manager**: pnpm (v9.0.0)
- **Node Version**: >=18
- **Backend**: Go with Connect-RPC
- **Frontends**: Nuxt.js (Vue 3), SvelteKit
- **Protocol**: Protocol Buffers with buf.build toolchain
- **Type Safety**: TypeScript for frontends, generated types from protobuf