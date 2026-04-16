'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { MobileMenu } from './MobileMenu';

/**
 * Header Component
 * MUI AppBar with responsive navigation
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    // { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: { xs: 64, md: 80 } }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Logo icon for both mobile and desktop */}
              <Image
                src="/logo-icon.png"
                alt="Rent Lessly"
                width={44}
                height={44}
                priority
                style={{ objectFit: 'contain' }}
              />
              {/* Text logo - shown on both mobile and desktop */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Rent
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 700,
                    color: 'secondary.main',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Lessly
                </Typography>
              </Box>
            </Link>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'grey.600',
                      '&:hover': { color: 'primary.main' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>

            {/* Desktop CTA */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, ml: 4 }}>
              <Link href="/saved" style={{ textDecoration: 'none' }}>
                <Button 
                  startIcon={<FavoriteIcon />}
                  sx={{ color: 'grey.700' }}
                >
                  Saved
                </Button>
              </Link>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  Login/Signup
                </Button>
              </Link>
            </Box>

            {/* Mobile Menu Toggle */}
            <IconButton
              sx={{ display: { md: 'none' }, color: 'grey.600' }}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
