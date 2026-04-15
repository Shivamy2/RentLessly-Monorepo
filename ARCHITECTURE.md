# Architecture & Best Practices

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       Rent Lessly Platform                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                           │
│  Next.js 15 (App Router) + Tailwind CSS + React Query           │
│  Deployed on: Cloudflare Pages (CDN)                            │
├─────────────────────────────────────────────────────────────────┤
│ Pages: Home, Property Detail, Saved, Visits, Login              │
│ Components: PropertyCard, SearchBar, Navbar, Footer             │
│ State: Zustand (auth, filters) + React Query (async data)       │
│ Styling: Minimal design with 0px border-radius (No Broker style)│
└─────────────────────────────────────────────────────────────────┘
                              ↓ REST API
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                              │
│  Express.js + Node.js                                           │
│  Deployed on: Railway                                           │
├─────────────────────────────────────────────────────────────────┤
│ Middleware:                                                      │
│  - CORS (origin validation)                                     │
│  - Helmet (security headers)                                    │
│  - Logger (Winston)                                             │
│  - Auth Middleware (JWT verification)                           │
│  - Validation (express-validator)                               │
│  - Error Handler (centralized error management)                 │
│  - Rate Limiting (express-rate-limit)                           │
└─────────────────────────────────────────────────────────────────┘
        ↓ (ORM)         ↓ (File Upload)      ↓ (Authentication)
   ┌─────────────┐  ┌──────────────┐   ┌────────────────┐
   │ PostgreSQL  │  │ Cloudflare   │   │ Twilio SMS/    │
   │ Database    │  │ R2 Storage   │   │ OTP Service    │
   │             │  │ (Images/     │   │                │
   │ Via:        │  │ Videos)      │   │ JWT Tokens     │
   │ Prisma ORM  │  │              │   │                │
   └─────────────┘  └──────────────┘   └────────────────┘
```

---

## Modular Monolith Pattern

### Why Monolith?

✅ **Advantages**
- Single repository, easier to manage
- Shared code and types between modules
- Simpler deployment model
- Better for startup MVP phase
- Can scale to microservices later

❌ **Challenges**
- Tight coupling if not careful
- Single point of failure
- Hard to scale individual modules

### Solution: Modular Structure

Each module is completely independent:

```
modules/
├── auth/
│   ├── auth.routes.js      # Express routes
│   ├── auth.controller.js   # HTTP request handling
│   ├── auth.service.js      # Business logic
│   ├── auth.model.js        # DB schema definition
│   ├── auth.helpers.js      # Utilities specific to auth
│   └── auth.validation.js   # Input validation rules
│
├── property/
│   ├── property.routes.js
│   ├── property.controller.js
│   ├── property.service.js
│   └── ...
```

**Benefits:**
- Each module can be independently tested, deployed
- Clear separation of concerns
- Easy to move to separate service later
- New developer can understand module in isolation

---

## Database Schema & Relationships

### Entity Relationship Diagram

```
┌──────────────┐
│     User     │
├──────────────┤
│ id (PK)      │───────────────┐
│ phoneNumber  │   (1:M)       │
│ email        │               │
│ role         │               │
│ createdAt    │               │
└──────────────┘               │
      ↑                         │
      │ (M:1)                   │
      │                         │
┌─────┴──────────┐        ┌─────▼───────────┐
│ SavedProperty  │        │  SavedProperty  │
├────────────────┤        ├─────────────────┤
│ userId  (FK)   │────────│ propertyId (FK) │
│ propertyId (FK)│        └──────┬──────────┘
└────────────────┘               │
                                  │
                            ┌─────▼─────────┐
                            │   Property    │
                            ├───────────────┤
                            │ id (PK)       │
                            │ title         │
                            │ locality      │
                            │ bhk (int)     │
                            │ rent (money)  │
                            │ slug (unique) │
                            │ furnishedType │
                            │ createdAt     │
                            └───────┬───────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────▼────────┐ ┌────▼─────────┐ ┌──▼────────────┐
            │PropertyImage   │ │    Broker    │ │    Visit      │
            ├────────────────┤ ├──────────────┤ ├───────────────┤
            │ url            │ │ id           │ │ propertyId(FK)│
            │ order          │ │ name         │ │ userId (FK)   │
            │ propertyId(FK) │ │ phone        │ │ visitDate     │
            └────────────────┘ │ email        │ │ timeSlot      │
                               │ createdAt    │ │ status        │
                               └──────────────┘ └───────────────┘
```

### Data Flow

```
Frontend Form Input
    ↓
Validation (Formik + Yup on FE, express-validator on BE)
    ↓
HTTP Request → Express Controller
    ↓
Input Sanitization & Authorization Check
    ↓
Business Logic in Service Layer
    ↓
Prisma ORM Query to PostgreSQL
    ↓
Response Formatting
    ↓
HTTP Response to Frontend
    ↓
