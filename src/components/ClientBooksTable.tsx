'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Book } from '@prisma/client';

interface ClientBooksTableProps {
  books: Book[];
  page: number;
  totalPages: number;
  searchQuery?: string;
}

export default function ClientBooksTable({ 
  books, 
  page, 
  totalPages, 
  searchQuery 
}: ClientBooksTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePrevious = () => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page - 1));
      if (searchQuery) {
        params.set('query', searchQuery);
      }
      router.push(`?${params.toString()}`);
    }
  };

  const handleNext = () => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page + 1));
      if (searchQuery) {
        params.set('query', searchQuery);
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <>
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
                  <td className="border border-gray-300 px-4 py-2">R {book.price.toFixed(2)}</td>
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
        </>
      )}
    </div>
  );
}
