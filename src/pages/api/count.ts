import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { where } = req.body;

  try {
    const totalBooks = await prisma.book.count({
      where,
    });

    res.status(200).json(totalBooks);
  } catch (error) {
    console.error('Error counting books:', error);
    res.status(500).json({ error: 'Failed to count books' });
  }
}
