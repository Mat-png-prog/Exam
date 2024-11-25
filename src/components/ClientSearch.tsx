'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export default function BookSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('query') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Update URL with search params
  const updateSearchParams = useCallback((value: string) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, router, searchParams]);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Effect for debounced search
  useEffect(() => {
    updateSearchParams(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateSearchParams]);

  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search books by title, author, price or publish year"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 w-full"
        />
      </div>
    </div>
  );
}
