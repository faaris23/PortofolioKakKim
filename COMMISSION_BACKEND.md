# Rosalia Arts Commission Backend

✨ A complete backend system for managing commission inquiries from your website.

## 🎨 What's New

The backend includes:

✅ **Express.js Server** - RESTful API for inquiry management  
✅ **Persistent Storage** - JSON-based data storage with automatic backups  
✅ **Frontend Integration** - Seamless form submission with fallback to localStorage  
✅ **Admin Dashboard** - View and manage all commission inquiries  
✅ **Error Handling** - Graceful fallbacks when backend is unavailable  
✅ **CORS Support** - Secure cross-origin requests from frontend  

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create .env File

```bash
cp .env.example .env
```

Then configure the `.env` file:

```env
VITE_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run Frontend + Backend Together

```bash
npm run dev:all
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### 4. Test It Out

1. Open http://localhost:3000 in your browser
2. Navigate to the Commissions tab
3. Fill out and submit the inquiry form
4. Check the success message
5. View your submission in the history below

## 📂 Project Structure

```
rosalia-arts/
├── server.ts                      # Express backend server
├── src/
│   └── components/
│       ├── InquiryForm.tsx        # Updated form with API integration
│       └── AdminDashboard.tsx     # NEW: Admin panel for inquiries
├── data/
│   └── inquiries.json             # Inquiry data storage
├── package.json
├── .env.example
├── .env
├── BACKEND_SETUP.md               # Detailed setup guide
└── tsconfig.json
```

## 🔌 API Endpoints

### Submit Inquiry
**POST** `/api/inquiries`

```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "Web Novel Cover Art",
    "budget": "$250 - $500",
    "description": "I need a fantasy book cover..."
  }'
```

### Get All Inquiries
**GET** `/api/inquiries`

```bash
curl http://localhost:5000/api/inquiries
```

### Get Specific Inquiry
**GET** `/api/inquiries/:id`

```bash
curl http://localhost:5000/api/inquiries/inq-1234567890
```

### Update Status
**PATCH** `/api/inquiries/:id`

```bash
curl -X PATCH http://localhost:5000/api/inquiries/inq-1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "reviewed"}'
```

### Delete Inquiry
**DELETE** `/api/inquiries/:id`

```bash
curl -X DELETE http://localhost:5000/api/inquiries/inq-1234567890
```

### Health Check
**GET** `/api/health`

```bash
curl http://localhost:5000/api/health
```

## 🎯 Features

### Frontend Form (`InquiryForm.tsx`)

The updated inquiry form now:
- Submits to the backend API
- Shows loading states during submission
- Displays error messages if submission fails
- Falls back to localStorage if backend unavailable
- Loads past inquiries from backend
- Shows inquiry status badges

### Admin Dashboard (`AdminDashboard.tsx`)

View and manage all inquiries with:
- Real-time inquiry list
- Filter by status (pending, reviewed, accepted, rejected)
- Update inquiry status
- Delete inquiries
- View full inquiry details
- Direct email contact button

**To use the admin dashboard:**

1. Add it to your App.tsx navigation
2. Access at `/admin` route
3. View all commission inquiries
4. Update status and respond to clients

Example App.tsx integration:

```tsx
import AdminDashboard from './components/AdminDashboard';

// In your tab navigation:
{activeTab === 'admin' && <AdminDashboard />}
```

## 📊 Data Storage

Inquiries are stored in `data/inquiries.json`:

```json
[
  {
    "id": "inq-1784723290506",
    "name": "Test User",
    "email": "test@example.com",
    "projectType": "Web Novel Cover Art",
    "budget": "$250 - $500",
    "description": "Detailed project description...",
    "submittedAt": "2026-07-22T12:28:10.506Z",
    "status": "pending"
  }
]
```

**Status values:**
- `pending` - New inquiry, not reviewed yet
- `reviewed` - Artist reviewed the inquiry
- `accepted` - Commission slot accepted
- `rejected` - Commission slot unavailable

