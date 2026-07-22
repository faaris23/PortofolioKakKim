import * as express from 'express';
import * as corsLib from 'cors';
import * as dotenvLib from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as nodemailerLib from 'nodemailer';

const cors = corsLib.default;
const dotenv = dotenvLib.default;
const nodemailer = nodemailerLib.default;

type Request = express.Request;
type Response = express.Response;

dotenv.config();

const expressLib = (express as any).default || express;
const app = expressLib();
const PORT = process.env.PORT || 5000;

// Email transporter setup
let transporter: nodemailerLib.Transporter | null = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-domain.com'
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data storage file (simple JSON-based storage)
const DATA_DIR = path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize inquiries file
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

// Helper function to read inquiries
const readInquiries = (): Inquiry[] => {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Helper function to write inquiries
const writeInquiries = (inquiries: Inquiry[]): void => {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
};

// Helper function to send email notification
const sendEmailNotification = async (inquiry: Inquiry): Promise<boolean> => {
  if (!transporter) {
    console.warn('Email not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env');
    return false;
  }

  try {
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1a3a3a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .field-label { font-weight: bold; color: #1a3a3a; }
    .field-value { color: #555; margin-top: 5px; }
    .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎨 New Commission Inquiry from Rosalia Arts</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Client Name:</div>
        <div class="field-value">${inquiry.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Email Address:</div>
        <div class="field-value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
      </div>
      
      <div class="field">
        <div class="field-label">Project Type:</div>
        <div class="field-value">${inquiry.projectType}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Budget Range:</div>
        <div class="field-value">${inquiry.budget}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Project Description:</div>
        <div class="field-value">${inquiry.description}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Submitted At:</div>
        <div class="field-value">${new Date(inquiry.submittedAt).toLocaleString('id-ID')}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Inquiry ID:</div>
        <div class="field-value">${inquiry.id}</div>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated email from Rosalia Arts Commission System.</p>
      <p>You can view and manage all inquiries in your admin dashboard.</p>
    </div>
  </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Rosalia Arts <noreply@rosalia-arts.com>',
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Commission Inquiry: ${inquiry.projectType}`,
      html: emailContent,
    });

    console.log(`✉️ Email sent for inquiry: ${inquiry.id}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * POST /api/inquiries
 * Submit a new commission inquiry
 */
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, email, projectType, budget, description } = req.body;

    // Validation
    if (!name || !email || !projectType || !budget || !description) {
      return res.status(400).json({
        error: 'All fields are required',
        message: 'Please fill in all form fields',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    // Description length check
    if (description.trim().length < 10) {
      return res.status(400).json({
        error: 'Description too short',
        message: 'Please provide at least 10 characters in the description',
      });
    }

    // Create new inquiry
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectType,
      budget,
      description: description.trim(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Save to file
    const inquiries = readInquiries();
    inquiries.unshift(newInquiry);
    writeInquiries(inquiries);

    // Send notification email
    await sendEmailNotification(newInquiry);

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: newInquiry.id,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit inquiry',
    });
  }
});

/**
 * GET /api/inquiries
 * Retrieve all inquiries (protected route in production)
 */
app.get('/api/inquiries', (req: Request, res: Response) => {
  try {
    // In production, add authentication here
    const inquiries = readInquiries();
    return res.status(200).json({
      success: true,
      data: inquiries,
      count: inquiries.length,
    });
  } catch (error) {
    console.error('Error retrieving inquiries:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve inquiries',
    });
  }
});

/**
 * GET /api/inquiries/:id
 * Retrieve a specific inquiry
 */
app.get('/api/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inquiries = readInquiries();
    const inquiry = inquiries.find((inq) => inq.id === id);

    if (!inquiry) {
      return res.status(404).json({
        error: 'Inquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error('Error retrieving inquiry:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve inquiry',
    });
  }
});

/**
 * PATCH /api/inquiries/:id
 * Update inquiry status (for admin)
 */
app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        validStatuses,
      });
    }

    const inquiries = readInquiries();
    const inquiryIndex = inquiries.findIndex((inq) => inq.id === id);

    if (inquiryIndex === -1) {
      return res.status(404).json({
        error: 'Inquiry not found',
      });
    }

    inquiries[inquiryIndex].status = status as any;
    writeInquiries(inquiries);

    return res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiries[inquiryIndex],
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update inquiry',
    });
  }
});

/**
 * DELETE /api/inquiries/:id
 * Delete an inquiry
 */
app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inquiries = readInquiries();
    const filteredInquiries = inquiries.filter((inq) => inq.id !== id);

    if (filteredInquiries.length === inquiries.length) {
      return res.status(404).json({
        error: 'Inquiry not found',
      });
    }

    writeInquiries(filteredInquiries);

    return res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete inquiry',
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailConfigured: !!transporter,
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Rosalia Arts Commission Backend running on port ${PORT}`);
  console.log(`📧 Email notifications: ${transporter ? '✅ ENABLED' : '❌ DISABLED'}`);
  if (!transporter) {
    console.log('   To enable email: Set EMAIL_USER and EMAIL_PASSWORD in .env');
  }
  console.log(`📊 Data storage: ${INQUIRIES_FILE}`);
  console.log(`🚀 API ready for inquiries`);
});

export default app;
