import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  businessCount: number;
}

interface Business {
  id: number;
  name: string;
  description: string;
  image_url: string;
  premium?: boolean;
  rating: number;
  reviewCount: number;
}

async function getFeaturedBusinesses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/businesses/featured`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch featured businesses');
  return res.json();
}

async function getTopCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories/top`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch top categories');
  return res.json();
}



export default async function Home() {
  try {
    const [featuredBusinesses, topCategories] = await Promise.all([
      getFeaturedBusinesses(),
      getTopCategories()
    ]);

    
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center items-center text-black text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Discover Your City&apos;s Best
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Find and connect with local businesses, services, and experiences in your neighborhood
          </p>
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-2 rounded-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-black px-8 py-4 rounded-lg transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topCategories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-square hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={"/"+category.slug+".svg" || "/image.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110  transition-transform duration-300 opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
                  <p className="text-black/80 text-sm">{category.businessCount} businesses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business: Business) => (
              <div key={business.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={business.image_url || "/image.svg"}
                    alt={business.name}
                    fill
                    className="object-cover"
                  />
                  {business.premium && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-4">{business.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i > business.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-gray-600 ml-2">({business.reviewCount>0?business.reviewCount:0})</span>
                    </div>
                    <Link
                      href={`/business/${business.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-gray-400">Local Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-gray-400">Monthly Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Own a Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of local businesses and reach more customers
          </p>
          <Link
            href="/register-business"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            List Your Business
          </Link>
        </div>
      </section>
    </div>
  );
} catch (error: unknown) {
  return (
    <div className="text-center py-10">
      <h2 className="text-red-500">Failed to load data</h2>
      <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
    </div>
  );
}
}
