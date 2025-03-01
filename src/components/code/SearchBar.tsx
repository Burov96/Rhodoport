"use client";

import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input 
          name="query" 
          className="flex-1 px-4 py-2 rounded-lg border" 
          placeholder="Search businesses..."
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
