import { NextRequest } from 'next/server'
import { searchBusinesses } from '@/lib/business'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  if (!query) {
    return Response.json({ businesses: [], total: 0 })
  }
  
  try {
    const { businesses, total } = await searchBusinesses(query, { 
      page, 
      limit,
      suggestionsOnly: false 
    })
    
    return Response.json({ businesses, total })
  } catch (error) {
    console.error('Error searching businesses:', error)
    return Response.json(
      { error: 'Failed to search businesses' }, 
      { status: 500 }
    )
  }
}
