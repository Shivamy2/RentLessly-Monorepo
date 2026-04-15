# Best Practices & Library Guide

## 🔐 Authentication & Security

### JWT Libraries

**jsonwebtoken** ✅ (Used)
- Industry standard for JWT handling
- Lightweight, no external dependencies
- Symmetric (HS256) and asymmetric (RS256) support
- Actively maintained, 70K+ weekly downloads
- Alternative: `jose` (more modern but less popular)

**bcryptjs** ✅ (Used)
- Hash passwords securely
- Salting built-in (10 rounds default)
- Pure JavaScript (no native bindings needed)
- Alternative: `argon2` (more secure but slower)

### OTP/SMS

**twilio** ✅ (Used)
- SMS, WhatsApp, Voice APIs
- Excellent documentation
- Reliable (~99.9% uptime)
- Cost: $0.0075 per SMS (India)
- Alternative: `aws-sns` (cheaper for bulk), `nexmo/vonage` (more features)

---

## 📊 Database & ORM

### Prisma ORM ✅ (Used)
```javascript
// Why Prisma?
✅ Type-safe queries (prevents SQL injection)
✅ Auto-generated client
✅ Schema-first approach
✅ Excellent migration system
✅ Intuitive query syntax
✅ Built-in pagination

// VS Code support: VS Code Prisma extension
// Visualize: prisma studio
```

### PostgreSQL Connection Pooling

**PgBouncer** (Recommended for production)
```
DATABASE_URL="postgresql://user:pass@host/db?schema=public&pgbouncer=true"
```

Alternative: `node-pg-pool` (built-in pooling)

---

## 📁 File Storage

### Cloudflare R2 ✅ (Used)
```javascript
// Why Cloudflare R2?
✅ S3-compatible API (use @aws-sdk/client-s3)
✅ Unlimited egress (no overage charges)
✅ $0.35/GB storage (vs AWS S3: $0.023 + egress)
✅ Global CDN integration
✅ Zero trust access controls
```

**AWS SDK S3 Client**
```bash
npm install @aws-sdk/client-s3
```

Alternative file storage options:
- **AWS S3**: Most popular, pricier with egress charges
- **Google Cloud Storage**: Good alternative, similar pricing
- **MinIO**: Self-hosted open-source S3-compatible
- **DigitalOcean Spaces**: Simpler UI, $5/mo + pay per GB

### Image Optimization

**Sharp** (Recommended for local processing)
```bash
npm install sharp
```
- Fast image processing
- WebP/AVIF conversion
- Thumbnail generation
- Works server-side (Node.js)

**Next.js Image Component** ✅ (Used in frontend)
- Built-in optimization
- Lazy loading, responsive
- Format negotiation (WebP/AVIF)
- Integrates with Cloudflare CDN

---

## 📝 Logging

### Winston ✅ (Used)
```javascript
// Why Winston?
✅ Structured logging (JSON format)
✅ Multiple transports (console, file, etc.)
✅ Log levels (error, warn, info, debug, trace)
✅ Timestamp, stack traces automatically
✅ Production-ready
```

Alternative loggers:
- **Pino**: Faster, lower overhead (better for high-traffic)
- **Bunyan**: Structured JSON (deprecated)
- **Morgan**: HTTP request logger (middleware-specific)

### Observability Stack (Production)

1. **Error Tracking**: Sentry
   ```bash
   npm install @sentry/node
   ```

2. **Performance Monitoring**: New Relic
   ```bash
   npm install newrelic
   ```

3. **Log Aggregation**: ELK Stack or Datadog
   - Winston + Logstash + Elasticsearch
   - Or: Winston → Datadog

---

## 🔗 HTTP Client

### Axios ✅ (Used)
```javascript
// Why Axios?
✅ Promise-based (async/await friendly)
✅ Request/response interceptors
✅ Auto request/response serialization
✅ Timeout support
✅ Cancel request tokens
✅ Works in Node.js AND Browser
```

Frontend usage example:
```javascript
// Request interceptor (add auth token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (handle token refresh)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token logic
    }
  }
);
```

### Fetch API (Native)
- Built-in (no dependency)
- Modern, standardized
- No auto JSON serialization (requires extra code)
- Less flexible than Axios

**Our choice**: Axios for universality (Node.js + Browser)

---

## ✓ Input Validation

### Backend

**express-validator** ✅ (Used)
```javascript
body('email').isEmail().normalizeEmail()
body('phone').matches(/^\d{10}$/)
body('age').isInt({ min: 18, max: 100 })
```

- Express middleware
- Fluent API
- Built-in sanitization
- Chainable validators

Alternative: `joi` (more powerful but overkill for Express)

### Frontend

**Formik + Yup** ✅ (Used)
```javascript
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Invalid phone')
    .required(),
});

const { values, errors, handleSubmit } = useFormik({
  initialValues: { phoneNumber: '' },
  validationSchema,
  onSubmit: (values) => {/* ... */}
});
```

