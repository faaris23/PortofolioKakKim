<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# 🎨 Rosalia Arts - Commission Portfolio

A beautiful portfolio website with a professional commission inquiry system.

## ✨ Features

- 🖼️ Stunning artwork gallery showcase
- 📝 Commission inquiry form with backend
- 💾 Persistent inquiry storage
- 📊 Admin dashboard for inquiry management
- 🔄 Automatic fallback to localStorage
- 📱 Fully responsive design

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js v16+
- npm v7+

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Run everything:**
   ```bash
   npm run dev:all
   ```

4. **Open in browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

5. **Test the commission form:**
   - Click "Commissions" tab
   - Fill out and submit the form
   - See success message and inquiry history

## 📚 Documentation

### Getting Started
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed backend documentation
- **[COMMISSION_BACKEND.md](./COMMISSION_BACKEND.md)** - Feature overview
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
- **[EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md)** - Email notifications setup

## 🎯 Backend Features

### API Endpoints
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries
- `GET /api/inquiries/:id` - Get specific inquiry
- `PATCH /api/inquiries/:id` - Update status
- `DELETE /api/inquiries/:id` - Delete inquiry
- `GET /api/health` - Health check

### Data Storage
- Persistent JSON storage in `data/inquiries.json`
- Automatic backup via localStorage fallback
- Production-ready database

### Admin Dashboard
- View all commission inquiries
- Filter by status (pending, reviewed, accepted, rejected)
- Update inquiry status
- Delete inquiries
- View full inquiry details
- Send direct emails to clients

## 🛠️ Available Commands

```bash
# Development
npm run dev                    # Frontend only (port 3000)
npm run dev:backend           # Backend only (port 5000)
npm run dev:all               # Frontend + Backend

# Production
npm run build                 # Build frontend & backend
npm run build:backend        # Build backend only
npm run start                # Run production server

# Utilities
npm run lint                 # Check TypeScript
npm run clean                # Remove build files
```

## 📁 Project Structure

```
rosalia-arts/
├── src/
│   ├── components/
│   │   ├── InquiryForm.tsx         # Commission form (with API)
│   │   ├── AdminDashboard.tsx      # Admin panel (new!)
│   │   ├── ArtworkGrid.tsx
│   │   ├── SeriesShowcase.tsx
│   │   └── ...other components
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server.ts                 # Express backend API
├── data/
│   └── inquiries.json       # Inquiry database
├── QUICK_START.md
├── BACKEND_SETUP.md
├── COMMISSION_BACKEND.md
└── package.json
```

## 🔧 Environment Variables

Create a `.env` file (based on `.env.example`):

```env
# Backend
VITE_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail with App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=Rosalia Arts <your-email@gmail.com>
```

**See [EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md) for detailed Gmail configuration instructions.**

## 🌐 Deployment

### Option 1: Railway (Recommended)
1. Sign up at https://railway.app
2. Connect GitHub repo
3. Railway auto-detects Node.js
4. Set environment variables
5. Deploy

### Option 2: Vercel
1. Sign up at https://vercel.app
2. Connect GitHub repo
3. Set `VITE_API_URL` to your backend URL
4. Deploy

### Option 3: Docker
```bash
docker build -t rosalia-arts-backend .
docker run -p 5000:5000 rosalia-arts-backend
```

## 📊 How It Works

1. User fills out commission form
2. Frontend validates and submits to backend
3. Backend saves to `data/inquiries.json`
4. Form shows success message
5. Inquiry appears in history
6. Admin can view and manage inquiries

If backend is unavailable, data falls back to localStorage.

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Change PORT in .env if needed
PORT=5001
```

### Frontend can't connect to backend
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check `VITE_API_URL` in `.env`
3. Check browser console for CORS errors

### Data not saving
1. Ensure `data/` directory exists
2. Check file permissions on `data/inquiries.json`

## 📞 Support

- Check documentation in order: QUICK_START.md → BACKEND_SETUP.md → COMMISSION_BACKEND.md
- Review `server.ts` for API implementation
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors

## 📝 License

Part of Rosalia Arts portfolio.

---

**Questions?** See the documentation files or review the source code with comments.

View your app in AI Studio: https://ai.studio/apps/895ef46e-98e0-46bc-b9e2-04ed7297ba80

