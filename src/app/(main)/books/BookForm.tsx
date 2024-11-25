//src/app/(main)/books/BookForm.tsx
'use client';

import { BookValues, bookSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';;
import LoadingButton from '@/components/LoadingButton';
import { Input } from '@/components/ui/input';
import Textarea2 from '@/components/ui/textarea2';
import { Switch } from '@/components/ui/switch';

interface BookFormProps {
  book?: BookValues;
  onSubmit: (data: BookValues) => Promise<void>;
}

export default function BookForm({ book, onSubmit }: BookFormProps) {
  const form = useForm<BookValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      description: book?.description ?? '',
      publishYear: book?.publishYear ?? new Date().getFullYear(),
      price: book?.price ?? 0,
      available: book?.available ?? false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <h1 className='text-4xl'> Must be unique</h1>
              <FormControl>
                <Textarea2 {...field}  placeholder='Must be unique'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="publishYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (ZAR)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Availability</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={form.formState.isSubmitting} className="w-full">
          {book ? 'Update Book' : 'Create Book'}
        </LoadingButton>
      </form>
    </Form>
  );
}
