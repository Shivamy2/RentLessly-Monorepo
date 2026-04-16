'use client';

import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

/**
 * MobileMenu Component
 * MUI Drawer for mobile navigation
 */
const navIcons = {
  '/': <HomeIcon />,
  '/properties': <ApartmentIcon />,
  '/about': <InfoIcon />,
  '/contact': <ContactMailIcon />,
};

export function MobileMenu({ isOpen, onClose, navLinks }) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        display: { md: 'none' },
        '& .MuiDrawer-paper': {
          width: '80%',
          maxWidth: 360,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'grey.200',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
                R
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, color: 'primary.dark' }}>Rent</Typography>
            <Typography sx={{ fontWeight: 600, color: 'grey.600' }}>Lessly</Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation Links */}
        <List sx={{ flex: 1, py: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <Link href={link.href} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                <ListItemButton sx={{ py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: 'grey.600' }}>
                    {navIcons[link.href] || <HomeIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: 'grey.800',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <Link href="/saved" style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
              <ListItemButton sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40, color: 'secondary.main' }}>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Saved Properties"
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'grey.800',
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'grey.200' }}>
          <Link href="/login" style={{ textDecoration: 'none' }} onClick={onClose}>
            <Button variant="contained" color="primary" fullWidth size="large">
              Login / Sign Up
            </Button>
          </Link>``
          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'grey.500' }}
          >
            Rent it effortlessly
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
