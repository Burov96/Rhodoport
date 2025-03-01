import Image from "next/image";
import { useMemo } from "react";
import MapX from "./Map";
import React from "react";
import Link from "next/link";

interface Hours {
  [key: string]: string; // This allows any string key with string value
}

interface BusinessData {
  id: number;
  name: string;
  slug?: string;
  description: string;
  category_id: number;
  address: string;
  phone: string;
  working_hours: string;
  image_url: string;
  latitude: number;
  longitude: number;
  rating: number;
  review_count: number;
  created_at: string;
}

export default function BusinessCard({ business }: { business: BusinessData }) {
  const isBusinessOpen = useMemo(() => {
    try {
      const hours: Hours = JSON.parse(business.working_hours);

      const now = new Date();
      const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
      const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const todayHours = hours[currentDay];
      if (!todayHours || todayHours.toLowerCase() === "closed") return false;

      const [openTime, closeTime] = todayHours.split(" - ").map((time) => {
        const [hourMin, period] = time.split(" ");
        let hour;
        const minute = hourMin.split(":").map(Number)[1];
        hour = hourMin.split(":").map(Number)[0];
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;        
        return `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
      });

      return currentTime >= openTime && currentTime <= closeTime;
    } catch (error) {
      console.error("Error parsing business hours:", error);
      return null;
    }
  }, [business.working_hours]);

  const getCategoryName = (categoryId: number) => {
    const categories: Record<number, string> = {
      1: "Restaurants",
      2: "Retail",
      3: "Services",
      4: "Entertainment",
      5: "Something else",
      6: "Entertainment",
      7: "Entertainment",
      // Add more (TODO:)
    };

    return categories[categoryId] || `Category ${categoryId}`;
  };

  console.log(business);
  return (
    <Link href={`/business/${business.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center text-gray-400"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{business.name}</h3>

          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    i < Math.floor(business.rating)
                      ? "fill-current"
                      : "stroke-current fill-none"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">
              {Number(business.rating).toFixed(1) || 5}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {business.description}
          </p>

          <div className="mt-3 text-sm text-gray-500">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs truncate">{business.address}</span>
            </div>

            <div className="flex items-start mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-xs">{business.phone}</span>
            </div>
            <div className="flex items-start mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {isBusinessOpen === null ? (
                <span className="text-xs text-gray-500">
                  Hours not available
                </span>
              ) : isBusinessOpen ? (
                <span className="text-xs text-green-600 font-medium">
                  Open Now
                </span>
              ) : (
                <span className="text-xs text-red-600 font-medium">
                  Closed Now
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {getCategoryName(business.category_id)}
              </span>

              <button
                className="text-xs text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation from Link
                  window.open(
                    `https://maps.google.com/?q=${business.latitude},${business.longitude}`,
                    "_blank"
                  );
                }}
              >
                View on map
              </button>
            </div>

            <div className="mt-2 h-32 w-full relative rounded overflow-hidden">
              <MapX
                latitude={business.latitude}
                longitude={business.longitude}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
