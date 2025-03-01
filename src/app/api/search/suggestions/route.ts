import { NextRequest } from 'next/server'
import { searchBusinesses } from '@/lib/business'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  
  if (!query || query.length < 2) {
    return Response.json([])
  }
  
  try {
    const suggestions = await searchBusinesses(query, { limit: 5, suggestionsOnly: true })
    return Response.json(suggestions)
  } catch (error) {
    console.error('Error searching businesses:', error)
    return Response.json({ error: 'Failed to fetch suggestions' }, { status: 500 })
  }
}
