//src/app/(main)/book/[id]/update/actions.ts

'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "../../../../auth";
import prisma from "@/lib/prisma";
import { BookValues } from "@/lib/validations";

export async function updateBookAction(id: string, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book || book.userId !== user.id) {
    throw new Error("Not found");
  }

  const values: BookValues = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    description: formData.get('description') as string,
    publishYear: parseInt(formData.get('publishYear') as string),
    price: parseFloat(formData.get('price') as string),
    available: Boolean(formData.get('available'))
  };

  await prisma.book.update({
    where: { id },
    data: values,
  });

  revalidatePath("/books");
  redirect("/books");
}
