/**
 * Property Detail Page
 * Displays full property details with SEO-friendly slug
 * 
 * Route: /property/[slug]
 * Slug format: 2-bhk-fully-furnished-sector-56-gurugram-12345
 * The ID is extracted from the last part of the slug
 */

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useProperty } from '@/hooks/useProperties';
import { formatPrice, formatArea } from '@rent-lessly/utils';
import { Button } from '@rent-lessly/ui';
import { ScheduleVisitModal } from '@/components/ScheduleVisitModal';
import { useState } from 'react';

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug;
  const [showVisitModal, setShowVisitModal] = useState(false);

  const { property, isLoading, isError } = useProperty(slug);

// https://rentlessly.in/property/2-bhk-fully-furnished-sector-56-gurugram-12345

// https://rentlessly.in/property/1-BHK-in-Palam-Vihar-Gurgaon-for-rent-12345

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-96 mb-4"></div>
          <div className="bg-gray-300 h-8 mb-2 w-1/2"></div>
          <div className="bg-gray-300 h-4 w-3/4"></div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button href="/">Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative h-96 bg-gray-200 rounded-sm overflow-hidden">
            <Image
              src={property.images?.[0]?.url || '/placeholder.jpg'}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-2">
          {property.images?.slice(1, 10).map((image) => (
            <div
              key={image.id}
              className="relative h-24 bg-gray-200 rounded-sm overflow-hidden"
            >
              <Image
                src={image.url}
                alt="Property thumbnail"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{property.locality}</p>

          {/* Price and Key Details */}
          <div className="bg-gray-50 border border-gray-300 rounded-sm p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-600 text-sm">Monthly Rent</p>
                <p className="text-2xl font-bold">{formatPrice(property.rent)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Area</p>
                <p className="text-2xl font-bold">{formatArea(property.area)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">BHK</p>
                <p className="text-2xl font-bold">{property.bhk}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Furnished</p>
                <p className="text-lg font-semibold">
                  {property.furnishedType.replace(/_/g, ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center p-3 border border-gray-300 rounded-sm"
                  >
                    <span className="text-lg mr-2">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Contact Card */}
          <div className="border border-gray-300 rounded-sm p-6 sticky top-4">
            <h3 className="text-lg font-bold mb-4">Contact Broker</h3>

            <div className="mb-6 pb-6 border-b border-gray-300">
              <p className="text-sm text-gray-600 mb-2">Broker Name</p>
              <p className="font-semibold">{property.broker?.name}</p>
              <p className="text-sm text-gray-600 mt-3">{property.broker?.phone}</p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowVisitModal(true)}
              >
                Schedule Visit
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  window.location.href = `tel:${property.broker?.phone}`;
                }}
              >
                Call Broker
              </Button>
            </div>

            {/* View Count */}
            <p className="text-xs text-gray-500 text-center mt-6">
              {property.viewCount} people viewed this property
            </p>
          </div>
        </div>
      </div>

      {/* Visit Modal */}
      {showVisitModal && (
        <ScheduleVisitModal
          propertyId={property.id}
          onClose={() => setShowVisitModal(false)}
        />
      )}
    </div>
  );
}
