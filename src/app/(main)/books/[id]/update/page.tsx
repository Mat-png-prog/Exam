//src/app/(main)/books/[id]/update/page.tsx
import prisma from '@/lib/prisma';
import UpdateBookForm from './UpdateBookForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Update-Book",
};

async function fetchBook(id: string) {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new Error('Book not found');
  }

  return book;
}

export default async function UpdateBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await fetchBook(id);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      <UpdateBookForm book={book} />
    </div>
  );
}
