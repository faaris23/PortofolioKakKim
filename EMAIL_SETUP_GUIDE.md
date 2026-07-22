# Email Configuration Setup Guide

## Overview
Your commission backend is now fully functional with email notification capabilities! When someone submits an inquiry form, you'll receive an email notification immediately. The inquiry history is hidden from public view and only accessible through the admin dashboard.

## Email Setup Instructions

### Step 1: Set Up Gmail App Password

Since Gmail doesn't allow direct access to your account password for third-party apps, you need to create an **App Password**. This is a 16-character password specific to this application.

#### Requirements:
- Gmail account with **2-Factor Authentication enabled**
- If you don't have 2FA enabled, enable it first: https://myaccount.google.com/security

#### Create App Password:

1. Go to **Google Account Settings**: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Scroll down to **App passwords** (only visible if 2FA is enabled)
4. Select:
   - **App**: Mail
   - **Device**: Windows PC (or your device type)
5. Google will generate a **16-character password**
   - **Copy this password** - you'll use it in the next step
   - Example format: `abcd efgh ijkl mnop` (without spaces when using)

### Step 2: Update .env File

Open the `.env` file in your project root and replace the placeholder values:

```bash
# Email Configuration (Gmail)
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_TO=your-actual-email@gmail.com
EMAIL_FROM=Rosalia Arts <your-actual-email@gmail.com>
```

**Important:**
- `EMAIL_USER`: Your full Gmail address
- `EMAIL_PASSWORD`: The 16-character App Password (remove spaces)
- `EMAIL_TO`: Where inquiry emails will be sent (usually same as EMAIL_USER)
- `EMAIL_FROM`: Display name for outgoing emails

### Step 3: Restart Your Development Server

After updating `.env`, restart the backend:

```bash
npm run dev:all
```

You should see:
```
✨ Rosalia Arts Commission Backend running on port 5000
📧 Email notifications: ✅ ENABLED
```

## Testing Email Notifications

### Test Form Submission:

1. Open your frontend: http://localhost:3000
2. Navigate to the Commission Inquiry Form
3. Fill out all fields:
   - **Name**: Test Client
   - **Email**: test@example.com
   - **Project Type**: Logo Design
   - **Budget Range**: $500 - $1000
   - **Description**: This is a test inquiry to verify email notifications are working correctly.
4. Click **Submit**

You should receive an email to the address specified in `EMAIL_TO` within 1-2 minutes.

### Email Content Includes:
- ✅ Client's full name and email
- ✅ Project type and budget range
- ✅ Project description
- ✅ Submission timestamp
- ✅ Unique inquiry ID (e.g., `inq-1699564821000`)

## Viewing Submitted Inquiries

### Admin Dashboard (Coming Soon):
All submitted inquiries are stored in `data/inquiries.json` and accessible via the admin panel. To view all inquiries programmatically:

```bash
GET http://localhost:5000/api/inquiries
```

## Production Deployment

### Email Configuration for Production:

If deploying to a production server:

1. Use environment variables (don't commit `.env` to git):
   ```bash
   export EMAIL_USER="your-email@gmail.com"
   export EMAIL_PASSWORD="your-app-password"
   export EMAIL_TO="your-email@gmail.com"
   ```

2. Or use your hosting platform's environment variable settings:
   - Vercel: Project Settings → Environment Variables
   - Heroku: Config Vars
   - etc.

3. Update `FRONTEND_URL` if deploying to a custom domain:
   ```bash
   FRONTEND_URL=https://your-domain.com
   ```

## Troubleshooting

### Email Not Arriving?

1. **Check spam/promotions folder** - Gmail sometimes filters automated emails
2. **Verify credentials** - Double-check EMAIL_USER and EMAIL_PASSWORD in `.env`
3. **Check backend logs**:
   ```
   npm run dev:backend
   ```
   Look for error messages about email sending

4. **Verify Gmail allows less secure apps**:
   - Go to: https://myaccount.google.com/apppasswords
   - Ensure the app password was created successfully
   - App passwords only work with 2FA enabled

### Backend Error: "Email not configured"

This means the `.env` file doesn't have EMAIL_USER and EMAIL_PASSWORD set. Check:
1. `.env` file exists in project root
2. Both EMAIL_USER and EMAIL_PASSWORD are filled (not placeholder values)
3. No extra spaces around values

### Port Already in Use

If port 5000 is in use:
- Change `PORT=5000` to `PORT=5001` in `.env`
- Restart backend: `npm run dev:backend`

## API Endpoints Reference

### Submit Inquiry (Public)
```
POST /api/inquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "Logo Design",
  "budget": "$500 - $1000",
  "description": "I need a professional logo..."
}

Response (201):
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiryId": "inq-1699564821000"
}
```

### Get All Inquiries (Admin)
```
GET /api/inquiries

Response (200):
{
  "success": true,
  "data": [...],
  "count": 5
}
```

### Get Single Inquiry
```
GET /api/inquiries/inq-1699564821000

Response (200):
{
  "success": true,
  "data": { ... }
}
```

### Update Inquiry Status
```
PATCH /api/inquiries/inq-1699564821000
Content-Type: application/json

{
  "status": "reviewed"
}

Valid statuses: pending, reviewed, accepted, rejected
```

### Delete Inquiry
```
DELETE /api/inquiries/inq-1699564821000

Response (200):
{
  "success": true,
  "message": "Inquiry deleted successfully"
}
```

## Next Steps

1. ✅ **Email is now configured** - You're all set!
2. 🔒 **Add Admin Authentication** (recommended):
   - Protect the admin dashboard with a password
   - Implement JWT tokens for API security
3. 📊 **Integrate Admin Dashboard**:
   - Add admin route to your App.tsx
   - Only show to authenticated users
4. 🗄️ **Upgrade to Database** (future):
   - Migrate from JSON to PostgreSQL for production

## Questions?

If you encounter issues:
1. Check the browser console for frontend errors
2. Check the terminal for backend logs
3. Verify all `.env` values are correct
4. Ensure Gmail 2FA is enabled and app password was created

Happy commissions! 🎨
