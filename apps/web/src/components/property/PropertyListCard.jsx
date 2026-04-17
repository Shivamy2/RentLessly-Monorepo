/**
 * PropertyListCard Component
 * Horizontal card layout for property listings - one per line
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HomeIcon from '@mui/icons-material/Home';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import EventIcon from '@mui/icons-material/Event';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ScheduleVisitModal } from '@/components/ScheduleVisitModal';

export function PropertyListCard({ property, onSave, isSaved = false }) {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const thumbnailUrl = property?.images?.[0]?.url || property?.image || '/placeholder-property.jpg';
  const rent = property?.rent || 0;
  const bhk = property?.bhk || 2;
  const locality = property?.locality || property?.location || 'Gurugram';
  const area = property?.area || 1000;
  const furnishedType = property?.furnishedType || property?.furnished || 'Semi Furnished';
  const parking = property?.parking ?? true;
  const negotiable = property?.negotiable ?? true;
  const slug = property?.slug || property?.id || 'property';
  const title = property?.title || `${bhk} BHK Apartment`;

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(property?.id);
  };

  const handleScheduleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setScheduleModalOpen(true);
  };

  const formatRent = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: 280, md: 320 },
            minHeight: { xs: 200, sm: 'auto' },
            flexShrink: 0,
            overflow: 'hidden',
            alignSelf: 'stretch',
          }}
        >
          <Link href={`/property/${slug}`}>
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </Link>

          {/* Verified Badge */}
          <Chip
            icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
            label="Verified"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'rgba(255,255,255,0.95)',
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.7rem',
            }}
          />

          {/* Save Button */}
          <IconButton
            onClick={handleSave}
            size="small"
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
          >
            {isSaved ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Row - Title & Location */}
          <Box>
            <Link href={`/property/${slug}`} style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  mb: 0.5,
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {title}
              </Typography>
            </Link>

            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5, color: 'grey.600' }}>
              <LocationOnIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{locality}</Typography>
            </Stack>
          </Box>

          {/* Middle Row - Price & Tags */}
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap" sx={{ gap: 1 }}>
              {/* Rent */}
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {formatRent(rent)}/mo
              </Typography>

              {/* Negotiable Tag */}
              {negotiable && (
                <Chip
                  label="Negotiable"
                  size="small"
                  sx={{
                    bgcolor: 'success.50',
                    color: 'success.main',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                  }}
                />
              )}
            </Stack>
          </Box>

          {/* Features Row */}
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            sx={{ mb: 2, gap: 1 }}
          >
            {/* BHK */}
            <Chip
              icon={<HomeIcon sx={{ fontSize: 16 }} />}
              label={`${bhk} BHK`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />

            {/* Area */}
            <Chip
              icon={<SquareFootIcon sx={{ fontSize: 16 }} />}
              label={`${area.toLocaleString('en-IN')} sqft`}
              size="small"
              variant="outlined"
            />

            {/* Furnished */}
            <Chip
              label={typeof furnishedType === 'string' ? furnishedType.replace(/_/g, ' ') : 'Semi Furnished'}
              size="small"
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />

            {/* Parking */}
            {parking && (
              <Chip
                icon={<LocalParkingIcon sx={{ fontSize: 16 }} />}
                label="Parking"
                size="small"
                variant="outlined"
                sx={{ color: 'success.main', borderColor: 'success.main' }}
              />
            )}
          </Stack>

          {/* Action Row */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EventIcon />}
              onClick={handleScheduleClick}
              sx={{ fontWeight: 600 }}
            >
              Schedule Visit
            </Button>

            <Link href={`/property/${slug}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary">
                View Details
              </Button>
            </Link>
          </Stack>
        </Box>
      </Card>

      {/* Schedule Visit Modal */}
      {scheduleModalOpen && (
        <ScheduleVisitModal
          propertyId={property?.id}
          propertyTitle={title}
          onClose={() => setScheduleModalOpen(false)}
        />
      )}
    </>
  );
}
