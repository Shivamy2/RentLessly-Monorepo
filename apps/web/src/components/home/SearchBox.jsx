'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';

/**
 * SearchBox Component
 * Property search form with MUI components
 */
export function SearchBox() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [city, setCity] = useState('gurugram');
  const [locality, setLocality] = useState('');
  const [bhk, setBhk] = useState('2');

  const cities = [
    { value: 'gurugram', label: 'Gurugram' }
  ];

  const bhkOptions = [
    { value: '0', label: '1 RK' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality) params.set('q', locality);
    if (bhk) params.set('bhk', bhk);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={6}
      sx={{
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
        p: { xs: 2, md: 3 },
        borderRadius: 0,
      }}
    >
      {/* Search Fields - Desktop Layout */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          gap: 2,
          alignItems: 'flex-end',
        }}
      >
        {/* City Select - Disabled */}
        <FormControl sx={{ minWidth: 160 }} size="medium" disabled>
          <InputLabel>City</InputLabel>
          <Select
            value={city}
            label="City"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: 0,
              '& .MuiSelect-select': {
                textAlign: 'left',
              },
            }}
          >
            {cities.map((c) => (
              <MenuItem key={c.value} value={c.value} sx={{ justifyContent: 'flex-start' }}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Locality Input */}
        <TextField
          fullWidth
          placeholder="Search locality, sector or landmark..."
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
            },
          }}
        />

        {/* Flat Type Select */}
        <FormControl sx={{ minWidth: 140 }} size="medium">
          <InputLabel>Flat Type</InputLabel>
          <Select
            value={bhk}
            label="Flat Type"
            onChange={(e) => setBhk(e.target.value || "")}
            startAdornment={
              <InputAdornment position="start">
                <HomeIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: 0,
              '& .MuiSelect-select': {
                textAlign: 'left',
              },
            }}
          >
            {bhkOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ justifyContent: 'flex-start' }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<SearchIcon />}
          sx={{
            minWidth: 140,
            py: 1.8,
            fontWeight: 600,
            borderRadius: 0,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Search Fields - Mobile Layout (Search first, then City, then Flat Type) */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Locality Input - First on mobile */}
        <TextField
          fullWidth
          placeholder="Search locality, sector or landmark..."
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
            },
          }}
        />

        {/* City Select - Disabled */}
        <FormControl fullWidth size="medium" disabled>
          <InputLabel>City</InputLabel>
          <Select
            value={city}
            label="City"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: 0,
              '& .MuiSelect-select': {
                textAlign: 'left',
              },
            }}
          >
            {cities.map((c) => (
              <MenuItem key={c.value} value={c.value} sx={{ justifyContent: 'flex-start' }}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Flat Type Select */}
        <FormControl fullWidth size="medium">
          <InputLabel>Flat Type</InputLabel>
          <Select
            value={bhk}
            label="Flat Type"
            onChange={(e) => setBhk(e.target.value || "")}
            startAdornment={
              <InputAdornment position="start">
                <HomeIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            }
            sx={{
              borderRadius: 0,
              '& .MuiSelect-select': {
                textAlign: 'left',
              },
            }}
          >
            {bhkOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ justifyContent: 'flex-start' }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<SearchIcon />}
          sx={{
            width: '100%',
            py: 1.8,
            fontWeight: 600,
            borderRadius: 0,
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
}
