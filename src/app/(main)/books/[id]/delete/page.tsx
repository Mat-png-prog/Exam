// src/app/(main)/books/[id]/delete/page.tsx
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ClientDeleteBook from './ClientDeleteBook';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';

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
      <Table className="w-full mb-4">
        <TableHead className="text-red-700 text-2xl font-bold mb-4">Are you sure you want to delete the following book?</TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{book.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>{book.author}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{book.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>{book.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Publish Year</TableCell>
            <TableCell>{book.publishYear}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientDeleteBook id={params.id} />
      </Suspense>
    </div>
  );
}
