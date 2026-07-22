# ⚡ Quick Email Setup (5 minutes)

## What You Need
- Gmail account
- 2-Factor Authentication enabled

## Step-by-Step

### 1. Enable 2FA (if not already enabled)
1. Go to: https://myaccount.google.com/security
2. Look for **"2-Step Verification"**
3. Click it and follow the steps

### 2. Generate App Password
1. Go back to: https://myaccount.google.com/apppasswords
2. Select: **Mail** and **Windows PC** (or your device)
3. Click **Generate**
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 3. Update .env
Open `.env` file and replace:
```
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_TO=your-actual-email@gmail.com
EMAIL_FROM=Rosalia Arts <your-actual-email@gmail.com>
```

**Important**: Remove any spaces from the app password

### 4. Restart Backend
```bash
npm run dev:backend
```

You should see:
```
📧 Email notifications: ✅ ENABLED
```

### 5. Test It
1. Open http://localhost:3000
2. Go to "Commissions" tab
3. Fill out and submit the form
4. Check your inbox (1-2 minutes)

Done! 🎉

## Troubleshooting

**Email not arriving?**
- Check spam folder
- Verify EMAIL_PASSWORD is correct (16 chars, no spaces)
- Check backend logs for errors

**Still not working?**
→ See [EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md) for detailed troubleshooting

## Questions?
→ See the full guide: [EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md)
