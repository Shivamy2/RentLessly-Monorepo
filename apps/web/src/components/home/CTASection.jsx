/**
 * CTASection Component
 * MUI Call-to-action sections
 */
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const benefits = [
  'Zero Brokerage',
  'Verified Tenants',
  'List in 5 Minutes',
];

export function CTASection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Main CTA - List Your Property */}
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            mb: 4,
            background: 'linear-gradient(135deg, #1A5276 0%, #0D2F4B 100%)',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              left: -40,
              width: 128,
              height: 128,
              bgcolor: 'rgba(232, 100, 27, 0.2)',
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}
          />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ md: 'center' }}
            spacing={3}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box sx={{ maxWidth: 560 }}>
              <Chip
                label="For Property Owners"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                List Your Property for Free
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', mb: 3 }}>
                Join thousands of owners who found quality tenants without paying any brokerage. 
                Quick listing, verified tenants, hassle-free renting.
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={2}>
                {benefits.map((benefit) => (
                  <Stack key={benefit} direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem' }}>
                      {benefit}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Link href="/list-property" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.dark',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Post Property Free
                </Button>
              </Link>
              <Link href="/how-it-works" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Paper>

        {/* Secondary CTAs */}
        <Grid container spacing={3}>
          {/* For Tenants */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'grey.100',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: 'primary.light',
                    color: 'white',
                  }}
                >
                  <SearchIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                    Looking for a Rental?
                  </Typography>
                  <Typography variant="body2" color="grey.600" sx={{ mb: 1.5 }}>
                    Browse thousands of verified properties. No brokerage, no hassle.
                  </Typography>
                  <Link href="/properties" style={{ textDecoration: 'none' }}>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600, p: 0 }}
                    >
                      Start Searching
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* App Download */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'grey.900',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: 'secondary.main',
                    color: 'white',
                  }}
                >
                  <PhoneIphoneIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: 'white' }}>
                    Get the App
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5, color: 'grey.400' }}>
                    Search properties, schedule visits, and chat with owners on the go.
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AppleIcon />}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      App Store
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AndroidIcon />}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      Play Store
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
