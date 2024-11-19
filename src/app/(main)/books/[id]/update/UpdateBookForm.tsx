'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Book } from '@prisma/client';
import { updateBookAction } from './actions';
import { bookSchema, BookValues } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; // Make sure to import the Switch component

interface UpdateBookFormProps {
  book: Book;
}

export default function UpdateBookForm({ book }: UpdateBookFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, control } = useForm<BookValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      publishYear: book.publishYear,
      available: book.available,
    },
  });
  // Helper function to convert book data to FormData
const convertBookToFormData = (bookData: BookValues): FormData => {
  const formData = new FormData();
  
  // Append all book properties to FormData
  Object.entries(bookData).forEach(([key, value]) => {
    // Convert boolean to string to ensure proper serialization
    if (typeof value === 'boolean') {
      formData.append(key, value.toString());
    } else {
      formData.append(key, value.toString());
    }
  });
  
  return formData;
};

// Updated submit handler
const onSubmit = async (data: BookValues) => {
  const formData = convertBookToFormData(data);
  await updateBookAction(book.id, formData);
  router.push('/books');
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium">Title</Label>
        <Input id="title" {...register('title')} className="mt-1 block w-full border" />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="author" className="block text-sm font-medium">Author</Label>
        <Input id="author" {...register('author')} className="mt-1 block w-full border" />
        {errors.author && <p className="text-red-600">{errors.author.message}</p>}
      </div>
      <div>
        <Label htmlFor="description" className="block text-sm font-medium">Description</Label>
        <textarea id="description" {...register('description')} className="mt-1 block w-full border" />
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="price" className="block text-sm font-medium">Price</Label>
        <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="mt-1 block w-full border" />
        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
      </div>
      <div>
        <Label htmlFor="publishYear" className="block text-sm font-medium">Publish Year</Label>
        <Input id="publishYear" type="number" {...register('publishYear', { valueAsNumber: true })} className="mt-1 block w-full border" />
        {errors.publishYear && <p className="text-red-600">{errors.publishYear.message}</p>}
      </div>
      <div>
        <Label htmlFor="available" className="block text-sm font-medium">Available</Label>
        <Controller
          control={control}
          name="available"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} className="mt-1 block" />
          )}
        />
        {errors.available && <p className="text-red-600">{errors.available.message}</p>}
      </div>
      <Button type="submit" className="px-4 py-2 bg-blue-600 text-white">Update</Button>
    </form>
  );
}
