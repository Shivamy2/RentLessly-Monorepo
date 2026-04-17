/**
 * Home Page
 * Landing page for Rent Lessly
 */

import {
  Hero,
  StatsBar,
  // FeaturedProperties,
  HowItWorks,
  // Testimonials,
  // CTASection,
  Sitemap,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      {/* Hero with Search */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Trust Stats */}
      <StatsBar />

      {/* Featured Properties */}
      {/* <FeaturedProperties /> */}

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* CTA Section */}
      {/* <CTASection /> */}

      {/* Sitemap for SEO */}
      <Sitemap />
    </>
  );
}
