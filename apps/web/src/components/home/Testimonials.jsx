/**
 * Testimonials Component
 * MUI social proof section with user reviews
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Tenant',
    location: 'Gurugram',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Found my perfect 2BHK in Cyber City within a week! No broker, no brokerage. The verification process gave me confidence that I was dealing with genuine owners.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Property Owner',
    location: 'Mumbai',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Listed my apartment and got quality tenant inquiries immediately. The platform filters out time-wasters. Rented out my property in just 10 days!',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Tenant',
    location: 'Bangalore',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
    text: 'The scheduling feature made it super easy to plan visits. I could see all property details before visiting. Saved thousands in brokerage fees!',
  },
];

const trustStats = [
  { value: '4.8', label: 'App Store Rating' },
  { value: '50K+', label: 'App Downloads' },
  { value: '4.9', label: 'Google Play Rating' },
];

export function Testimonials() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Chip
            label="Testimonials"
            size="small"
            sx={{
              bgcolor: 'secondary.light',
              color: 'white',
              fontWeight: 500,
              mb: 1.5,
            }}
          />
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1.5 }}>
            What Our Users Say
          </Typography>
          <Typography color="grey.600" sx={{ maxWidth: 400, mx: 'auto' }}>
            Join thousands of happy tenants and property owners who trust Rent Lessly
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Grid container spacing={3}>
          {TESTIMONIALS.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.100',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Rating */}
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{ color: 'secondary.main' }}
                  />

                  {/* Quote */}
                  <Box sx={{ position: 'relative', mt: 2 }}>
                    <FormatQuoteIcon
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        fontSize: 32,
                        color: 'primary.light',
                        opacity: 0.3,
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="grey.700"
                      sx={{ lineHeight: 1.7, fontStyle: 'italic' }}
                    >
                      "{testimonial.text}"
                    </Typography>
                  </Box>

                  {/* Author */}
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="grey.500">
                        {testimonial.role} • {testimonial.location}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trust Badges */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 4, md: 6 }}
          divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
          sx={{ mt: 6, opacity: 0.7 }}
        >
          {trustStats.map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="grey.800">
                {stat.value}
              </Typography>
              <Typography variant="caption" color="grey.500">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
