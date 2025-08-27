import express from 'express';
import cors from 'cors';
import { PrismaClient } from './src/generated/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        licenses: true,
        orders: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        licenses: true,
        orders: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: {
          include: {
            user: true,
          },
        },
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        registrations: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: req.body,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await prisma.event.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        shipments: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: true,
        shipments: true,
      },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: req.body,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Licenses
app.get('/api/licenses', async (req, res) => {
  try {
    const licenses = await prisma.license.findMany({
      include: {
        user: true,
      },
    });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/licenses/:id', async (req, res) => {
  try {
    const license = await prisma.license.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: true,
      },
    });
    if (!license) return res.status(404).json({ error: 'License not found' });
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/licenses', async (req, res) => {
  try {
    const license = await prisma.license.create({
      data: req.body,
    });
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/licenses/:id', async (req, res) => {
  try {
    const license = await prisma.license.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/licenses/:id', async (req, res) => {
  try {
    await prisma.license.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'License deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [userCount, eventCount, orderCount, licenseCount] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.order.count(),
      prisma.license.count(),
    ]);

    const activeLicenses = await prisma.license.count({
      where: { status: 'active' },
    });

    const pendingOrders = await prisma.order.count({
      where: { status: 'pending' },
    });

    const upcomingEvents = await prisma.event.count({
      where: {
        date: {
          gte: new Date(),
        },
      },
    });

    res.json({
      totalUsers: userCount,
      totalEvents: eventCount,
      totalOrders: orderCount,
      totalLicenses: licenseCount,
      activeLicenses,
      pendingOrders,
      upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Audit logs
app.get('/api/audit-logs', async (req, res) => {
  try {
    // For now, return empty array since we don't have audit log model yet
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/audit-logs', async (req, res) => {
  try {
    // For now, just log to console since we don't have audit log model yet
    console.log('Audit log:', req.body);
    res.json({ message: 'Audit log recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});