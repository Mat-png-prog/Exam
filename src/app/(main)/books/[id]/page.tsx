//src/app/(main)/book/[id]/page.tsx

import { validateRequest } from "../../../auth";
import prisma from "@/lib/prisma";
import { updateBook } from "./actions";
import BookForm from "@/app/(main)/books/BookForm";

export default async function UpdateBookPage({
  params: { id },
}: {
  params: { id: string };
}) {
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
    await updateBook(id, data);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm book={book} onSubmit={handleSubmit} />
    </div>
  );
}

