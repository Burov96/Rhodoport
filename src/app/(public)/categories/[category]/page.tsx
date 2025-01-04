import BusinessCard from '@/components/BusinessCard';

interface Business {
  id: number;
  name: string;
  slug: string;
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

interface PageProps {
  params: Promise<{ category: string }>; 
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const { category } = await params;

    const res = await fetch(`http://localhost:3000/api/businesses?category=${category}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch businesses');
    }

    const businesses = (await res.json()) as Business[];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          Businesses in {category.replace('-', ' ')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    );
  } catch (error: unknown) {
    return (
      <div className="text-center py-10">
        <h2 className="text-red-500 text-xl font-bold mb-4">Failed to load businesses</h2>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'An error occurred'}
        </p>
      </div>
    );
  }
}
