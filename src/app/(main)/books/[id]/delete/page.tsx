// src/app/(main)/books/[id]/delete/page.tsx
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ClientDeleteBook from './ClientDeleteBook';

async function fetchBook(id: string) {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new Error('Book not found');
  }

  return book;
}

interface DeleteBookPageProps {
  params: {
    id: string;
  };
}

export default async function DeleteBookPage({ params }: DeleteBookPageProps) {
  const book = await fetchBook(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
      <p>Are you sure you want to delete the book titled &apos;{book.title}&apos;?</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientDeleteBook id={params.id} />
      </Suspense>
    </div>
  );
}