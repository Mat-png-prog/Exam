import { validateRequest } from "../../auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
/* import BookSearch from "@/components/BookSearch"; */
import BookTable from "./BookTable";
import { Prisma } from "@prisma/client";
import ClientPagination from "./ClientPagination";
import AddIcon from "./components/AddIcon";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  const where: Prisma.BookWhereInput = {
    userId: user.id,
    ...(searchParams.search && {
      OR: [
        { title: { contains: searchParams.search, mode: Prisma.QueryMode.insensitive } },
        { author: { contains: searchParams.search, mode: Prisma.QueryMode.insensitive } },
        { 
          publishYear: { 
            equals: searchParams.search ? parseInt(searchParams.search) : undefined 
          } 
        },
        { 
          price: searchParams.search 
            ? { 
                gte: parseFloat(searchParams.search), 
                lte: parseFloat(searchParams.search) 
              } 
            : undefined 
        }
      ].filter(Boolean)
    })
  };

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.book.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Books</h1>
        
        <Button>
          <Link href="/books/create">
            <AddIcon />
            Add Book
          </Link>
        </Button>
        
      </div>
      {/* <BookSearch /> */}
      <BookTable books={books} />
      <ClientPagination totalPages={totalPages} currentPage={page} />
    </div>
  );
}