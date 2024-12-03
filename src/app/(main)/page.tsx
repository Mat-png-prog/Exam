import { PrismaClient, Book, Prisma } from '@prisma/client';
import BookSearch from '@/components/ClientSearch';
import ClientBooksTable from '@/components/ClientBooksTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home Page",
};


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
      { publishYear: { equals: isNaN(parseInt(searchQuery)) ? undefined : parseInt(searchQuery) } },
      { price: { gte: isNaN(parseFloat(searchQuery)) ? undefined : parseFloat(searchQuery), lte: isNaN(parseFloat(searchQuery)) ? undefined : parseFloat(searchQuery) } }
    ]
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
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; query?: string }>;
}


export default async function BooksPage({ searchParams }: BooksPageProps) {
  const page = Number((await searchParams)?.page) || 1;
  const pageSize = 10;
  const searchQuery = (await searchParams)?.query;
  
  const { books, totalBooks } = await fetchBooks(page, pageSize, searchQuery);
  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <div className="space-y-4">
      <BookSearch />
      <ClientBooksTable 
        books={books} 
        page={page} 
        totalPages={totalPages} 
        searchQuery={searchQuery}
      />
    </div>
  );
}

