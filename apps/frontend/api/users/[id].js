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
  const userId = parseInt(id);

  try {
    switch (req.method) {
      case 'GET':
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            licenses: true,
            orders: true,
          },
        });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
        break;

      case 'PUT':
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: req.body,
        });
        res.status(200).json(updatedUser);
        break;

      case 'DELETE':
        await prisma.user.delete({
          where: { id: userId },
        });
        res.status(200).json({ message: 'User deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('User API Error:', error);
    res.status(500).json({ error: error.message });
  }
}