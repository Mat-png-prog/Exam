import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userCount = await prisma.user.count();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Failed to fetch user count:', error);
    res.status(500).json({ error: 'Failed to fetch user count' });
  } finally {
    await prisma.$disconnect();
  }
}
