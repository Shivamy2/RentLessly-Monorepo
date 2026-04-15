# Quick Developer Reference Guide

## 🚀 Getting Started (5 minutes)

```bash
# 1. Install pnpm globally
npm install -g pnpm@latest

# 2. Clone and setup
git clone <repo>
cd Rent-Lessly-Monorepo
pnpm install

# 3. Environment setup
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
# → Fill in actual values

# 4. Database setup
pnpm run prisma:generate
pnpm run prisma:migrate

# 5. Start dev servers
pnpm run dev
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/health

---

## 📁 Where to add new features?

### New Backend Module (e.g., Notification)

```
apps/api/src/modules/notification/
├── notification.routes.js       # Express routes
├── notification.controller.js    # HTTP handlers
├── notification.service.js       # Business logic
├── notification.model.js         # Schema reference
├── notification.helpers.js       # Utilities
└── notification.validation.js    # Input validation
```

1. Create module folder
2. Add routes → controller → service
3. Add Prisma schema (prisma/schema.prisma)
4. Run: `pnpm run prisma:migrate`
5. Mount routes in `src/index.js`:
   ```javascript
   import notificationRoutes from './modules/notification/notification.routes.js';
   app.use('/api/notifications', notificationRoutes);
   ```

### New Frontend Page/Component

```
apps/web/src/
├── app/search/page.jsx          # New page
├── components/Filter.jsx         # New component
├── hooks/useSearch.js            # New hook
└── stores/searchStore.js         # New store
```

1. Create file
2. Use existing hooks/stores or create new
3. Import from `@rent-lessly/*` packages
4. Hot reload automatically

### Add Shared Type

```javascript
// packages/types/src/index.js
/**
 * @typedef {Object} MyType
 * @property {string} field1
 */

export const types = {};
```

Frontend/Backend can import:
```javascript
import { MyType } from '@rent-lessly/types';
```

---

## 🔧 Common Commands

| Command | What it does |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm run dev` | Start all dev servers |
| `pnpm run build` | Build all packages |
| `pnpm run lint` | ESLint all code |
| `turbo run <task> --filter=@rent-lessly/api` | Run task in specific package |
| `pnpm clean` | Remove node_modules and builds |
| `pnpm run prisma:generate` | Generate Prisma client |
| `pnpm run prisma:migrate` | Run database migrations |
| `pnpm run prisma:studio` | Open Prisma Studio UI |

---

## 🗂️ File Organization Best Practices

### Backend Module Structure
```
✅ DO:
- Keep business logic in service.js
- Keep HTTP handling in controller.js
- Use helpers.js for reusable functions
- Validate input in middleware/validation.js

❌ DON'T:
- Mix business logic with HTTP handling
- Write utilities directly in controller
- Skip input validation
- Use global variables
```

### Frontend Component Structure
```
✅ DO:
- Use client-side features only with 'use client'
- Separate logic (hooks) from presentation
- Use Zustand for local state
- Use React Query for server state

❌ DON'T:
- Use server-only features in client components
- Duplicate state management
- Make API calls in components
- Use localStorage without safety checks
```

---

## 🔌 API Integration Checklist

When creating a new API endpoint:

- [ ] Add validation rules in `.validation.js`
- [ ] Use try-catch in controller
- [ ] Throw `AppError` for errors
- [ ] Return consistent JSON format
- [ ] Add authentication check if needed (authMiddleware)
- [ ] Document with JSDoc comments
- [ ] Test with Postman/curl
- [ ] Add to `packages/types` if frontend needs it

---

## 🐛 Debugging Tips

### Backend Debugging

```bash
# 1. Check logs
pnpm run dev  # Watch for console output

# 2. Use Prisma Studio
pnpm run prisma:studio  # View/edit database

# 3. Test API locally
curl -X GET http://localhost:5000/api/properties

# 4. Add debug logs
import logger from './lib/logger.js';
logger.debug({ message: 'Debug info', data });

# 5. Database connection issue?
psql $DATABASE_URL -c "SELECT 1;"
```

### Frontend Debugging

```javascript
// React DevTools
// → Components tab: View component tree
// → Hooks: Inspect state, stores
// → Network tab: Check API calls

// Zustand devtools (if installed)
import middleware from 'zustand/middleware';

// Console logging
import { useAuthStore } from '@/stores/authStore';
const auth = useAuthStore();
console.log(auth);
```

---

## 📊 Database Tips

### Add Index for Performance

```javascript
// prisma/schema.prisma
model Property {
  id       String @id @default(cuid())
  locality String
  bhk      Int
  rent     Int
  
  @@index([locality])  // Add index on frequently searched column
  @@index([bhk])
  @@index([rent])
}
```

Then run:
```bash
pnpm run prisma:migrate
```

### Common Queries

