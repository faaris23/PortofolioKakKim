# 🚀 Quick Start Guide - Rosalia Arts Commission Backend

## What You Just Got

Your website now has a **professional commission inquiry system** with:

✅ **Backend API** - Handles form submissions and stores inquiries  
✅ **Persistent Storage** - All inquiries saved to `data/inquiries.json`  
✅ **Smart Form** - Frontend form submits to backend with localStorage fallback  
✅ **Admin Dashboard** - Manage all inquiries (optional, ready to integrate)  
✅ **Automatic Fallback** - Works even if backend is temporarily down  

## 🎯 What's Different?

### Before
- Form data only saved in browser's localStorage
- No persistent storage
- Can't view inquiries from other computers
- No real backend

### After
- ✅ Form data saved to backend
- ✅ Persistent storage in `data/inquiries.json`
- ✅ View inquiries from any computer
- ✅ Professional API endpoints
- ✅ Admin dashboard to manage inquiries

## ⚡ Quick Start (5 minutes)

### Step 1: Start the Backend

```bash
npm run dev:all
```

This starts both:
- Frontend at http://localhost:3000
- Backend at http://localhost:5000

### Step 2: Test It

1. Open http://localhost:3000
2. Click "Commissions" tab
3. Fill the form and submit
4. See success message
5. Check the history below

### Step 3: View Data

Check the saved inquiries:

```bash
# Windows
type data\inquiries.json

# Mac/Linux
cat data/inquiries.json
```

## 📁 New Files Created

```
backend/
├── server.ts                  # Express server (handles API)
├── src/components/
│   ├── InquiryForm.tsx       # Updated form (now uses API)
│   └── AdminDashboard.tsx    # NEW: Admin panel
├── data/
│   └── inquiries.json        # Your inquiry database
├── BACKEND_SETUP.md          # Detailed setup docs
├── COMMISSION_BACKEND.md     # Feature documentation
└── .env                       # Configuration
```

## 🔧 Environment Setup

The `.env` file is already created with defaults:

```env
VITE_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

For production, update these values to your deployed URLs.

## 📊 API Endpoints

All endpoints are ready to use:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/inquiries` | Submit new inquiry |
| GET | `/api/inquiries` | Get all inquiries |
| GET | `/api/inquiries/:id` | Get specific inquiry |
| PATCH | `/api/inquiries/:id` | Update inquiry status |
| DELETE | `/api/inquiries/:id` | Delete inquiry |
| GET | `/api/health` | Check backend status |

## 🎨 Using the Admin Dashboard

The admin dashboard is ready but not integrated into the UI yet.

To use it:

1. Import in `src/App.tsx`:
```tsx
import AdminDashboard from './components/AdminDashboard';
```

2. Add a new tab:
```tsx
{activeTab === 'admin' && <AdminDashboard />}
```

3. Add button in Navbar:
```tsx
<button onClick={() => setActiveTab('admin')}>
  Admin
</button>
```

## 💾 Data Management

### View All Inquiries

```bash
npm run dev:backend
# Then in another terminal:
curl http://localhost:5000/api/inquiries
```

### Update Inquiry Status

```bash
curl -X PATCH http://localhost:5000/api/inquiries/inq-XXXXX \
  -H "Content-Type: application/json" \
  -d '{"status": "reviewed"}'
```

### Export Inquiries

```bash
# Windows
copy data\inquiries.json inquiries_backup.json

# Mac/Linux
cp data/inquiries.json inquiries_backup.json
```

## 🌐 Deploy to Production

### Option 1: Railway (Easiest)

1. Sign up at https://railway.app
2. Connect your GitHub repo
3. Railway auto-detects Node.js
4. Set environment variables
5. Deploy with one click

### Option 2: Vercel

1. Sign up at https://vercel.app
2. Connect GitHub
3. Set `VITE_API_URL` env var
4. Deploy

### Option 3: Self-hosted (VPS/Server)

```bash
# Build
npm run build:backend

# Start
npm run start
```

## 🧪 Testing the API

### Test Submission

```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "projectType": "Web Novel Cover Art",
    "budget": "$250 - $500",
    "description": "This is a test inquiry..."
  }'
```

### Test Health Check

```bash
curl http://localhost:5000/api/health
```

## 🐛 Common Issues

### Backend not starting?
```bash
# Check if port 5000 is free
netstat -ano | findstr :5000

# If in use, change PORT in .env
PORT=5001
```

### Frontend can't connect?
1. Make sure backend is running: `npm run dev:backend`
2. Check `VITE_API_URL` in `.env`
3. Check browser console for errors

### Data not saving?
1. Make sure `data/` directory exists
2. Check write permissions on `data/inquiries.json`

## 📚 Documentation

For detailed information, see:

- **`BACKEND_SETUP.md`** - Complete setup guide
- **`COMMISSION_BACKEND.md`** - Feature overview
- **`server.ts`** - API implementation
- **`InquiryForm.tsx`** - Frontend integration

## ✨ What's Next?

### Immediate (Development)
1. ✅ Backend is running
2. ✅ Forms submit to database
3. ✅ Data persists

### Soon (Enhancement)
1. Add email notifications when inquiries arrive
2. Add admin login (protect `/api/inquiries` endpoint)
3. Add inquiry response templates

### Later (Scale)
1. Migrate to PostgreSQL database
2. Add automated backups
3. Add analytics dashboard
4. Add payment integration

## 🎓 Learn More

### Backend
- File: `server.ts`
- Language: TypeScript/Express
- Database: JSON files (easily upgradeable to SQL)

### Frontend Integration
- File: `src/components/InquiryForm.tsx`
- Handles API calls and fallback to localStorage
- Shows loading states and error messages

### Admin Dashboard
- File: `src/components/AdminDashboard.tsx`
- View all inquiries
- Update status
- Delete inquiries
- Ready to integrate

## 📞 Commands Reference

```bash
# Development
npm run dev                    # Frontend only
npm run dev:backend          # Backend only  
npm run dev:all              # Both frontend + backend

# Production
npm run build                 # Build both
npm run build:backend        # Build backend only
npm run start                # Run production server

# Utilities
npm run lint                 # Check TypeScript errors
npm run clean                # Remove build files
npm install                  # Install dependencies

# Manual API testing
curl http://localhost:5000/api/health
```

## 🎉 You're All Set!

Your commission inquiry system is ready to:
- ✅ Accept inquiries from users
- ✅ Store them permanently
- ✅ Manage them through admin panel
- ✅ Scale to production

**Start the development server:**

```bash
npm run dev:all
```

Then visit http://localhost:3000 and try submitting a commission inquiry!

---

Need help? Check `BACKEND_SETUP.md` for detailed documentation.
