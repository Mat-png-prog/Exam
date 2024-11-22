'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BookSearch from '@/components/BookSearch';
import BookTable from './BookTable';
import { Prisma, Book } from '@prisma/client';
import ClientPagination from './ClientPagination';
import AddIcon from './components/AddIcon';

export default function BooksPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(() => params ? params.get('search') || '' : '');
  const [page, setPage] = useState(() => params ? Number(params.get('page')) || 1 : 1);
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);

  const fetchBooks = useCallback(async () => {
    const where: Prisma.BookWhereInput = {
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
          { publishYear: { equals: isNaN(parseInt(searchQuery)) ? undefined : parseInt(searchQuery) } },
          { price: { gte: isNaN(parseFloat(searchQuery)) ? undefined : parseFloat(searchQuery), lte: isNaN(parseFloat(searchQuery)) ? undefined : parseFloat(searchQuery) } }
        ]
      })
    };

    const [fetchedBooks, totalBooks] = await Promise.all([
      fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ where, skip: (page - 1) * 10, take: 10, orderBy: { createdAt: 'desc' } })
      }).then((res) => res.json()),
      fetch('/api/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ where })
      }).then((res) => res.json())
    ]);

    setBooks(fetchedBooks);
    setTotal(totalBooks);
  }, [page, searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [page, searchQuery, fetchBooks]);

  // Update URL with search params
  useEffect(() => {
    if (params) {
      const urlParams = new URLSearchParams(params.toString());
      if (searchQuery) {
        urlParams.set('search', searchQuery);
      } else {
        urlParams.delete('search');
      }
      router.replace(`?${urlParams.toString()}`);
    }
  }, [searchQuery, params, router]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Books</h1>
        <Button>
          <Link href="/books/create">
            <AddIcon /> Add Book
          </Link>
        </Button>
      </div>
      <BookSearch setSearchQuery={setSearchQuery} />
      <BookTable books={books} />
      <ClientPagination totalPages={totalPages} currentPage={page} />
    </div>
  );
}
