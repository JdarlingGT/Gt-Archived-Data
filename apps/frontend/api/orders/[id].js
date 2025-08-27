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
  const orderId = parseInt(id);

  try {
    switch (req.method) {
      case 'GET':
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            user: true,
            shipments: true,
          },
        });
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
        break;

      case 'PUT':
        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: req.body,
        });
        res.status(200).json(updatedOrder);
        break;

      case 'DELETE':
        await prisma.order.delete({
          where: { id: orderId },
        });
        res.status(200).json({ message: 'Order deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Order API Error:', error);
    res.status(500).json({ error: error.message });
  }
}