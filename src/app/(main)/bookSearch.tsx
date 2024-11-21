/* import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';

const BookSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounce(searchQuery, 300);

  // Update URL with search params
  const updateSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    params.set('page', '1'); // Reset to first page on new search
    router.push(`?${params.toString()}`);
  };

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(searchQuery);
  };

  // Effect for debounced search
  useEffect(() => {
    updateSearchParams(debouncedValue);
  }, [debouncedValue]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};

export default BookSearch; */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export default function BookSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('query', debouncedSearchTerm);
      params.delete('page'); // Reset to first page when searching
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  return (
    <Input
      className="max-w-sm"
      placeholder="Search books by title or author..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}