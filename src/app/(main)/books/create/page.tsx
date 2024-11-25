// app/book/create/page.tsx
"use client";

import { createBook } from "@/app/(main)/books/actions";
import BookForm from "@/app/(main)/books/BookForm"; // adjust path
import { BookValues } from "@/lib/validations";

export default function CreateBookPage() {
  const handleSubmit = async (data: BookValues) => {
    // Make sure data is a plain object
    const plainData = {
      title: data.title,
      author: data.author,
      description: data.description,
      publishYear: data.publishYear,
      price: data.price,
      available: data.available
    };
    
    await createBook(plainData);
  };

  return (
    <div>
      <h1 className="text-4xl p-3">Add New Book</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}