React Query Caching & UI Update
```

---

## Authentication & Authorization

### JWT Token Strategy

```
┌─ Access Token (short-lived: 15 minutes)
│  {
│    userId: "cuid123",
│    phoneNumber: "+919876543210",
│    role: "USER",
│    iat: 1234567890,
│    exp: 1234567890 + 15*60
│  }
│  Stored: localStorage (vulnerable to XSS but convenient)
│
└─ Refresh Token (long-lived: 7 days)
   {
     userId: "cuid123",
     type: "refresh",
     iat: 1234567890,
     exp: 1234567890 + 7*24*60*60
   }
   Stored: httpOnly cookie (cannot be accessed by JS, safer)
   
When Access Token Expires:
  1. Frontend detects 401 error
  2. Sends Refresh Token to /auth/refresh-token
  3. Backend validates & issues new Access Token
  4. Frontend retries original request with new token
```

### Role-Based Access Control (RBAC)

```
USER:
  - View properties
  - Search & filter
  - Save properties
  - Schedule visits
  - View profile

ADMIN:
  - All USER permissions
  - Create/Edit/Delete properties
  - Manage brokers
  - View analytics

BROKER:
  - View own properties
  - Respond to visit requests
  - Track leads
```

---

## API Endpoint Structure

### Naming Convention

```
GET    /api/{resource}              # List all
GET    /api/{resource}/{id}         # Get one
GET    /api/{resource}/slug/{slug}  # Get by slug
POST   /api/{resource}              # Create
PUT    /api/{resource}/{id}         # Update
DELETE /api/{resource}/{id}         # Delete

Example:
GET    /api/properties              # List properties
GET    /api/properties/2             # Get property with ID 2
GET    /api/properties/slug/2-bhk-sector-56-12345  # SEO slug
POST   /api/properties              # Create property (admin)
```

### Response Format

All responses follow consistent JSON structure:

```javascript
// Success Response
{
  success: true,
  message: "Operation successful",
  data: { ... },
  pagination: { page, limit, total, pages }  // Only if list endpoint
}

// Error Response
{
  success: false,
  message: "Error description",
  errors: ["Field1: error message", "Field2: error message"],
  // Stack trace only in development
}
```

---

## Frontend State Management

### Zustand Stores (Local State)

```
authStore
  ├─ user: User | null
  ├─ isAuthenticated: boolean
  ├─ sendOTP(phoneNumber)
  ├─ verifyOTP(phoneNumber, otp)
  ├─ logout()
  └─ ...

filterStore
  ├─ filters: { location, bhk, priceMin, priceMax, furnished }
  ├─ page: number
  ├─ limit: number
  ├─ setFilter(key, value)
  ├─ clearFilters()
  └─ ...
```

### React Query (Server State)

```
// Queries (reading)
useQuery(['properties', filters], () => fetchProperties(filters))
useQuery(['property', id], () => fetchProperty(id))
useQuery(['saved-properties'], () => fetchSavedProperties())

// Mutations (writing)
useMutation((visitData) => scheduleVisit(visitData))
useMutation((propertyId) => saveProperty(propertyId))

// Caching Strategy
- 5 min staleTime: Properties list
- 10 min staleTime: Single property (detail page)
- Auto-refetch on window focus disabled (for better UX)
- On mutation success: invalidate related queries
```

---

## File Upload Pipeline

### Image Upload Flow

```
User selects image in browser
    ↓
Frontend: Compress image (sharp-js or similar)
    ↓
Frontend: Upload to /api/media/upload
    ↓
Backend: Validate file
    ↓
Backend: Generate unique filename with timestamp
    ↓
Backend: Upload to Cloudflare R2 using S3 SDK
    ↓
Backend: Return public R2 URL
    ↓
Frontend: Store URL in Prisma (PropertyImage table)
    ↓
Display image using Next.js Image component with R2 URL
```

### Cloudflare R2 URL Structure

```
https://{bucket}.r2.cloudflarestorage.com/{path}

Example:
https://rentlessly.r2.cloudflarestorage.com/uploads/1625097600000-abc123.jpg

With Custom Domain (recommended):
https://images.rentlessly.app/uploads/1625097600000-abc123.jpg
```

---

## SEO Strategy

### Dynamic Metadata Generation

```javascript
// Property Detail Page
export async function generateMetadata({ params }) {
  const property = await fetchProperty(params.slug);
  
  return {
    title: `${property.bhk} BHK in ${property.locality} - ₹${property.rent}L`,
    description: `Find ${property.bhk} BHK ${property.furnishedType} property...`,
    keywords: [`${property.bhk} BHK`, `${property.locality}`, `Rental`],
    openGraph: {
      title: ...,
      description: ...,
      images: [property.images[0].url],
      type: 'website',
      url: `https://rentlessly.app/property/${params.slug}`
    }
  };
}
```

### URL Structure (SEO Slug)

```
❌ Not SEO friendly:
/property/12345

✅ SEO friendly:
/property/2-bhk-fully-furnished-sector-56-gurugram-12345
          └─────────────────────────────────────┬──────┘
                                         Property ID
