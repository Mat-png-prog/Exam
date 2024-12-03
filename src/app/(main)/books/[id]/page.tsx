//src/app/(main)/book/[id]/page.tsx
import { validateRequest } from "../../../auth";
import prisma from "@/lib/prisma";
import BookForm from "@/app/(main)/books/BookForm";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Edit-book",
};
export default async function ShowBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book || book.userId !== user.id) {
    throw new Error("Not found");
  }

  const handleSubmit = async (data: {
    title: string;
    author: string;
    publishYear: number;
    price: number;
    available: boolean;
    description: string;
  }) => {
    return Promise.resolve();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Information</h1>
      <BookForm book={book} onSubmit={handleSubmit} />
    </div>
  );
}

