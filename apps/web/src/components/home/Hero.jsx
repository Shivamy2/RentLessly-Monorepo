'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { SearchBox } from './SearchBox';

/**
 * Hero Component
 * Landing page hero with gradient background and search
 */
export function Hero() {
  const popularAreas = ['Sector 56', 'DLF Phase 3', 'Cyber City', 'Golf Course Road'];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A2239 0%, #0D2F4B 50%, #1A5276 100%)',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          left: 40,
          width: 288,
          height: 288,
          bgcolor: 'rgba(59, 130, 184, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          width: 384,
          height: 384,
          bgcolor: 'rgba(232, 100, 27, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 8, md: 12, lg: 16 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          {/* Badge */}
          {/* <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'secondary.main',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
                Trusted by 10,000+ renters in Gurugram
              </Box>
            }
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.875rem',
              height: 36,
              mb: 3,
              backdropFilter: 'blur(8px)',
            }}
          /> */}

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            RENT IT
            <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
              EFFORTLESSLY
            </Box>
          </Typography>

          {/* Subheadline */}
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: 'rgba(255,255,255,0.8)',
              mb: { xs: 4, md: 6 },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover trusted rental properties in Gurugram, no hassle — just your dream home.
          </Typography>

          {/* Search Box */}
          <SearchBox />

          {/* Quick Tags */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: { xs: 3, md: 4 }, gap: 1 }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              Popular:
            </Typography>
            {popularAreas.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Bottom Wave */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <path
            d="M0 50L60 45.7C120 41 240 33 360 35.3C480 38 600 51 720 55.8C840 61 960 56 1080 50C1200 44 1320 37 1380 33.5L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z"
            fill="#F8F9FA"
          />
        </svg>
      </Box>
    </Box>
  );
}
