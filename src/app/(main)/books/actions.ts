//src/app/(main)/books/actions.ts
'use server';

import { BookValues } from '@/lib/validations';
import prisma from '@/lib/prisma';
import { validateRequest } from '../../auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createBook(values: BookValues) {
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');

  const book = await prisma.book.create({
    data: {
      ...values,
      userId: user.id,
    },
  });

  revalidatePath('/books');
  redirect('/books');
}

export async function deleteBook(bookId: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book || book.userId !== user.id) {
    throw new Error('Not found');
  }

  await prisma.book.delete({
    where: { id: bookId },
  });

  revalidatePath('/books');
  redirect('/books');
}
