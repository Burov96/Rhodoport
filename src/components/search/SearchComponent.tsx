'use client'
import { useTransition, useOptimistic, useActionState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React from 'react'

interface SearchResult {
  id: number;
  name: string;
  description: string;
}
const searchSchema = z.object({
  query: z.string().min(2).max(50),
})

export default function SearchComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticQuery, setOptimisticQuery] = useOptimistic(
    searchParams.get('q') || ''
  )

  const { register, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  })

  function SearchResultItem({ result }: { result: any }) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">{result.title}</h3>
        <p className="text-gray-600">{result.description}</p>
      </div>
    );
  }

  const [state, action] = useActionState(async (prevState: any, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData)
    const validated = searchSchema.safeParse(rawFormData)
    
    if (!validated.success) {
      return { 
        errors: validated.error.flatten(),
        results: [] 
      };
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(validated.data.query)}`);
      const results = await res.json();
      return { results, errors: null };
    } catch (error) {
      return { 
        errors: { fieldErrors: { query: ['Failed to fetch results'] } },
        results: [] 
      };
    }
  }, { results: [], errors: null });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    return params.toString()
  }

  const handleSearch = (data: z.infer<typeof searchSchema>) => {
    startTransition(() => {
      setOptimisticQuery(data.query)
      router.push(`${pathname}?${createQueryString('q', data.query)}`)
    })
  }

  return (
    <div className="w-full max-w-2xl">
      <form 
        action={action}
        onSubmit={handleSubmit(handleSearch)}
        className="flex gap-2"
      >
        <input
          {...register('query')}
          aria-label="Search"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue={optimisticQuery}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </form>

      {state.errors?.fieldErrors.query && (
        <p className="text-red-500 mt-2">{state.errors.fieldErrors.query}</p>
      )}

      <div className="mt-4 space-y-4">
        {state.results?.map((result: SearchResult) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  // Implement your search logic here using Next.js 15 data fetching
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    next: { tags: ['search'] }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch results')
  }

  return res.json()
}
