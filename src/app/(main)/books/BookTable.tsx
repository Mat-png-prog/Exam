//src/app/(main)/books/BookSearch.tsx
import { Book } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import UpdateIcon from './components/UpdateIcon';
import { Button } from '@/components/ui/button';
import TrashBinIcon from './components/TrashBinIcon';

 export interface BookTableProps {
  books: Book[];
}

export default function BookTable({ books }: BookTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nr.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, index) => (
          <TableRow key={book.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.description}</TableCell>
            <TableCell>{book.price} ZAR</TableCell>
            <TableCell className='p-10'>
              <Link href={`/books/${book.id}/update`} className="font-medium text-blue-600 hover:bg-yellow-500 m-2">
                <UpdateIcon/>
                Update
              </Link>
              <Link href={`/books/${book.id}/delete`} className="font-medium text-blue-600 hover:bg-red-600 m-2">
                <TrashBinIcon />
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
