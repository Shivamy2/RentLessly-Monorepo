import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 * Footer Component
 * Compact modern footer
 */
const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: { xs: 3, md: 4 },
        textAlign: 'center',
      }}
    >
      {/* Quick Links - centered */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 2, md: 3 }, mb: 2 }}>
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.8rem',
                '&:hover': { color: 'white' },
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </Typography>
          </Link>
        ))}
      </Box>

      {/* Social Icons - centered */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
        <IconButton
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            '&:hover': { color: 'secondary.main' },
          }}
          aria-label="Twitter"
        >
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            '&:hover': { color: 'secondary.main' },
          }}
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            '&:hover': { color: 'secondary.main' },
          }}
          aria-label="LinkedIn"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Copyright - centered */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 0.5,
          pt: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          mx: 'auto',
          maxWidth: 600,
        }}
      >
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} RentLessly
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          •
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
          Made with
        </Typography>
        <FavoriteIcon sx={{ fontSize: 10, color: 'secondary.main' }} />
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
          in Gurugram
        </Typography>
      </Box>
    </Box>
  );
}
