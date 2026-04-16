/**
 * PropertyCard Component
 * MUI Card for displaying property in grid/list views
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import WeekendIcon from '@mui/icons-material/Weekend';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function PropertyCard({ property, onSave, isSaved = false }) {
  const thumbnailUrl = property?.images?.[0]?.url || '/placeholder-property.jpg';
  const rent = property?.rent || 0;
  const bhk = property?.bhk || 2;
  const locality = property?.locality || 'Gurugram';
  const area = property?.area || 1000;
  const furnishedType = property?.furnishedType || 'SEMI_FURNISHED';
  const slug = property?.slug || 'property';

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(property?.id);
  };

  const formatRent = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <Link href={`/property/${slug}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
          '&:hover .property-image': {
            transform: 'scale(1.05)',
          },
          '&:hover .view-details': {
            color: 'primary.main',
          },
        }}
      >
        {/* Image Container */}
        <Box sx={{ position: 'relative', height: { xs: 192, md: 208 }, overflow: 'hidden' }}>
          <Box
            className="property-image"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.5s ease',
            }}
          >
            <Image
              src={thumbnailUrl}
              alt={`${bhk} BHK in ${locality}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Box>

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
            }}
          />

          {/* Price Badge */}
          <Chip
            label={`${formatRent(rent)}/mo`}
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          />

          {/* Verified Badge */}
          <Chip
            icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
            label="Verified"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'rgba(255,255,255,0.9)',
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />

          {/* Save Button */}
          <IconButton
            onClick={handleSave}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: isSaved ? 'secondary.main' : 'rgba(255,255,255,0.9)',
              color: isSaved ? 'white' : 'grey.600',
              '&:hover': {
                bgcolor: isSaved ? 'secondary.dark' : 'white',
                color: isSaved ? 'white' : 'secondary.main',
              },
            }}
            aria-label="Save property"
          >
            {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 2 }}>
          {/* Title */}
          <Typography
            variant="h6"
            className="view-details"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
          >
            {bhk} BHK Apartment
          </Typography>

          {/* Location */}
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5, color: 'grey.600' }}>
            <LocationOnIcon sx={{ fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {locality}
            </Typography>
          </Stack>

          {/* Features */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <SquareFootIcon sx={{ fontSize: 16, color: 'grey.500' }} />
              <Typography variant="body2" color="grey.700">
                {area.toLocaleString('en-IN')} sqft
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <WeekendIcon sx={{ fontSize: 16, color: 'grey.500' }} />
              <Typography variant="body2" color="grey.700" sx={{ textTransform: 'capitalize' }}>
                {furnishedType.replace(/_/g, ' ').toLowerCase()}
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 1.5 }} />

          {/* Footer */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="grey.500">
              Posted 2 days ago
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} className="view-details" sx={{ color: 'primary.main', transition: 'color 0.2s' }}>
              <Typography variant="body2" fontWeight={600}>
                View Details
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}