import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export interface Business extends RowDataPacket {
  id: number;
  slug: string;
  name: string;
  description: string;
  category_id: number;
  address: string;
  phone: string;
  working_hours: string;
  image_url: string;
  latitude: number;
  longitude: number;
  rating: string;
  review_count: number;
  created_at: string;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    
    const [rows] = await pool.query<Business[]>(
      'SELECT * FROM businesses WHERE id = ?',
      [id]
    );
    
    if (!rows[0]) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}
