import { PrismaClient } from '../../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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

    res.status(200).json({
      totalUsers: userCount,
      totalEvents: eventCount,
      totalOrders: orderCount,
      totalLicenses: licenseCount,
      activeLicenses,
      pendingOrders,
      upcomingEvents,
    });
  } catch (error) {
    console.error('Dashboard Stats API Error:', error);
    res.status(500).json({ error: error.message });
  }
}