```

Benefits:
- Keywords in URL
- Human-readable
- Better CTR in search results
- Extract ID easily: `slug.split('-').pop()`

---

## Error Handling Strategy

### Centralized Error Handling

```javascript
// 1. Custom AppError class
class AppError extends Error {
  constructor(message, statusCode, errors) {
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// 2. Service layer throws AppError
throw new AppError('User not found', 404);

// 3. Express error middleware catches
app.use(errorMiddleware);

// 4. Returns consistent error response
{
  success: false,
  message: "User not found",
  statusCode: 404
}
```

### HTTP Status Codes Used

- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate, already exists)
- `422`: Unprocessable Entity (validation)
- `429`: Too Many Requests (rate limit)
- `500`: Internal Server Error

---

## Performance Optimizations

### Frontend

- **Image Optimization**: Next.js Image component + Cloudflare compression
- **Code Splitting**: Automatic by Next.js App Router
- **CSS-in-JS**: Tailwind CSS (purged at build time)
- **Caching**: React Query + localStorage
- **Lazy Loading**: Dynamic imports for heavy components
- **SEO**: generateMetadata for crawlability

### Backend

- **Database Indexing**: Index on `phoneNumber`, `locality`, `bhk`, `rent`
- **Query Optimization**: Select only required fields, pagination
- **Connection Pooling**: PgBouncer for PostgreSQL
- **Caching Headers**: Set appropriate cache-control headers
- **Gzip Compression**: Enabled by default

### Infrastructure

- **CDN**: Cloudflare Pages caches static assets globally
- **Database**: Railway PostgreSQL with auto-backups
- **Monitoring**: Set up Sentry for error tracking, NewRelic for APM

---

## Security Best Practices

1. **Environment Variables**: Never commit .env files
2. **JWT Secrets**: Min 32 characters, rotate regularly
3. **HTTPS Only**: Enforce SSL/TLS
4. **CORS**: Whitelist only your frontend domain
5. **Rate Limiting**: 100 requests/min per IP
6. **Input Validation**: Always validate on backend
7. **SQL Injection**: Use Prisma (parameterized queries)
8. **CSRF**: Use httpOnly cookies for sensitive tokens
9. **XSS**: Sanitize user input, use CSP headers
10. **Helmet.js**: Set security headers automatically

---

## Logging Strategy

```javascript
// Winston Logger Levels
logger.error()    // Errors (saved to file)
logger.warn()     // Warnings
logger.info()     // Info messages
logger.debug()    // Debug info
logger.trace()    // Detailed traces

// Log Format
{
  timestamp: "2024-04-14T10:30:00Z",
  level: "error",
  message: "Database connection failed",
  userId: "user123",
  duration: "250ms"
}
```

---

## Scaling Path

### Current Setup (MVP)
```
1 Railway Dyno (API)
1 PostgreSQL Database
Cloudflare Pages CDN
```

### Scale to 10K Users
```
3 Railway Dynos (load balanced)
PostgreSQL with read replicas
Redis for caching/OTP
```

### Scale to 100K Users
```
Kubernetes cluster (EKS/GKE)
PostgreSQL → Managed service (RDS)
Redis cluster
Elasticsearch for search
Message queue (RabbitMQ/Kafka)
```

### Move to Microservices
```
Each module becomes separate service:
- auth-service
- property-service
- visit-service
- notification-service
- media-service

API Gateway (Kong/Traefik) routes requests
Service-to-service communication via RPC/Event Bus
```

---

## Development Best Practices

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

Fixes #<issue-number>

Types: feat, fix, docs, refactor, test, chore, ci
```

### Code Style
- ESLint + Prettier (no semicolons, 80 char width, single quotes)
- All functions should have JSDoc comments
- Modular, reusable code
- DRY principle

### Testing Strategy (Future)
- Unit tests for utilities and services (Jest)
- Integration tests for API endpoints (Supertest)
- E2E tests for critical user flows (Cypress)
- Target: 80% code coverage

---

## Troubleshooting Decision Tree

```
Issue: Application won't start
├─ Ports in use? → Kill process on port 3000/5000
├─ Missing .env? → Copy .example files
├─ Node version? → Check nvm or update Node
└─ pnpm install failed? → Clear cache: pnpm install --no-frozen-lockfile

Issue: Database errors
├─ Connection refused? → Check DATABASE_URL
├─ Migration failed? → Reset: pnpm run prisma:migrate reset
├─ Type mismatch? → Regenerate: pnpm run prisma:generate
└─ Data corruption? → Restore from backup

Issue: Deployment failure
├─ Build errors? → Check logs: railway logs
├─ Runtime error? → Check environment variables
├─ Database migration? → Connect to Railway shell
└─ Cold start timeout? → Increase timeout in Railway

Issue: Performance issues
├─ Slow queries? → Add database indexes
├─ Memory leak? → Check Node process with top
├─ Frontend slow? → Check Network tab, profile with React DevTools
└─ API slow? → Use APM tool (New Relic)
```

---

This architecture is designed to be **scalable, maintainable, and production-ready** while remaining simple enough for a startup MVP.
