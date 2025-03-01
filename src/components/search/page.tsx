import { Suspense } from 'react'
import { searchBusinesses } from '../../lib/business'
import BusinessCard from '../BusinessCard'
// import SearchPagination from '@/app/components/SearchPagination'
import Search from '../Search'
import React from 'react'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: { q?: string; page?: string }
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
        <p className="text-lg text-gray-600">No results found for "{query}"</p>
        <p className="mt-2 text-gray-500">Try different keywords or browse categories</p>
      </div>
    )
  }

  const totalPages = Math.ceil(total / 10)

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Found {total} {total === 1 ? 'result' : 'results'} for "{query}"
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
