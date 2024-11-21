// src/app/(main)/book/actions.ts
"use server";

import { BookValues, bookSchema } from "@/lib/validations";
import prisma from "@/lib/prisma";
import { validateRequest } from "../../../auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBook(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const validatedFields = bookSchema.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    description: formData.get("description"),
    publishYear: parseInt(formData.get("publishYear") as string),
    price: parseFloat(formData.get("price") as string),
    available: formData.get("available") === "true",
  });

  await prisma.book.create({
    data: {
      ...validatedFields,
      userId: user.id,
    },
  });

  revalidatePath("/book");
  redirect("/book");
}

export async function updateBook(id: string, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id, userId: user.id },
  });

  if (!book) throw new Error("Not found");

  const validatedFields = bookSchema.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    description: formData.get("description"),
    publishYear: parseInt(formData.get("publishYear") as string),
    price: parseFloat(formData.get("price") as string),
    available: Boolean(formData.get('available'))
  });

  await prisma.book.update({
    where: { id },
    data: validatedFields,
  });

  revalidatePath("/book");
  redirect("/book");
}

export async function deleteBook(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id, userId: user.id },
  });

  if (!book) throw new Error("Not found");

  await prisma.book.delete({
    where: { id },
  });

  revalidatePath("/books");
  redirect("/books");
}