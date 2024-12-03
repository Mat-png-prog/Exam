import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ClientDeleteBook from './ClientDeleteBook';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Delete-Book",
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

interface DeleteBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeleteBookPage({ params }: DeleteBookPageProps) {
  const book = await fetchBook((await params).id);

  return (
    <div>
      <h1 className="text-red-700 text-2xl font-bold mb-4">Delete Book</h1>
      <p>Are you sure you want to delete the following book?</p>
      <Table className="w-full mb-4">
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
            <TableCell>Price (Zar)</TableCell>
            <TableCell>R{book.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Publish Year</TableCell>
            <TableCell>{book.publishYear}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientDeleteBook id={(await params).id} />
      </Suspense>
    </div>
  );
}
