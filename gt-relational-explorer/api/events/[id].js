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

  const { id } = req.query;
  const eventId = parseInt(id);

  try {
    switch (req.method) {
      case 'GET':
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: {
            registrations: {
              include: {
                user: true,
              },
            },
          },
        });
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
        break;

      case 'PUT':
        const updatedEvent = await prisma.event.update({
          where: { id: eventId },
          data: req.body,
        });
        res.status(200).json(updatedEvent);
        break;

      case 'DELETE':
        await prisma.event.delete({
          where: { id: eventId },
        });
        res.status(200).json({ message: 'Event deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Event API Error:', error);
    res.status(500).json({ error: error.message });
  }
}