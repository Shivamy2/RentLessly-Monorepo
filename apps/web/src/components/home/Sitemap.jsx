/**
 * Sitemap Component
 * SEO-friendly keyword links for property searches
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Helper function to generate search URL from text
 * Extracts BHK, location, budget, furnished status from the text
 */
function generateSearchUrl(text) {
  const params = new URLSearchParams();
  
  // Add the full search query
  params.set('q', text);
  
  // Extract BHK
  const bhkMatch = text.match(/(\d)\s*BHK/i);
  if (bhkMatch) {
    params.set('bhk', bhkMatch[1]);
  }
  
  // Extract budget (Under XXXXX)
  const budgetMatch = text.match(/under\s*₹?(\d+)k?/i);
  if (budgetMatch) {
    let maxRent = budgetMatch[1];
    // Convert K to actual number
    if (text.toLowerCase().includes('k')) {
      maxRent = parseInt(maxRent) * 1000;
    }
    params.set('maxRent', maxRent);
  }
  
  // Extract furnished status
  if (text.toLowerCase().includes('fully furnished')) {
    params.set('furnished', 'fully');
  } else if (text.toLowerCase().includes('semi furnished')) {
    params.set('furnished', 'semi');
  }
  
  return `/properties?${params.toString()}`;
}

// All sitemap items organized by category
const sitemapCategories = [
  {
    title: 'Popular Searches',
    items: [
      '1 BHK flat near Huda City Centre Metro',
      '2 BHK flat in Gurgaon',
      '2 BHK fully furnished flat',
      '3 BHK flats in Gurgaon',
      '2 BHK semi furnished flat',
      '3 BHK semi furnished flat',
      '2 BHK independent flats',
    ],
  },
  {
    title: 'Near Tech Parks',
    items: [
      '2 BHK near Unitech Cyber Park',
      '3 BHK near Unitech Cyber Park',
      'Flats near World Tech Park',
      '2 BHK near World Tech Park',
      'Flats near Signature Tower',
      '2 BHK near Candor TechSpace',
    ],
  },
  {
    title: 'Palam Vihar',
    items: [
      '1 BHK Palam Vihar Under ₹18K',
      '2 BHK Palam Vihar Under ₹20K',
      '3 BHK Palam Vihar Under ₹25K',
      '1 BHK C Block Park Under ₹18K',
      '2 BHK Spanish Court Under ₹22K',
      '3 BHK Shiksha Bharti School',
    ],
  },
  {
    title: 'Savoy Suites Area',
    items: [
      '1 BHK Savoy Suites Gurgaon',
      '2 BHK Savoy Suites Gurgaon',
      '3 BHK Savoy Suites Gurgaon',
      '1 BHK Treebo Sai Village',
      '2 BHK Treebo Sai Village',
      '3 BHK Treebo Sai Village',
    ],
  },
  {
    title: 'Budget Friendly',
    items: [
      '1 BHK Under ₹15,000',
      '2 BHK Under ₹20,000',
      '3 BHK Under ₹25,000',
      '1 BHK near Metro Under ₹15K',
      '2 BHK Furnished Under ₹22K',
      '3 BHK near Cosco India',
    ],
  },
];

// Additional items for expanded view
const moreItems = [
  '1 BHK FabExpress Next Home',
  '2 BHK FabExpress Next Home',
  '1 BHK Shiv Murti Gurugram',
  '2 BHK Shiv Murti Gurugram',
  '1 BHK Osho Farm Gurugram',
  '2 BHK Osho Farm Gurugram',
  '1 BHK Axis Bank Branch area',
  '2 BHK Axis Bank Branch area',
  '1 BHK Vyapar Kendra Gurugram',
  '2 BHK Vyapar Kendra Gurugram',
  '1 BHK Kids Habitat Under ₹18K',
  '2 BHK Kids Habitat Under ₹25K',
  '1 BHK MMA Club Under ₹15K',
  '2 BHK MMA Club Under ₹19K',
  '1 BHK JBL Store Under ₹15K',
  '2 BHK JBL Store Under ₹20K',
];

export function Sitemap() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'grey.100',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 1, color: 'text.primary' }}
          >
            Flats for Rent in Gurgaon
          </Typography>
          <Typography variant="body2" color="grey.600">
            Explore popular rental searches in Gurugram
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 3,
          }}
        >
          {sitemapCategories.map((category, catIndex) => (
            <Box key={catIndex}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{
                  color: 'primary.main',
                  mb: 1.5,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {category.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {category.items.map((item, index) => (
                  <Link
                    key={index}
                    href={generateSearchUrl(item)}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        color: 'grey.700',
                        lineHeight: 1.5,
                        '&:hover': {
                          color: 'secondary.main',
                        },
                        transition: 'color 0.2s',
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* More Links - Expandable */}
        {expanded && (
          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'grey.100' }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ color: 'grey.800', mb: 2 }}
            >
              More Searches
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {moreItems.map((item, index) => (
                <Link
                  key={index}
                  href={generateSearchUrl(item)}
                  style={{ textDecoration: 'none' }}
                >
                  <Chip
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.75rem',
                      color: 'grey.700',
                      borderColor: 'grey.300',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        bgcolor: 'primary.50',
                      },
                      transition: 'all 0.2s',
                    }}
                  />
                </Link>
              ))}
            </Box>
          </Box>
        )}

        {/* Show More/Less Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{
              color: 'primary.main',
              fontSize: '0.85rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'primary.50',
              },
            }}
          >
            {expanded ? 'Show Less' : 'View More Searches'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
