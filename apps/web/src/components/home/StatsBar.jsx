/**
 * StatsBar Component
 * Compact trust indicators section
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const stats = [
  {
    value: '500+',
    label: 'Properties',
  },
  {
    value: '10+',
    label: 'Happy Renters',
  },
  {
    value: '50+',
    label: 'Verified Owners',
  },
  {
    value: '₹0',
    label: 'Platform Fee',
  },
];

export function StatsBar() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'primary.dark',
        py: { xs: 2.5, md: 3 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
          />
        }
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 6 }}
      >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center', px: { xs: 1, md: 2 } }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: 'secondary.main',
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: { xs: '0.65rem', md: '0.8rem' },
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
    </Box>
  );
}
