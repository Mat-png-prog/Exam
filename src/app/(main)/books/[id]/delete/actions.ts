// src/app/(main)/books/[id]/delete/actions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteBookAction(id: string) {
  try {
    await prisma.book.delete({
      where: { id },
    });
    revalidatePath('/books');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete book' };
  }
}