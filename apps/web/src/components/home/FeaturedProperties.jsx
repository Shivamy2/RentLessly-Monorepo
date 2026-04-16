/**
 * FeaturedProperties Component
 * MUI Grid of featured rental properties
 */

'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { PropertyCard } from '../property/PropertyCard';

// Mock featured properties data
const FEATURED_PROPERTIES = [
  {
    id: 1,
    slug: '3bhk-luxury-apartment-golf-course-road',
    images: [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' }],
    rent: 45000,
    bhk: 3,
    locality: 'Golf Course Road, Gurugram',
    area: 1800,
    furnishedType: 'FULLY_FURNISHED',
  },
  {
    id: 2,
    slug: '2bhk-modern-flat-sector-54',
    images: [{ url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' }],
    rent: 28000,
    bhk: 2,
    locality: 'Sector 54, Gurugram',
    area: 1200,
    furnishedType: 'SEMI_FURNISHED',
  },
  {
    id: 3,
    slug: '1bhk-studio-mg-road',
    images: [{ url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80' }],
    rent: 18000,
    bhk: 1,
    locality: 'MG Road, Gurugram',
    area: 650,
    furnishedType: 'FURNISHED',
  },
  {
    id: 4,
    slug: '4bhk-penthouse-dlf-phase-2',
    images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' }],
    rent: 85000,
    bhk: 4,
    locality: 'DLF Phase 2, Gurugram',
    area: 2800,
    furnishedType: 'FULLY_FURNISHED',
  },
  {
    id: 5,
    slug: '2bhk-apartment-cyber-city',
    images: [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' }],
    rent: 32000,
    bhk: 2,
    locality: 'Cyber City, Gurugram',
    area: 1350,
    furnishedType: 'FULLY_FURNISHED',
  },
  {
    id: 6,
    slug: '3bhk-family-home-sector-57',
    images: [{ url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' }],
    rent: 38000,
    bhk: 3,
    locality: 'Sector 57, Gurugram',
    area: 1650,
    furnishedType: 'SEMI_FURNISHED',
  },
];

export function FeaturedProperties() {
  const handleSaveProperty = (propertyId) => {
    console.log('Save property:', propertyId);
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          spacing={2}
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Box>
            <Chip
              icon={<WhatshotIcon sx={{ fontSize: 16 }} />}
              label="Hot Properties"
              size="small"
              sx={{
                bgcolor: 'primary.light',
                color: 'white',
                fontWeight: 500,
                mb: 1.5,
              }}
            />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Featured Rentals
            </Typography>
            <Typography color="grey.600" sx={{ maxWidth: 400 }}>
              Hand-picked properties from verified owners with no brokerage fee
            </Typography>
          </Box>

          <Link href="/properties" style={{ textDecoration: 'none' }}>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                fontWeight: 600,
              }}
            >
              View All Properties
            </Button>
          </Link>
        </Stack>

        {/* Property Grid */}
        <Grid container spacing={3}>
          {FEATURED_PROPERTIES.map((property) => (
            <Grid item xs={12} sm={6} lg={4} key={property.id}>
              <PropertyCard
                property={property}
                onSave={handleSaveProperty}
                isSaved={false}
              />
            </Grid>
          ))}
        </Grid>

        {/* Mobile View All Button */}
        <Box sx={{ mt: 4, textAlign: 'center', display: { md: 'none' } }}>
          <Link href="/properties" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              View All Properties
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
