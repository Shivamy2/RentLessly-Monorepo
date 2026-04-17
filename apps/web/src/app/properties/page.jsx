/**
 * Properties Listing Page
 * Displays properties with filters
 */
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { PropertyListCard } from '@/components/property/PropertyListCard';
import { FullPageLoader } from '@/components/ui/FullPageLoader';

// Mock data - replace with API call
const mockProperties = [
  {
    id: 1,
    title: '2 BHK Flat in Sector 45',
    location: 'Sector 45, Gurugram',
    rent: 20000,
    deposit: 40000,
    bhk: 2,
    area: 1200,
    furnished: 'Semi Furnished',
    parking: true,
    powerBackup: true,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
  },
  {
    id: 2,
    title: '3 BHK Apartment in Palam Vihar',
    location: 'Palam Vihar, Gurugram',
    rent: 25000,
    deposit: 50000,
    bhk: 3,
    area: 1500,
    furnished: 'Fully Furnished',
    parking: true,
    powerBackup: true,
    negotiable: false,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
  },
  {
    id: 3,
    title: '1 BHK Studio near Metro',
    location: 'Huda City Centre, Gurugram',
    rent: 15000,
    deposit: 30000,
    bhk: 1,
    area: 600,
    furnished: 'Fully Furnished',
    parking: false,
    powerBackup: true,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
  },
  {
    id: 4,
    title: '2 BHK Independent Floor in DLF Phase 4',
    location: 'DLF Phase 4, Gurugram',
    rent: 22000,
    deposit: 44000,
    bhk: 2,
    area: 1100,
    furnished: 'Unfurnished',
    parking: true,
    powerBackup: true,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500',
  },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    bhk: searchParams.get('bhk') ? searchParams.get('bhk').split(',') : [],
    minRent: parseInt(searchParams.get('minRent')) || 1000,
    maxRent: parseInt(searchParams.get('maxRent')) || 10000000,
    furnished: [],
    parking: false,
    powerBackup: false,
  });
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);

  // Apply filters
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockProperties];

      if (filters.search) {
        const locations = filters.search.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
        filtered = filtered.filter((p) =>
          locations.some((loc) =>
            p.title.toLowerCase().includes(loc) ||
            p.location.toLowerCase().includes(loc)
          )
        );
      }

      if (filters.bhk && filters.bhk.length > 0) {
        filtered = filtered.filter((p) => filters.bhk.includes(String(p.bhk)));
      }

      if (filters.minRent) {
        filtered = filtered.filter((p) => p.rent >= parseInt(filters.minRent));
      }

      if (filters.maxRent) {
        filtered = filtered.filter((p) => p.rent <= parseInt(filters.maxRent));
      }

      if (filters.furnished && filters.furnished.length > 0) {
        filtered = filtered.filter((p) => {
          const propFurnish = p.furnished.toLowerCase();
          return filters.furnished.some((f) => propFurnish.includes(f.toLowerCase()));
        });
      }

      if (filters.parking) {
        filtered = filtered.filter((p) => p.parking);
      }

      if (filters.powerBackup) {
        filtered = filtered.filter((p) => p.powerBackup);
      }

      setProperties(filtered);
      setLoading(false);
    }, 300);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'boolean') return v;
    return v && v !== '';
  }).length;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', pt: 3, pb: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Flats for Rent in Gurugram
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="grey.600">
              {properties.length} properties found
            </Typography>
            {filters.search && (
              <Chip
                label={`Search: "${filters.search}"`}
                size="small"
                onDelete={() => handleFilterChange({ ...filters, search: '' })}
              />
            )}
            {/* Mobile Filter Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setMobileFiltersOpen(true)}
                size="small"
              >
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Desktop Filters - Left Sidebar */}
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
          </Grid>

          {/* Properties Grid */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <FullPageLoader text="" />
            ) : properties.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="grey.600" sx={{ mb: 2 }}>
                  No properties found
                </Typography>
                <Typography variant="body2" color="grey.500">
                  Try adjusting your filters
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {properties.map((property) => (
                  <PropertyListCard key={property.id} property={property} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            maxHeight: '85vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
            <IconButton size="small" onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => setMobileFiltersOpen(false)}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<FullPageLoader text="Loading properties..." />}>
      <PropertiesContent />
    </Suspense>
  );
}
