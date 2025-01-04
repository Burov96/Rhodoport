import pool from '../../../lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  const [rows] = await pool.query('SELECT * FROM businesses WHERE category_id = ?', [category]);
  
  return new Response(JSON.stringify(rows), { status: 200 });
}
