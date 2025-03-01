import pool from './db'

export interface Business {
  id: number
  name: string
  description: string
  address: string
  phone?: string
  category: {
    name: string
  }
  working_hours?: string
  created_at: Date
}

interface DatabaseRow {
  id: number
  name: string
  description: string
  address: string
  phone: string | null
  category_name: string
  working_hours: string | null
  created_at: string | Date
}

export async function searchDatabase(query: string): Promise<Business[]> {
  let connection
  try {
    connection = await pool.getConnection()
    const [results] = await connection.query(
      `SELECT 
        b.id,
        b.name,
        b.description,
        b.address,
        b.phone,
        c.name AS category_name,
        b.working_hours,
        b.created_at
      FROM businesses b
      JOIN categories c ON b.category_id = c.id
      WHERE 
        MATCH(b.name, b.description, b.address) AGAINST(? IN BOOLEAN MODE)
      ORDER BY b.created_at DESC
      LIMIT 20`,
      [`+${query.split(' ').join('* +')}*`]
    )

    return (results as DatabaseRow[]).map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      address: row.address,
      phone: row.phone || undefined,
      category: { name: row.category_name },
      working_hours: row.working_hours || undefined,
      created_at: new Date(row.created_at)
    }))
  } catch (error) {
    console.error('Database search error:', error)
    throw new Error('Failed to execute search query')
  } finally {
    if (connection) connection.release()
  }
}
