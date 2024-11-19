import { PrismaClient, Book, Prisma } from '@prisma/client';
import BookSearch from '@/components/BookSearch';
import ClientBooksTable from './ClientBooksTable';

const prisma = new PrismaClient();

async function fetchBooks(
  page: number, 
  pageSize: number, 
  searchQuery?: string
): Promise<{ books: Book[], totalBooks: number }> {
  const where: Prisma.BookWhereInput = searchQuery ? {
    OR: [
      { title: { contains: searchQuery, mode: 'insensitive' as Prisma.QueryMode } },
      { author: { contains: searchQuery, mode: 'insensitive' as Prisma.QueryMode } },
     /*  { isbn: { contains: searchQuery, mode: 'insensitive' as Prisma.QueryMode } }, */
    ],
  } : {};

  const books = await prisma.book.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  const totalBooks = await prisma.book.count({ where });
  return { books, totalBooks };
}

interface BooksPageProps {
  searchParams: { 
    page?: string;
    query?: string;
  };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const searchQuery = searchParams.query;
  
  const { books, totalBooks } = await fetchBooks(page, pageSize, searchQuery);
  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <div className="space-y-4">
      <BookSearch />
      <ClientBooksTable 
        books={books} 
        page={page} 
        totalPages={totalPages} 
      />
    </div>
  );
}