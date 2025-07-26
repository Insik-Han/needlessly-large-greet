# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a gRPC/Connect-RPC monorepo that implements a simple greeting service with multiple frontend clients.

### Core Components:
- **Go gRPC Server** (`apps/server/`): Serves the GreetService using Connect-RPC on port 8080
- **Nuxt Web Client** (`apps/web-nuxt/`): Vue-based frontend using Connect-RPC web client
- **SvelteKit Web Client** (`apps/web-svelte/`): Svelte-based frontend using Connect-RPC web client
- **Proto Definitions** (`packages/proto/`): Shared protobuf definitions for the greet service

## Development Commands

### Root-level commands (run from project root):
```bash
pnpm install          # Install all dependencies
pnpm dev             # Start all services in development mode
pnpm build           # Build all packages
pnpm lint            # Run linting across all packages
pnpm generate:proto  # Generate protobuf code for all packages
pnpm check-types     # Run type checking
```

### Go Server (`apps/server/`):
```bash
go run ./cmd/server/main.go  # Start the server
buf generate ../../packages/proto --template buf.gen.yaml  # Generate Go protobuf code
```

### Web Clients:
- Both Nuxt and Svelte apps run on different ports in development
- They connect to the Go server at `http://localhost:8080`
- Each has its own `buf.gen.yaml` for generating TypeScript protobuf code

## Protocol Buffers

The service is defined in `packages/proto/greet/v1/greet.proto`:
- Service: `GreetService` with a single `Greet` RPC
- Request: `GreetRequest` with a `name` field
- Response: `GreetResponse` with a `greeting` field

Each app has its own `buf.gen.yaml` configuration to generate language-specific code from the proto files.

## Required Tools

Install these tools before development:
```bash
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## Build System

This project uses:
- **Turborepo** for monorepo task orchestration
- **pnpm** (v9.0.0) as the package manager
- **Node.js** (>=18) required

The `turbo.json` defines the task pipeline with proper dependencies and caching.