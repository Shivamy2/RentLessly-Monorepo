/**
 * Metadata generation for property detail page
 * SEO optimization using Next.js generateMetadata
 */

import { propertyAPI } from '@/services/api/client';
import { extractIdFromSlug } from '@rent-lessly/utils';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await propertyAPI.getPropertyBySlug(slug);
    const property = response.data.data;

    const title = `${property.bhk} BHK in ${property.locality} - ₹${Math.round(property.rent / 100000)}L | Rent Lessly`;
    const description = `Find a ${property.bhk} BHK ${property.furnishedType} property in ${property.locality}, ${property.city}. Rent: ₹${property.rent.toLocaleString('en-IN')}/month, Area: ${property.area} sq.ft. Schedule a visit today!`;

    return {
      title,
      description,
      keywords: [
        `${property.bhk} BHK in ${property.locality}`,
        `Rental in ${property.locality}`,
        `Apartments in ${property.city}`,
        'Property for rent',
      ],
      openGraph: {
        title,
        description,
        type: 'website',
        images: [property.images?.[0]?.url || '/og-image.jpg'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [property.images?.[0]?.url || '/og-image.jpg'],
      },
      canonical: `https://rentlessly.app/property/${slug}`,
    };
  } catch (error) {
    return {
      title: 'Property Not Found | Rent Lessly',
      description: 'The property you are looking for was not found.',
    };
  }
}
