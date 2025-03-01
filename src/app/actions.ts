'use server'

import { revalidatePath } from 'next/cache';

export async function searchBusinesses(prevState: any, formData: FormData) {
  const query = formData.get('query') as string;
  
  if (!query || query.length < 2) {
    return {
      results: [],
      message: 'Please enter at least 2 characters'
    };
  }
  
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (!response.ok) {
      return {
        results: [],
        message: data.error || 'Search failed'
      };
    }
    
    return {
      results: data,
      message: ''
    };
  } catch (error) {
    return {
      results: [],
      message: 'An error occurred while searching'
    };
  }
}
