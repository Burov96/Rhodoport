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
