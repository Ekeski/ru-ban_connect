// src/components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg mx-auto gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative flex-1 rounded-lg overflow-hidden"
        animate={{
          boxShadow: isFocused
            ? '0 0 25px rgba(34, 197, 94, 0.4)'
            : '0 5px 15px rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div animate={{ rotate: isFocused ? 15 : 0 }} transition={{ duration: 0.3 }}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600 font-bold" />
        </motion.div>
        <Input
          type="text"
          placeholder="Search for fresh produce..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-12 pr-4 py-3 w-full border-2 border-green-100 rounded-lg font-bold text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
        />
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
        >
          Search
        </Button>
      </motion.div>
    </motion.form>
  );
}