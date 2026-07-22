# Rosalia Arts Commission Backend Setup Guide

This document explains how to set up and run the backend server for the commission inquiry form.

## Overview

The backend is a Node.js/Express server that:
- ✅ Handles commission inquiry submissions
- ✅ Stores inquiries persistently in JSON files
- ✅ Provides API endpoints for managing inquiries
- ✅ Supports CORS for frontend integration
- ✅ Falls back to localStorage if backend is unavailable

## Prerequisites

- Node.js (v16+)
- npm (v7+)

## Setup Instructions

### 1. Install Dependencies

Dependencies are already included in `package.json`. If you haven't run this yet:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Backend Configuration
VITE_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional - for automated notifications)
EMAIL_API_KEY=your_email_service_api_key_here
EMAIL_FROM=noreply@rosalia-arts.com
EMAIL_TO=admin@rosalia-arts.com
```

**Note:** The `VITE_API_URL` variable is used by the frontend to know where the backend is running.

### 3. Running the Backend

#### Development Mode (with hot reload)

```bash
npm run dev:backend
```

The server will start on `http://localhost:5000` and watch for file changes.

#### Run Frontend and Backend Together

```bash
npm run dev:all
```

This will start both the React frontend (port 3000) and the backend (port 5000) concurrently.

#### Production Build

```bash
npm run build:backend
npm run start
```

## Project Structure

```
rosalia-arts/
├── server.ts                    # Main backend server
├── data/
│   └── inquiries.json          # Persistent inquiry storage
├── src/
│   └── components/
│       └── InquiryForm.tsx      # Updated frontend form
├── package.json
├── .env.example
└── BACKEND_SETUP.md
```

## API Endpoints

### 1. Submit Inquiry
**POST** `/api/inquiries`

Submit a new commission inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "Web Novel Cover Art",
  "budget": "$250 - $500",
  "description": "I need a fantasy book cover with a magical character..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiryId": "inq-1234567890"
}
```

### 2. Get All Inquiries
**GET** `/api/inquiries`

Retrieve all commission inquiries (admin endpoint).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "inq-1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "projectType": "Web Novel Cover Art",
      "budget": "$250 - $500",
      "description": "...",
      "submittedAt": "2026-07-22T12:34:56.000Z",
      "status": "pending"
    }
  ],
  "count": 1
}
```

### 3. Get Specific Inquiry
**GET** `/api/inquiries/:id`

Retrieve a specific inquiry by ID.

**Response:**
```json
{
  "success": true,
  "data": { /* inquiry object */ }
}
```

### 4. Update Inquiry Status
**PATCH** `/api/inquiries/:id`

Update the status of an inquiry (admin endpoint).

**Request Body:**
```json
{
  "status": "reviewed" // or "accepted", "rejected"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry updated successfully",
  "data": { /* updated inquiry */ }
}
```

### 5. Delete Inquiry
**DELETE** `/api/inquiries/:id`

Delete an inquiry (admin endpoint).

**Response:**
```json
{
  "success": true,
  "message": "Inquiry deleted successfully"
}
```

### 6. Health Check
**GET** `/api/health`

Check if the backend is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-22T12:34:56.000Z"
}
```

## Data Storage

Inquiries are stored in `data/inquiries.json` with the following structure:

```json
[
  {
    "id": "inq-1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "Web Novel Cover Art",
    "budget": "$250 - $500",
    "description": "Detailed project description...",
    "submittedAt": "2026-07-22T12:34:56.000Z",
    "status": "pending"
  }
]
```

**Status Values:**
- `pending`: New inquiry, not yet reviewed
- `reviewed`: Artist has reviewed the inquiry
- `accepted`: Commission slot accepted
- `rejected`: Commission slot not available

## Frontend Integration

The frontend (`InquiryForm.tsx`) automatically:
1. Tries to connect to the backend at `VITE_API_URL`
2. Falls back to localStorage if backend is unavailable
3. Shows loading states during submission
4. Displays error messages if submission fails
5. Syncs data between backend and localStorage

### Frontend Configuration

Set the `VITE_API_URL` environment variable:

```bash
VITE_API_URL=http://localhost:5000  # Development
VITE_API_URL=https://api.rosalia-arts.com  # Production
```

## Deployment

### Local Deployment

For local development with both frontend and backend:

```bash
npm run dev:all
```

### Production Deployment

1. **Build the project:**
   ```bash
   npm run build
   npm run build:backend
   ```

2. **Deploy options:**

   - **Vercel** (Frontend + Serverless Backend)
   - **Railway** (Full-stack)
   - **Render** (Full-stack)
   - **Heroku** (Backend only)

3. **Environment variables on hosting platform:**
   - Set `VITE_API_URL` to your production backend URL
   - Set `PORT` to the hosting provider's port
   - Set `NODE_ENV=production`

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY server.ts tsconfig.json ./
RUN npm run build:backend

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t rosalia-arts-backend .
docker run -p 5000:5000 rosalia-arts-backend
```

## Troubleshooting

### Backend not connecting

1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Check CORS configuration:**
   - Ensure `FRONTEND_URL` matches your frontend URL
   - Check browser console for CORS errors

3. **Check environment variables:**
   ```bash
   echo $VITE_API_URL
   echo $PORT
   ```

### Data not persisting

1. **Check file permissions:**
   ```bash
   ls -la data/inquiries.json
   ```

2. **Ensure `data/` directory exists:**
   ```bash
   mkdir -p data
   ```

3. **Check if file is writable:**
   ```bash
   touch data/inquiries.json
   ```

### Email notifications not working

1. Configure `EMAIL_API_KEY` in `.env`
2. Implement email service in `sendEmailNotification()` function
3. See "Email Setup" section below

## Email Setup (Optional)

To enable email notifications when inquiries are submitted:

### Using SendGrid

1. Sign up at https://sendgrid.com
2. Get your API key
3. Update `.env`:
   ```
   EMAIL_API_KEY=SG.xxxxxxxxxxxx
   EMAIL_SERVICE=sendgrid
   ```

### Using Nodemailer (Gmail, etc.)

1. Update `server.ts` to use Nodemailer
2. Install: `npm install nodemailer`
3. Configure email credentials in `.env`

## Backup and Data Management

### Backup Inquiries

```bash
cp data/inquiries.json data/inquiries.backup.json
```

### Migrate Old Data

If you have old inquiries from localStorage:

1. Export from browser console:
   ```javascript
   localStorage.getItem('aurelia_inquiries')
   ```

2. Convert to new format and add to `data/inquiries.json`

## Security Considerations

⚠️ **For Production:**

1. **Add Authentication:** Protect admin endpoints with JWT or similar
2. **Validate Input:** The backend already validates inputs, but consider additional validation
3. **Rate Limiting:** Add rate limiting to prevent spam
4. **HTTPS:** Always use HTTPS in production
5. **Environment Variables:** Never commit `.env` file
6. **Data Encryption:** Consider encrypting sensitive data at rest

### Example: Add Basic Authentication

```typescript
const AUTH_TOKEN = process.env.ADMIN_TOKEN;

app.use('/api/inquiries', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the API documentation
3. Check backend logs: `npm run dev:backend`
4. Check frontend browser console for errors

## License

This backend is part of Rosalia Arts portfolio. See main LICENSE file.
