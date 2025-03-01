# Project Structure

``├───.env
├───.git
├───.gitignore
├───.next
├───README.md
├───bun.lockb
├───eslint.config.mjs
├───next-env.d.ts
├───next.config.ts
├───package.json
├───paliServera.sh
├───postcss.config.mjs
├───public
├───src
│   ├───app
│   │   ├───(public)
│   │   │   ├───business
│   │   │   │   └───[id]
│   │   │   │       └───page.tsx
│   │   │   └───categories
│   │   │       └───[category]
│   │   │           └───page.tsx
│   │   ├───api
│   │   │   ├───businesses
│   │   │   │   ├───[id]
│   │   │   │   │   └───route.ts
│   │   │   │   ├───featured
│   │   │   │   │   └───route.ts
│   │   │   │   └───route.ts
│   │   │   ├───categories
│   │   │   │   └───top
│   │   │   │       └───route.ts
│   │   │   └───search
│   │   │       └───route.ts
│   │   ├───error.tsx
│   │   ├───favicon.ico
│   │   ├───globals.css
│   │   ├───layout.tsx
│   │   ├───loading.tsx
│   │   ├───not-found.tsx
│   │   └───page.tsx
│   ├───components
│   │   ├───BusinessCard.tsx
│   │   ├───Footer.tsx
│   │   ├───Header.tsx
│   │   ├───Map.tsx
│   │   ├───code
│   │   │   ├───CodeComponent.jsx
│   │   │   ├───SearchBar.tsx
│   │   │   └───reshenie.js
│   │   └───search
│   │       ├───CodeComponent.jsx
│   │       ├───SearchBar.tsx
│   │       ├───SearchComponent.tsx
│   │       └───reshenie.js
│   └───lib
│       ├───database.ts
│       └───db.ts
├───tailwind.config.ts
├───testche.js
└───tsconfig.json
```

# Bundled Next.js Application Code

## File: eslint.config.mjs
```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

## File: next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

## File: next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // Dynamic routes stale after 30 seconds
      static: 180, // Static routes stale after 3 minutes
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      }
    ],
  },
};

export default nextConfig;

```

## File: package.json
```json
{
  "name": "rhodoport",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@react-google-maps/api": "^2.20.5",
    "mysql2": "^3.11.5",
    "next": "15.1.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

## File: postcss.config.mjs
```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

## File: tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

```

## File: testche.js
```js
import mysql from 'mysql2/promise';

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'rngfw-94-156-23-153.a.free.pinggy.link',
      port: 16450,
      user: 'root',
      password: 'mangasarkon',
      database: 'city_directory',
    });

    console.log('Connected to the database!');
    const [rows] = await connection.execute('SHOW TABLES;');
    console.log('Tables:', rows);

    await connection.end();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

## File: src\app\(public)\business\[id]\page.tsx
```tsx
'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import BusinessCard from "@/components/BusinessCard"

export default function Page() {
  const params = useParams()
  const [business, setBusiness] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
    fetch(`/api/businesses/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch business data")
        return res.json()
      })
      .then((data) => setBusiness(data))
      .catch((err) => setError(err.message))
  }, [params.id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-8 animate-fade-in rounded-lg bg-red-50 p-4 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error occurred</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}
          
          {business ? (
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <BusinessCard business={business} />
            </div>
          ) : (
            !error && (
              <div className="flex h-64 items-center justify-center rounded-lg bg-white p-8 shadow-sm">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 mx-auto"></div>
                  <p className="text-lg font-medium text-gray-600">Loading business details...</p>
                  <p className="mt-2 text-sm text-gray-400">Please wait while we fetch the information</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

```

## File: src\app\(public)\categories\[category]\page.tsx
```tsx
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/businesses?category=${category}`, {
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

```

## File: src\app\api\businesses\featured\route.ts
```ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM businesses');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}
```

## File: src\app\api\businesses\route.ts
```ts
import pool from '../../../lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  const [rows] = await pool.query('SELECT * FROM businesses WHERE category_id = ?', [category]);
  
  return new Response(JSON.stringify(rows), { status: 200 });
}

```

## File: src\app\api\businesses\[id]\route.ts
```ts
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

```

## File: src\app\api\categories\top\route.ts
```ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}
```

## File: src\app\api\search\route.ts
```ts
// app/api/search/route.ts
import { searchDatabase } from '@/lib/database'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters' }, 
      { status: 400 }
    )
  }

  try {
    const results = await searchDatabase(query)
    return NextResponse.json(results)
  } catch (error:any) {
    return NextResponse.json(
      { error: error.message || 'Search failed' }, 
      { status: 500 }
    )
  }
}

```

## File: src\app\error.tsx
```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

```

## File: src\app\layout.tsx
```tsx
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Родопорт",
  description: "Портал на родопското градче - Пещера.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
      );
}

```

## File: src\app\loading.tsx
```tsx
export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }
  
```

## File: src\app\not-found.tsx
```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="mb-4">Page not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}

```

## File: src\app\page.tsx
```tsx
import Image from 'next/image';
import Link from 'next/link';
import SearchComponent from '../components/search/SearchComponent'
import CodeComponent from '../components/search/CodeComponent'

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
<SearchComponent />
{/* <CodeComponent /> */}
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

```

## File: src\components\BusinessCard.tsx
```tsx
import Image from 'next/image'
import { useMemo } from 'react'
import MapX from './Map'

interface Hours {
  [key: string]: string  // This allows any string key with string value
}

