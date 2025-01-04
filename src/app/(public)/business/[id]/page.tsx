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
