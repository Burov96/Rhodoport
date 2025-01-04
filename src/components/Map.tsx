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
