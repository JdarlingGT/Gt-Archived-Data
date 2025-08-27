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
  const licenseId = parseInt(id);

  try {
    switch (req.method) {
      case 'GET':
        const license = await prisma.license.findUnique({
          where: { id: licenseId },
          include: {
            user: true,
          },
        });
        if (!license) {
          return res.status(404).json({ error: 'License not found' });
        }
        res.status(200).json(license);
        break;

      case 'PUT':
        const updatedLicense = await prisma.license.update({
          where: { id: licenseId },
          data: req.body,
        });
        res.status(200).json(updatedLicense);
        break;

      case 'DELETE':
        await prisma.license.delete({
          where: { id: licenseId },
        });
        res.status(200).json({ message: 'License deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('License API Error:', error);
    res.status(500).json({ error: error.message });
  }
}