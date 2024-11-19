'use server';
import { BookTableProps } from '../../BookTable';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteBookAction(id: string) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath(`/books`);
  redirect(`/books`);
}
