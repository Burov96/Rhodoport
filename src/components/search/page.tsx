import { Suspense } from 'react'
import BusinessCard from '../BusinessCard'
import Search from '../Search'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: { q?: string; page?: string }
}

// Temporary mock function until you implement the real one
async function searchBusinesses(query: string, options: { page: number, limit: number, suggestionsOnly: boolean }) {
  // This is a placeholder - replace with your actual implementation
  const mockBusinesses = [
    {
      id: 1,
      name: 'Style Studio',
      description: 'Modern hair salon with experienced stylists',
      category_id: 1,
      address: '123 Fashion St',
      phone: '+1234567890',
      working_hours: '{"monday": "9:00-18:00", "tuesday": "9:00-18:00", "wednesday": "9:00-18:00", "thursday": "9:00-18:00", "friday": "9:00-20:00", "saturday": "10:00-16:00", "sunday": "closed"}',
      image_url: 'https://img.freepik.com/free-photo/drag-person-putting-makeup_23-2149256329.jpg',
      latitude: 41.2345,
      longitude: 23.4567,
      rating: 4.5,
      review_count: 0,
      created_at: '2025-01-03 21:45:26'
    },
    // Add more mock businesses if needed
  ];

  return {
    businesses: mockBusinesses,
    total: mockBusinesses.length
  };
}

// SearchPagination component
function SearchPagination({ 
  currentPage, 
  totalPages, 
  query 
}: {
  currentPage: number;
  totalPages: number;
  query: string;
}) {
  const pathname = usePathname ? usePathname() : '';
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of page range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        <Link
          href={`${pathname}?q=${query}&page=${currentPage - 1}`}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}
          onClick={(e) => {
            if (currentPage === 1) e.preventDefault();
          }}
        >
          Previous
        </Link>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border bg-white text-gray-700"
            >
              ...
            </span>
          ) : (
            <Link
              key={`page-${page}`}
              href={`${pathname}?q=${query}&page=${page}`}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                currentPage === Number(page)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          )
        ))}
        
        <Link
          href={`${pathname}?q=${query}&page=${currentPage + 1}`}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}
          onClick={(e) => {
            if (currentPage === totalPages) e.preventDefault();
          }}
        >
          Next
        </Link>
      </nav>
    </div>
  );
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  if (!query) {
    return <div className="text-center py-10">Please enter a search term</div>
  }

  const { businesses, total } = await searchBusinesses(query, {
    page,
    limit: 10,
    suggestionsOnly: false
  })

  if (businesses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No results found for &quot;{query}&quot;</p>
        <p className="mt-2 text-gray-500">Try different keywords or browse categories</p>
      </div>
    )
  }

  const totalPages = Math.ceil(total / 10)

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Found {total} {total === 1 ? 'result' : 'results'} for &quot;{query}&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>

      {totalPages > 1 && (
        <SearchPagination 
          currentPage={page} 
          totalPages={totalPages} 
          query={query} 
        />
      )}
    </div>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const page = parseInt(searchParams.page || '1')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Search />
      </div>
      
      <Suspense fallback={<div className="text-center py-10">Loading results...</div>}>
        <SearchResults query={query} page={page} />
      </Suspense>
    </div>
  )
}
