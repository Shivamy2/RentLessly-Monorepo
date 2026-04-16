/**
 * HowItWorks Component
 * MUI step-by-step guide with horizontal arrows for desktop
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const steps = [
  {
    step: 1,
    title: 'Search Properties',
    description: 'Browse trusted rentals in your preferred area',
    icon: <SearchIcon sx={{ fontSize: 28 }} />,
  },
  {
    step: 2,
    title: 'Schedule Visit',
    description: 'Book a slot to visit shortlisted properties',
    icon: <EventIcon sx={{ fontSize: 28 }} />,
  },
  {
    step: 3,
    title: 'Meet Authorized Person',
    description: 'Authorized person will assist you during the visit',
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
  },
  {
    step: 4,
    title: 'Move In',
    description: 'Finalize and move in hassle-free',
    icon: <HomeIcon sx={{ fontSize: 28 }} />,
  },
];

function StepCard({ item, isLast }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
      }}
    >
      {/* Step Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
          position: 'relative',
        }}
      >
        {/* Step Number Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: { xs: '30%', md: '25%' },
            width: 24,
            height: 24,
            bgcolor: 'secondary.main',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          {item.step}
        </Box>

        {/* Icon Circle */}
        <Box
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1)',
            },
          }}
        >
          {item.icon}
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            mb: 0.5,
            color: 'text.primary',
            fontSize: { xs: '0.95rem', md: '1rem' },
          }}
        >
          {item.title}
        </Typography>

        {/* Description - Desktop only */}
        <Typography
          variant="body2"
          color="grey.600"
          sx={{
            display: { xs: 'none', lg: 'block' },
            maxWidth: 160,
            lineHeight: 1.5,
            fontSize: '0.8rem',
          }}
        >
          {item.description}
        </Typography>
      </Box>

      {/* Arrow - Desktop only, not on last item */}
      {!isLast && (
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            px: 2,
            color: 'secondary.main',
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 28 }} />
        </Box>
      )}
    </Box>
  );
}

export function HowItWorks() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Chip
            label="Simple Process"
            size="small"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            How It Works
          </Typography>
          <Typography color="grey.600" sx={{ maxWidth: 500, mx: 'auto' }}>
            Find your dream rental home in 4 simple steps
          </Typography>
        </Box>

        {/* Desktop: Single Row with Arrows */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            py: 4,
            px: 2,
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {steps.map((item, index) => (
            <StepCard key={index} item={item} isLast={index === steps.length - 1} />
          ))}
        </Box>

        {/* Mobile: Vertical Timeline */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {steps.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                mb: index < steps.length - 1 ? 3 : 0,
                position: 'relative',
              }}
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 27,
                    top: 56,
                    width: 2,
                    height: 'calc(100% + 12px)',
                    bgcolor: 'grey.200',
                  }}
                />
              )}

              {/* Icon */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {item.icon}
                {/* Step badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {item.step}
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ pt: 0.5 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="grey.600" sx={{ lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