## 🔄 How It Works

### Form Submission Flow

```
User fills form
    ↓
Clicks "Submit"
    ↓
Frontend sends POST to /api/inquiries
    ↓
Backend validates data
    ↓
Data saved to data/inquiries.json
    ↓
Success response sent
    ↓
Frontend shows success message
    ↓
User sees inquiry in history
```

### Fallback Flow (if backend unavailable)

```
Backend not responding
    ↓
Frontend catches error
    ↓
Data saved to localStorage
    ↓
Success shown anyway
    ↓
Data syncs when backend comes back online
```

## ⚙️ Available Commands

```bash
# Development
npm run dev              # Frontend only (port 3000)
npm run dev:backend     # Backend only (port 5000)
npm run dev:all         # Frontend + Backend together

# Production
npm run build           # Build frontend & backend
npm run build:backend   # Build backend only
npm run start           # Run production server

# Utilities
npm run lint            # Check TypeScript
npm run clean           # Remove dist/build files
```

## 🌐 Deployment

### Vercel (Frontend + Serverless API)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - `VITE_API_URL=https://your-api.vercel.app`
4. Deploy

### Railway (Full-stack)

1. Connect GitHub repo to Railway
2. Set environment variables
3. Railway auto-detects Node.js
4. Auto-deploys on push

### Docker

```bash
docker build -t rosalia-arts-backend .
docker run -p 5000:5000 rosalia-arts-backend
```

## 🛡️ Security Notes

For production deployments:

1. **Add Authentication** - Protect admin endpoints
2. **Use HTTPS** - Always encrypt in transit
3. **Validate Input** - Already implemented, but consider additional checks
4. **Rate Limiting** - Prevent spam submissions
5. **Environment Variables** - Never commit `.env` file
6. **Database Upgrade** - Consider PostgreSQL for scale

## 📧 Email Notifications (Optional)

To send email notifications when inquiries arrive:

1. Sign up for SendGrid, Mailgun, or similar
2. Add API key to `.env`:
   ```env
   EMAIL_API_KEY=your_api_key_here
   EMAIL_FROM=noreply@rosalia-arts.com
   EMAIL_TO=admin@rosalia-arts.com
   ```
3. Implement email sending in `server.ts` (see comments)

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process using port 5000
taskkill /PID <PID> /F

# Try again
npm run dev:backend
```

### Frontend can't connect to backend

1. Check backend is running: `curl http://localhost:5000/api/health`
2. Check `VITE_API_URL` in `.env`
3. Check browser console for errors
4. Check CORS settings in `server.ts`

### Data not saving

1. Check `data/` directory exists
2. Check file permissions: `ls -la data/inquiries.json`
3. Check disk space available
4. Restart backend

### Port already in use

Change PORT in `.env`:
```env
PORT=5001
```

Then update `VITE_API_URL` accordingly.

## 📚 Additional Resources

- See `BACKEND_SETUP.md` for detailed documentation
- Check `server.ts` source code for API implementation
- See `InquiryForm.tsx` for frontend integration example
- Review `AdminDashboard.tsx` for admin panel implementation

## 🎓 Next Steps

1. ✅ Backend is running locally
2. ✅ Forms submit to database
3. ✅ Admin dashboard available
4. Next: **Deploy to production** (Railway, Vercel, etc.)
5. Next: **Add email notifications** (SendGrid, Mailgun)
6. Next: **Upgrade to PostgreSQL** (for scale and backup)
7. Next: **Add authentication** (admin login system)

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review `BACKEND_SETUP.md`
3. Check backend logs: `npm run dev:backend`
4. Check browser console: Press F12 → Console
5. Check network requests: Press F12 → Network

## 📄 License

Part of Rosalia Arts portfolio. See LICENSE file.

---

**Made with ✨ for easy commission management**