interface BusinessData {
  id: number
  name: string
  slug: string
  description: string
  category_id: number
  address: string
  phone: string
  working_hours: string
  image_url: string
  latitude: number
  longitude: number
  rating: string
  review_count: number
  created_at: string
}


export default function BusinessCard({ business }: { business: BusinessData }) {
  const workingHours = useMemo(() => {
    try {
      return JSON.parse(business.working_hours) as Hours
    } catch {
      return {} as Hours
    }
  }, [business.working_hours])


  return (
    <div className="rounded-lg shadow-lg bg-white max-w-md overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        {business.image_url && (
          <Image 
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{business.name}</h2>
        <p className="text-sm text-gray-500">{business.description}</p>

        {/* Rating Row */}
        <div className="flex items-center gap-2 text-yellow-500">
          <span className="font-semibold text-lg">{business.rating}</span>
          <span className="text-sm text-gray-400">({business.review_count} reviews)</span>
        </div>

        {/* Address & Phone */}
        <p className="text-gray-600">
          <span className="font-medium">Address:</span> {business.address}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Phone:</span> {business.phone}
        </p>

        {/* Working Hours */}
        <div className="mt-3">
          <h3 className="text-sm font-semibold mb-1">Working Hours:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {Object.entries(workingHours).map(([day, hours]) => (
              <li key={day} className="flex justify-between">
                <span className="capitalize">{day}:</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordinates */}
        <div className="mt-4">
  <h3 className="text-sm font-semibold mb-2">Location</h3>
  <MapX 
    latitude={business.latitude} 
    longitude={business.longitude} 
  />
</div>
      </div>
      </div>
  )
}

```

## File: src\components\code\CodeComponent.jsx
```jsx
'use client'
import React, { useState } from 'react'
import reshenie from './reshenie'


function CodeComponent() {
const [input, setInput] = useState('')
const [result, setResult] = useState('')

function checker(input){
  console.log(input)
  const rez = reshenie(input)
setResult()
}

const handleChange =(e)=>{
  e.preventDefault();
  setInput(e.target.value)
  console.log(input)
}
  return (
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-2 rounded-xl">
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="What are you looking for?"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        disabled
        value={result}
        placeholder="Location"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-black px-8 py-4 rounded-lg transition-colors duration-200" onClick={checker}>
        Check
      </button>
    </div>
  </div>
  )
}

export default CodeComponent
```

## File: src\components\code\reshenie.js
```js
function reshenie(input) {
    console.log('input is ')
    console.log( input)
    return input + "2222"
}

export default reshenie
```

## File: src\components\code\SearchBar.tsx
```tsx
"use client";

import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input 
          name="query" 
          className="flex-1 px-4 py-2 rounded-lg border" 
          placeholder="Search businesses..."
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

```

## File: src\components\Footer.tsx
```tsx
export default function Footer() {
    return (
      <footer className="w-full py-5 bg-black text-black mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>Hair & Beauty</li>
                <li>Health & Medical</li>
                <li>Food & Dining</li>
                <li>Fitness & Sports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">For Businesses</h3>
              <ul className="space-y-2">
                <li>Add Your Business</li>
                <li>Business Dashboard</li>
                <li>Advertising</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Contact</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2024 City Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
```

## File: src\components\Header.tsx
```tsx
export default function Header(){
    return(
        <header className="bg-blue-500 text-black p-4 hidden">
            <h1>City Directory</h1>
        </header>
    )
}
```

## File: src\components\Map.tsx
```tsx
'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useMemo } from 'react'

interface MapProps {
  latitude: number
  longitude: number
}

export default function MapX({ latitude, longitude }: MapProps) {
  const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude])
  
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        mapContainerClassName="w-full h-48 rounded-lg mt-4"
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

```

## File: src\components\search\CodeComponent.jsx
```jsx
'use client'
import React, { useState } from 'react'
import reshenie from './reshenie'


function CodeComponent() {
const [input, setInput] = useState('')
const [result, setResult] = useState('')

function checker(input){
  console.log(input)
  const rez = reshenie(input)
setResult()
}

const handleChange =(e)=>{
  e.preventDefault();
  setInput(e.target.value)
  console.log(input)
}
  return (
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-2 rounded-xl">
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="What are you looking for?"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        disabled
        value={result}
        placeholder="Location"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-black px-8 py-4 rounded-lg transition-colors duration-200" onClick={checker}>
        Check
      </button>
    </div>
  </div>
  )
}

export default CodeComponent
```

## File: src\components\search\reshenie.js
```js
function reshenie(input) {
    console.log('input is ')
    console.log( input)
    return input + "2222"
}

export default reshenie
```

## File: src\components\search\SearchBar.tsx
```tsx
"use client";

import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input 
          name="query" 
          className="flex-1 px-4 py-2 rounded-lg border" 
          placeholder="Search businesses..."
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

```

## File: src\components\search\SearchComponent.tsx
```tsx
'use client'
import { useTransition, useOptimistic, useActionState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

```

## File: src\lib\database.ts
```ts
// app/lib/database.ts
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

    return (results as any[]).map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      address: row.address,
      phone: row.phone,
      category: { name: row.category_name },
      working_hours: row.working_hours,
      created_at: new Date(row.created_at)
    }))
  } catch (error) {
    console.error('Database search error:', error)
    throw new Error('Failed to execute search query')
  } finally {
    if (connection) connection.release()
  }
}

```

## File: src\lib\db.ts
```ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host:process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '16450', 10),
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

```

