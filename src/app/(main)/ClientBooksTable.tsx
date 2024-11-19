'use client';

import { useRouter } from 'next/navigation';
import { Book } from '@prisma/client';

interface ClientBooksTableProps {
  books: Book[];
  page: number;
  totalPages: number;
}

export default function ClientBooksTable({ books, page, totalPages }: ClientBooksTableProps) {
  const router = useRouter();

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      router.push(`?page=${page + 1}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nr.</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Price (ZAR)</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Publish Year</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1 + (page - 1) * 10}</td>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.author}</td>
              <td className="border border-gray-300 px-4 py-2">{book.price}</td>
              <td className="border border-gray-300 px-4 py-2">{book.description}</td>
              <td className="border border-gray-300 px-4 py-2">{book.publishYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
