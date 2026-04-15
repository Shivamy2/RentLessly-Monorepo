/**
 * PropertyCard Component
 * Reusable card for displaying property in grid/list views
 * Minimal border radius design inspired by No Broker style
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatArea } from '@rent-lessly/utils';
import { Button } from '@rent-lessly/ui';

export function PropertyCard({ property, onSave, isSaved = false }) {
  const thumbnailUrl = property.images?.[0]?.url || '/placeholder.jpg';

  const handleSave = (e) => {
    e.preventDefault();
    onSave?.(property.id);
  };

  return (
    <Link href={`/property/${property.slug}`}>
      <a className="block border border-gray-300 rounded-sm overflow-hidden hover:shadow-md transition-shadow bg-white">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={thumbnailUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Price Badge */}
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-sm font-semibold">
            ₹{(property.rent / 100000).toFixed(1)}L
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`absolute top-3 right-3 w-8 h-8 rounded-sm flex items-center justify-center transition-colors ${
              isSaved
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300'
            }`}
            aria-label="Save property"
          >
            ♥
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and BHK */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base line-clamp-2">
              {property.bhk} BHK • {property.title}
            </h3>
          </div>

          {/* Location */}
          <p className="text-gray-600 text-sm mb-3">{property.locality}</p>

          {/* Details */}
          <div className="flex text-sm text-gray-700 mb-3 space-x-3">
            <span>{formatArea(property.area)}</span>
            <span>•</span>
            <span className="capitalize">{property.furnishedType.replace(/_/g, ' ')}</span>
          </div>

          {/* Amenities Preview */}
          {property.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="px-2 py-1 bg-gray-100 text-xs rounded-sm"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-600">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          {/* View Details Link */}
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500">
              {property.viewCount} views
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