Alternatives:
- **React Hook Form**: More performant, less re-renders
- **Zod**: Type-safe schema validation
- **Valibot**: Lightweight alternative to Zod

---

## 🚦 Rate Limiting

### express-rate-limit ✅ (Used)
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Stricter limit for auth
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, // 5 attempts per minute
});

app.post('/api/auth/send-otp', authLimiter, authController.sendOTP);
```

### Redis-backed Rate Limiting (Production)
```bash
npm install redis rate-limit-redis
```
- Persistent across server restarts
- Distributed rate limiting across multiple servers
- More accurate

---

## 🔒 Security Headers

### Helmet.js ✅ (Used)
```javascript
import helmet from 'helmet';

app.use(helmet());

// Sets these headers:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// X-XSS-Protection: 1; mode=block
// Strict-Transport-Security
// Content-Security-Policy
```

---

## 📊 State Management (Frontend)

### Zustand ✅ (Used for local state)
```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

Why Zustand?
- ✅ Minimal boilerplate (30 LOC vs Redux 100+ LOC)
- ✅ No provider hell
- ✅ Hooks-based
- ✅ TypeScript support
- ✅ Middleware support

Alternatives:
- **Redux**: More powerful, overkill for this app
- **MobX**: More complex learning curve
- **Recoil**: Still in development, experimental
- **Jotai**: Similar to Recoil, lighter

### React Query ✅ (Used for server state)
- Caches server data
- Auto background refetching
- Deduplication
- Pagination support
- Synchronization across tabs

---

## 🎨 UI & Styling

### Tailwind CSS ✅ (Used)
```html
<button class="px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800">
  Click me
</button>
```

Why?
- ✅ Minimal bundle size (purged)
- ✅ Utility-first approach
- ✅ No style conflicts
- ✅ Production-ready

### shadcn/ui (Installed)
- Pre-built React components
- Built on Radix UI primitives
- Fully customizable
- Copy-pasta components (no node_modules)

### CSS-in-JS? ❌ (Avoided)
- Styled Components: Runtime overhead
- Emotion: Good but unnecessary with Tailwind
- We chose: Tailwind CSS (build-time CSS)

---

## 📦 Frontend Build & Deploy

### Next.js 15 (App Router) ✅
- Built-in code splitting
- Image optimization
- Font optimization
- Automatic static optimization

### OpenNext (for Cloudflare Pages)
```bash
npm install -g open-next
open-next build
```
- Builds Next.js for non-Vercel platforms
- Outputs Express-compatible lambda function
- Works with Cloudflare Pages, Lambda, etc.

---

## 🔍 Code Quality

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

### Prettier Configuration

```javascript
// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

---

## 📈 Recommendations Summary

| Category | Choice | Reason |
|----------|--------|--------|
| **Language** | JavaScript | Universal, startup-friendly |
| **Frontend Framework** | Next.js 15 | Built-in optimizations, App Router |
| **Backend Framework** | Express.js | Simple, flexible, lightweight |
| **Database** | PostgreSQL | ACID, JSON, ecosystem |
| **ORM** | Prisma | Type-safe, modern, auto-migrations |
| **File Storage** | Cloudflare R2 | Cheap egress, unlimited bandwidth |
| **Authentication** | JWT + Twilio | Stateless, scalable, phone-native |
| **State (Frontend)** | Zustand + React Query | Minimal, powerful combo |
| **Styling** | Tailwind CSS | Utility-first, production-ready |
| **HTTP Client** | Axios | Universal, interceptors-friendly |
| **Validation** | Yup + express-validator | Fluent API, comprehensive |
| **Logging** | Winston | Structured, multi-transport |
| **Rate Limiting** | express-rate-limit | Built-in Redis support |
| **CDN** | Cloudflare Pages | Free tier, global distribution |
| **Hosting** | Railway | Pnpm support, managed PostgreSQL |

---

## 📺 Optional Advanced Libraries

Not included in MVP, but consider for scale:

### Search & Analytics
- **Elasticsearch**: Full-text search (replaces LIKE queries)
- **Analytics**: Mixpanel, Amplitude, or self-hosted Plausible

### Caching
- **Redis**: Session storage, OTP cache, rate limiting
- **Memcached**: Simpler alternative to Redis

### Job Queues
- **Bull**: Background job processing
- **RabbitMQ**: Advanced job system
- Use cases: Email, notifications, data processing

### Real-time
- **Socket.io**: WebSockets for live notifications
- **Pusher**: Managed WebSocket solution

### Monitoring & APM
- **Datadog**: All-in-one platform (costly)
- **NewRelic**: Good APM, expensive
- **Sentry**: Error tracking (free tier available)
- **Grafana**: Open-source monitoring

---

## 🧪 Testing (Future)

```bash
# Unit Testing
npm install --save-dev jest ts-jest

# API Testing
npm install --save-dev supertest

# E2E Testing
npm install --save-dev cypress

# Coverage
npm install --save-dev nyc
```

---

This setup provides a **scalable, maintainable, and cost-effective** foundation for Rent Lessly! 🚀
