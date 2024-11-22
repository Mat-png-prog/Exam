import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, pageSize = 10, query } = req.query;

  const where: Prisma.BookWhereInput = query ? {
    OR: [
      { title: { contains: query as string, mode: 'insensitive' } },
      { author: { contains: query as string, mode: 'insensitive' } },
      { publishYear: { equals: parseInt(query as string) } },
      { price: { gte: parseFloat(query as string), lte: parseFloat(query as string) } }
    ]
  } : {};

  const books = await prisma.book.findMany({
    where,
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    orderBy: { createdAt: 'desc' },
  });

  const totalBooks = await prisma.book.count({ where });

  res.status(200).json({ books, totalBooks });
}