```javascript
// Find one
const property = await prisma.property.findUnique({
  where: { id: propertyId },
  include: { images: true }
});

// Find many with filters
const properties = await prisma.property.findMany({
  where: {
    locality: 'Sector 56',
    rent: { lte: 500000 },
    isActive: true
  },
  take: 20,
  skip: 0
});

// Count
const total = await prisma.property.count({ where: {...} });

// Create
const property = await prisma.property.create({
  data: { title: '...' }
});

// Update
await prisma.property.update({
  where: { id },
  data: { rent: 600000 }
});

// Delete
await prisma.property.delete({ where: { id } });
```

---

## 🚢 Before Deployment Checklist

### Code Quality
- [ ] `pnpm run lint` passes
- [ ] `pnpm run build` completes
- [ ] No console errors/warnings
- [ ] Environment variables set

### Database
- [ ] Migrations complete
- [ ] Backups enabled
- [ ] Connection pooling configured

### Security
- [ ] JWT secrets changed
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] No sensitive data in logs
- [ ] HTTPS enabled

### Performance
- [ ] Database queries optimized
- [ ] Images compressed
- [ ] Frontend bundle size checked
- [ ] Response times < 200ms

### Testing
- [ ] Critical flows tested manually
- [ ] Error cases handled
- [ ] Mobile responsive check

---

## 📋 Module Expansion Guide

Want to add a new feature module? Follow this pattern:

### 1. Create Module Folder
```bash
mkdir -p apps/api/src/modules/myfeature
```

### 2. Add Prisma Model
```javascript
// prisma/schema.prisma
model MyFeature {
  id        String @id @default(cuid())
  userId    String
  data      String
  createdAt DateTime @default(now())
  
  user MyUser @relation(fields: [userId] references: [id])
}
```

### 3. Run Migration
```bash
pnpm run prisma:migrate --name add_myfeature
```

### 4. Create Routes
```javascript
// modules/myfeature/myfeature.routes.js
import express from 'express';
import { myfeatureController } from './myfeature.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, myfeatureController.getAll);
router.post('/', authMiddleware, myfeatureController.create);

export default router;
```

### 5. Create Controller
```javascript
// modules/myfeature/myfeature.controller.js
import { myfeatureService } from './myfeature.service.js';

class MyfeatureController {
  async getAll(req, res, next) {
    try {
      const data = await myfeatureService.getAll(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
  
  async create(req, res, next) {
    try {
      const data = await myfeatureService.create(req.user.id, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

export const myfeatureController = new MyfeatureController();
```

### 6. Create Service
```javascript
// modules/myfeature/myfeature.service.js
import { prisma } from '../../lib/prisma.js';

class MyfeatureService {
  async getAll(userId) {
    return prisma.myFeature.findMany({ where: { userId } });
  }
  
  async create(userId, data) {
    return prisma.myFeature.create({
      data: { userId, ...data }
    });
  }
}

export const myfeatureService = new MyfeatureService();
```

### 7. Mount Routes
```javascript
// src/index.js
import myfeatureRoutes from './modules/myfeature/myfeature.routes.js';
app.use('/api/myfeature', myfeatureRoutes);
```

Done! Endpoint available at `/api/myfeature`

---

## 🎯 Performance Optimization Tips

### Frontend
```javascript
// Use React Query for caching
useQuery(['resources'], fetchResources, {
  staleTime: 5 * 60 * 1000, // Cache 5 minutes
});

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./Heavy'));

// Optimize images
<Image src="/image.jpg" width={300} height={300} />
```

### Backend
```javascript
// Add database indexes
@@index([userId])

// Select only needed fields
const users = await prisma.user.findMany({
  select: { id: true, name: true } // Don't select password!
});

// Pagination
const users = await prisma.user.findMany({
  take: 20,    // 20 items
  skip: (page - 1) * 20  // Pagination
});
```

---

## 💡 Pro Tips

1. **Use TypeScript-like JSDoc** for better DX
   ```javascript
   /**
    * @param {string} id - User ID
    * @returns {Promise<User>}
    */
   async function getUser(id) { ... }
   ```

2. **Prefix private functions with underscore**
   ```javascript
   async function _validateUser(user) { ... }
   ```

3. **Use meaningful error messages**
   ```javascript
   throw new AppError('Property not found in area', 404);
   // Good for debugging and user UX
   ```

4. **Tests always exist before code** (TDD approach)
   - Write test first
   - Watch it fail
   - Write code to pass

5. **Commit frequently and meaningfully**
   ```bash
   git commit -m "feat(property): add price filter to search"
   ```

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `lsof -i :3000; kill -9 <PID>` |
| pnpm install fails | `pnpm install --no-frozen-lockfile` |
| Database connection error | Check `DATABASE_URL`, run `psql $DATABASE_URL` |
| Prisma client missing | `pnpm run prisma:generate` |
| Hot reload not working | Restart dev server |
| Types not recognized | Import from `@rent-lessly/types` |

---

This guide should get you productive! 🚀 For more details, see README.md, ARCHITECTURE.md, and LIBRARY.md.
