type Business = {
    id: string
    name: string
    description: string
    category: string
    address: string
    phone: string
    rating: number
    workingHours: Record<string, string>
    // Add other business properties
  }
  
  type SearchOptions = {
    page?: number
    limit?: number
    suggestionsOnly?: boolean
  }
  
  // This function would connect to your database
  // Replace with your actual data fetching logic
  export async function searchBusinesses(
    query: string, 
    options: SearchOptions = {}
  ): Promise<{ businesses: Business[], total: number } | Business[]> {
    const { 
      page = 1, 
      limit = 10, 
      suggestionsOnly = false 
    } = options
    
    // Example implementation - replace with your database query
    // This is just a mock implementation
    try {
      // In a real implementation, you would:
      // 1. Connect to your database
      // 2. Perform a search query with proper indexing
      // 3. Return the results
      
      // Mock data for demonstration
      const allBusinesses: Business[] = [
        // Your business data would come from your database
        // This is just example data
        {
          id: '1',
          name: 'Cafe Delight',
          description: 'A cozy cafe with delicious pastries',
          category: 'Restaurants',
          address: '123 Main St, City',
          phone: '555-1234',
          rating: 4.5,
          workingHours: {
            'Monday': '8:00 AM - 8:00 PM',
            'Tuesday': '8:00 AM - 8:00 PM',
            // other days...
          }
        },
        // More businesses...
      ]
      
      // Filter businesses based on search query
      const filteredBusinesses = allBusinesses.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.description.toLowerCase().includes(query.toLowerCase()) ||
        business.category.toLowerCase().includes(query.toLowerCase())
      )
      
      if (suggestionsOnly) {
        // For suggestions, just return simplified business objects
        return filteredBusinesses.slice(0, limit).map(business => ({
          id: business.id,
          name: business.name,
          category: business.category
        }))
      }
      
      // For full search, return paginated results
      const startIndex = (page - 1) * limit
      const paginatedBusinesses = filteredBusinesses.slice(startIndex, startIndex + limit)
      
      return {
        businesses: paginatedBusinesses,
        total: filteredBusinesses.length
      }
    } catch (error) {
      console.error('Error searching businesses:', error)
      throw error
    }
  }
  