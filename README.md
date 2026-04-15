# Rent Lessly - Effortless Property Rentals

> Rent it effortlessly. A modern rental platform for discovering and managing property rentals in Gurugram.

## 📋 Tech Stack Overview

### Monorepo Architecture
- **Package Manager**: pnpm workspaces
- **Build System**: Turbo (for task orchestration and caching)
- **Architecture Pattern**: Modular Monolith (easily scale to microservices)

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **State Management**: React Context API + Zustand (for complex state)
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: Formik + Yup
- **Hosting**: Cloudflare Pages with OpenNext

### Backend (Express.js)
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Architecture**: Modular Monolith with module-based structure
- **Hosting**: Railway
- **File Storage**: Cloudflare R2

### Shared Packages
- **@rentlessly/types**: Shared TypeScript types and interfaces
- **@rentlessly/utils**: Shared utility functions
- **@rentlessly/ui**: Shared UI components and design system

## 📁 Project Structure

```
rentlessly/
├── apps/
│   ├── web/                    # Next.js frontend application
│   └── api/                    # Express backend application
├── packages/
│   ├── types/                  # Shared TypeScript types (FE + BE)
│   ├── utils/                  # Shared utility functions
│   └── ui/                     # Shared UI components & design system
├── docs/                       # Documentation
├── pnpm-workspace.yaml         # Workspace configuration
├── turbo.json                  # Turbo build configuration
├── package.json                # Root package.json
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Run database migrations
pnpm --filter api run prisma:migrate

# Start development servers
pnpm dev
```

## 📦 Workspace Commands

```bash
# Install dependencies across all workspaces
pnpm install

# Run development for all apps
pnpm dev

# Build all apps and packages
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Run tests
pnpm test
```

## 📚 Module Documentation

- [Frontend Architecture](./docs/FRONTEND.md)
- [Backend Architecture](./docs/BACKEND.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Data Sharing Between FE & BE](./docs/DATA_SHARING.md)
- [Best Practices](./docs/BEST_PRACTICES.md)

## 🏗️ Architecture Principles

### Modular Monolith Design
Each backend module is self-contained with:
- Controllers (HTTP handlers)
- Services (business logic)
- Repositories (data access)
- Schemas (validation)
- Types (TypeScript interfaces)

This structure allows easy migration to microservices by extracting modules into separate services.

### Shared Types Pattern
- Centralized types in `packages/types`
- Both FE and BE import from the same source
- Single source of truth for API contracts
- Reduces type duplication and sync issues

### SEO-First Frontend
- Dynamic metadata generation
- SEO-friendly URL slugs
- Server components for optimal performance
- OpenGraph support for social sharing

## 🔐 Security Features

- JWT-based authentication
- Phone + OTP verification
- CORS middleware
- Input validation with Yup
- Rate limiting on API endpoints
- Secure file uploads to Cloudflare R2

## 🚀 Deployment

### Frontend: Cloudflare Pages + OpenNext
- Automatic deployments from Git
- Edge caching for optimal performance
- Dynamic routes handled seamlessly

### Backend: Railway
- PostgreSQL database
- Environment-based configuration
- Automatic scaling support

## 📖 Domain Model

### Core Entities
- **Users**: Renters and Admins
- **Properties**: Rental listings with images
- **Visits**: Scheduled property visits
- **SavedProperties**: User bookmarks
- **Brokers**: Data providers

For detailed schema, see `apps/api/prisma/schema.prisma`

## 🤝 Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

Proprietary - Rent Lessly Inc.
