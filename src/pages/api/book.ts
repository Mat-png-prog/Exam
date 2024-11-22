import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { where, skip, take, orderBy } = req.body;

  try {
    const books = await prisma.book.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy,
    });

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}
