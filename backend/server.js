import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const prisma = new PrismaClient();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Authentication endpoints
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, province } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        bloodGroup,
        province,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      ok: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        province: user.province,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        province: user.province,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Get current user (protected route)
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        province: user.province,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const volunteerCount = await prisma.volunteer.count();
    
    res.json({
      donors: userCount,
      drives: 85,
      regions: 7,
      volunteers: volunteerCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.json({ donors: 0, drives: 85, regions: 7, volunteers: 0 });
  }
});

app.post('/api/volunteer', async (req, res) => {
  try {
    const { name, email, phone, location } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    await prisma.volunteer.create({
      data: { name, email, phone, location },
    });

    res.json({ ok: true, message: 'Thank you for volunteering!' });
  } catch (error) {
    console.error('Error creating volunteer:', error);
    res.status(500).json({ error: 'Failed to register volunteer' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message required' });
    }

    await prisma.contact.create({
      data: { name, email, message },
    });

    res.json({ ok: true, message: 'Message received. We will reply soon.' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Blood request endpoints
app.post('/api/blood-requests', async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      unitsNeeded,
      hospital,
      province,
      city,
      contactName,
      contactPhone,
      contactEmail,
      urgency,
      additionalInfo,
    } = req.body;

    // Validation
    if (!patientName || !bloodGroup || !unitsNeeded || !hospital || !contactPhone) {
      return res.status(400).json({
        error: 'Patient name, blood group, units needed, hospital, and contact phone are required',
      });
    }

    // Get user ID if authenticated
    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // Token invalid, continue without user ID
      }
    }

    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        patientName,
        bloodGroup,
        unitsNeeded: parseInt(unitsNeeded),
        hospital,
        province,
        city,
        contactName,
        contactPhone,
        contactEmail,
        urgency: urgency || 'Normal',
        additionalInfo,
        userId,
      },
    });

    res.status(201).json({
      ok: true,
      message: 'Blood request submitted successfully',
      request: bloodRequest,
    });
  } catch (error) {
    console.error('Error creating blood request:', error);
    res.status(500).json({ error: 'Failed to submit blood request' });
  }
});

// Get all blood requests (with optional filters)
app.get('/api/blood-requests', async (req, res) => {
  try {
    const { bloodGroup, province, status, urgency } = req.query;
    
    const where = {};
    if (bloodGroup) where.bloodGroup = bloodGroup;
    if (province) where.province = province;
    if (status) where.status = status;
    if (urgency) where.urgency = urgency;

    const requests = await prisma.bloodRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json({ ok: true, requests });
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    res.status(500).json({ error: 'Failed to fetch blood requests' });
  }
});

// Get blood request by ID
app.get('/api/blood-requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await prisma.bloodRequest.findUnique({
      where: { id: parseInt(id) },
    });

    if (!request) {
      return res.status(404).json({ error: 'Blood request not found' });
    }

    res.json({ ok: true, request });
  } catch (error) {
    console.error('Error fetching blood request:', error);
    res.status(500).json({ error: 'Failed to fetch blood request' });
  }
});

// Update blood request status (protected route)
app.patch('/api/blood-requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const request = await prisma.bloodRequest.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json({ ok: true, message: 'Status updated', request });
  } catch (error) {
    console.error('Error updating blood request:', error);
    res.status(500).json({ error: 'Failed to update blood request' });
  }
});

// Search for donors
app.get('/api/donors/search', async (req, res) => {
  try {
    const { bloodGroup, province } = req.query;

    if (!bloodGroup) {
      return res.status(400).json({ error: 'Blood group is required' });
    }

    const where = { bloodGroup };
    if (province) where.province = province;

    const donors = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        bloodGroup: true,
        province: true,
        phone: true,
        email: true,
      },
      take: 50,
    });

    res.json({ ok: true, donors });
  } catch (error) {
    console.error('Error searching donors:', error);
    res.status(500).json({ error: 'Failed to search donors' });
  }
});

// Update user profile (protected route)
app.put('/api/me', authenticateToken, async (req, res) => {
  try {
    const { name, phone, bloodGroup, province } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (province !== undefined) updateData.province = province;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    res.json({
      ok: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        province: user.province,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's blood requests (protected route)
app.get('/api/me/blood-requests', authenticateToken, async (req, res) => {
  try {
    const requests = await prisma.bloodRequest.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ ok: true, requests });
  } catch (error) {
    console.error('Error fetching user blood requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Database: SQLite with Prisma ORM`);
});
