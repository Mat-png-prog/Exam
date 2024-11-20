// src/app/(main)/books/[id]/delete/ClientDeleteBook.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteBookAction } from './actions';
import { Button } from '@/components/ui/button';

export default function ClientDeleteBook({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBookAction(id);
      if (result.success) {
        router.push('/books');
        router.refresh();
      } else {
        setError(result.error || 'Failed to delete book');
      }
    } catch (error: any) {
      console.error('Error deleting book:', error);
      setError(`Unable to delete book. ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4">
        <Button 
          onClick={handleDelete} 
          disabled={isDeleting} 
          className="hover:bg-yellow-400 hover:text-black text-red-500"
        >
          {isDeleting ? 'Deleting...' : 'Confirm Delete'}
        </Button>
      </div>
    </div>
  );
}