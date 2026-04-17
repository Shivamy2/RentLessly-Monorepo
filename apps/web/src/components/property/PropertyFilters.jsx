/**
 * PropertyFilters Component
 * Housing.com / NoBroker inspired filter panel
 */
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const bhkOptions = [
  { value: '0', label: '1 RK' },
  { value: '1', label: '1 BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '3+ BHK' },
];

const furnishedOptions = [
  { value: 'fully', label: 'Fully' },
  { value: 'semi', label: 'Semi' },
  { value: 'unfurnished', label: 'Unfurnished' },
];

const locationSuggestions = [
  { name: 'Sector 45', area: 'Gurugram, Haryana' },
  { name: 'Sector 56', area: 'Gurgaon, Haryana' },
  { name: 'Sector 62', area: 'Gurugram, Haryana' },
  { name: 'DLF Phase 1', area: 'Gurugram, Haryana' },
  { name: 'DLF Phase 2', area: 'Gurugram, Haryana' },
  { name: 'DLF Phase 3', area: 'Gurugram, Haryana' },
  { name: 'DLF Phase 4', area: 'Gurugram, Haryana' },
  { name: 'DLF Phase 5', area: 'Gurugram, Haryana' },
  { name: 'Palam Vihar', area: 'Gurgaon, Haryana' },
  { name: 'Sohna Road', area: 'Gurugram, Haryana' },
  { name: 'Golf Course Road', area: 'Gurugram, Haryana' },
  { name: 'MG Road', area: 'Gurugram, Haryana' },
  { name: 'Huda City Centre', area: 'Gurugram, Haryana' },
  { name: 'Sector 14', area: 'Gurgaon, Haryana' },
  { name: 'Sector 15', area: 'Gurgaon, Haryana' },
  { name: 'Sector 22', area: 'Gurgaon, Haryana' },
  { name: 'Sector 29', area: 'Gurugram, Haryana' },
  { name: 'Sector 40', area: 'Gurugram, Haryana' },
  { name: 'Sector 49', area: 'Gurugram, Haryana' },
  { name: 'Sector 50', area: 'Gurugram, Haryana' },
  { name: 'Sector 51', area: 'Gurugram, Haryana' },
  { name: 'Sector 53', area: 'Gurugram, Haryana' },
  { name: 'Sector 57', area: 'Gurugram, Haryana' },
  { name: 'Sector 82', area: 'Gurugram, Haryana' },
  { name: 'Sector 102', area: 'Gurgaon, Haryana' },
  { name: 'South City 1', area: 'Gurugram, Haryana' },
  { name: 'Nirvana Country', area: 'Gurugram, Haryana' },
  { name: 'Sushant Lok', area: 'Gurugram, Haryana' },
];

const MIN_RENT = 1000;
const MAX_RENT = 10000000;

const toSlider = (rent) => {
  const minLog = Math.log(MIN_RENT);
  const maxLog = Math.log(MAX_RENT);
  return Math.round(((Math.log(Math.max(rent, MIN_RENT)) - minLog) / (maxLog - minLog)) * 100);
};

const fromSlider = (pos) => {
  const minLog = Math.log(MIN_RENT);
  const maxLog = Math.log(MAX_RENT);
  return Math.round(Math.exp(minLog + (pos / 100) * (maxLog - minLog)));
};

const formatRentDisplay = (value) => {
  if (value >= 10000000) return '₹1Cr';
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

// Shared chip style
const chipSx = (active) => ({
  fontWeight: 600,
  fontSize: '0.78rem',
  height: 32,
  px: 0.5,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  bgcolor: active ? 'primary.main' : 'white',
  color: active ? 'white' : 'text.primary',
  border: '1.5px solid',
  borderColor: active ? 'primary.main' : 'grey.300',
  '&:hover': {
    bgcolor: active ? 'primary.dark' : 'grey.50',
    borderColor: active ? 'primary.dark' : 'primary.light',
  },
});

export function PropertyFilters({ filters, onFilterChange }) {
  const [sliderPos, setSliderPos] = useState([
    toSlider(filters.minRent || MIN_RENT),
    toSlider(filters.maxRent || MAX_RENT),
  ]);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedLocations = filters.search
    ? filters.search.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    setSliderPos([
      toSlider(filters.minRent || MIN_RENT),
      toSlider(filters.maxRent || MAX_RENT),
    ]);
  }, [filters.minRent, filters.maxRent]);

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const addLocation = (name) => {
    if (selectedLocations.length >= 3) return; // max 3
    if (!selectedLocations.includes(name)) {
      handleChange('search', [...selectedLocations, name].join(', '));
    }
    setSearchInput('');
    setShowSuggestions(false);
  };

  const removeLocation = (name) => {
    handleChange('search', selectedLocations.filter((l) => l !== name).join(', '));
  };

  const filteredSuggestions = locationSuggestions.filter(
    (loc) =>
      !selectedLocations.includes(loc.name) &&
      loc.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleReset = () => {
    setSliderPos([0, 100]);
    onFilterChange({
      ...filters,
      search: filters.search, // preserve location
      bhk: [],
      minRent: MIN_RENT,
      maxRent: MAX_RENT,
      furnished: [],
      parking: false,
      powerBackup: false,
    });
  };

  // Toggle value in array for multi-select
  const toggleArrayValue = (field, value) => {
    const current = filters[field] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    handleChange(field, updated);
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        border: '1px solid',
        borderColor: 'grey.200',
        position: 'sticky',
        top: 80,
        overflow: 'visible',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.5, pt: 2, pb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Filters
        </Typography>
        <Button
          size="small"
          startIcon={<RestartAltIcon sx={{ fontSize: 14 }} />}
          onClick={handleReset}
          sx={{
            fontSize: '0.72rem',
            color: 'grey.500',
            fontWeight: 500,
            textTransform: 'none',
            minWidth: 'auto',
            p: 0,
            mr: 0,
            '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
          }}
        >
          Reset
        </Button>
      </Box>

      <Divider />

      {/* Location Search */}
      <Box sx={{ px: 2.5, py: 2, position: 'relative' }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.68rem' }}>
          Location
        </Typography>

        {/* Selected chips */}
        {selectedLocations.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
            {selectedLocations.map((loc) => (
              <Chip
                key={loc}
                label={loc}
                size="small"
                onDelete={() => removeLocation(loc)}
                deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 28,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'rgba(255,255,255,0.6)',
                    '&:hover': { color: 'white' },
                  },
                }}
              />
            ))}
          </Stack>
        )}

        <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
          <Box>
            <TextField
              fullWidth
              size="small"
              placeholder={
                selectedLocations.length >= 3
                  ? 'Max 3 locations selected'
                  : `Search upto ${3 - selectedLocations.length} localities or landmarks`
              }
              value={searchInput}
              disabled={selectedLocations.length >= 3}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchInput.trim()) {
                  e.preventDefault();
                  addLocation(searchInput.trim());
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: 'grey.400' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.50',
                  fontSize: '0.82rem',
                },
              }}
            />

            {/* Suggestions - vertical list like Housing.com */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <Paper
                elevation={6}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  mt: 0.5,
                  zIndex: 20,
                  maxHeight: 260,
                  overflow: 'auto',
                  borderTop: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                <List dense disablePadding>
                  {filteredSuggestions.slice(0, 6).map((loc) => (
                    <ListItemButton
                      key={loc.name}
                      onClick={() => addLocation(loc.name)}
                      sx={{
                        py: 1,
                        px: 2,
                        '&:hover': { bgcolor: 'grey.50' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'grey.500' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={loc.name}
                        secondary={`${loc.area}, India`}
                        primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
                        secondaryTypographyProps={{ fontSize: '0.72rem', color: 'grey.500' }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </ClickAwayListener>
      </Box>

      <Divider />

      {/* BHK Type */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.68rem' }}>
          BHK Type
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {bhkOptions.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              onClick={() => toggleArrayValue('bhk', opt.value)}
              sx={chipSx((filters.bhk || []).includes(opt.value))}
            />
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Furnishing */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.68rem' }}>
          Furnishing
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {furnishedOptions.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              onClick={() => toggleArrayValue('furnished', opt.value)}
              sx={chipSx((filters.furnished || []).includes(opt.value))}
            />
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Monthly Rent */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.68rem', lineHeight: 1 }}>
            Monthly Rent
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: '0.88rem', lineHeight: 1 }}>
            {formatRentDisplay(fromSlider(sliderPos[0]))} – {formatRentDisplay(fromSlider(sliderPos[1]))}
          </Typography>
        </Box>
        <Box sx={{ px: 0.5 }}>
          <Slider
            value={sliderPos}
            onChange={(e, v) => setSliderPos(v)}
            onChangeCommitted={(e, v) =>
              onFilterChange({ ...filters, minRent: fromSlider(v[0]), maxRent: fromSlider(v[1]) })
            }
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => formatRentDisplay(fromSlider(v))}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                bgcolor: 'white',
                border: '2.5px solid currentColor',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 6px rgba(26, 82, 118, 0.1)',
                },
              },
              '& .MuiSlider-track': { height: 4, borderRadius: 2 },
              '& .MuiSlider-rail': { height: 4, borderRadius: 2, bgcolor: 'grey.200' },
              '& .MuiSlider-valueLabel': { bgcolor: 'primary.main', fontSize: '0.7rem', fontWeight: 600 },
            }}
          />
        </Box>
        {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: -0.5 }}>
          <Typography variant="caption" color="grey.400" fontSize="0.62rem">₹1K</Typography>
          <Typography variant="caption" color="grey.400" fontSize="0.62rem">₹10L</Typography>
          <Typography variant="caption" color="grey.400" fontSize="0.62rem">₹1Cr</Typography>
        </Stack> */}
      </Box>

      <Divider />

      {/* Amenities */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.68rem' }}>
          Amenities
        </Typography>
        <Stack direction="row" gap={1}>
          <Chip
            label="Parking"
            size="small"
            onClick={() => handleChange('parking', !filters.parking)}
            sx={chipSx(filters.parking)}
          />
          <Chip
            label="Power Backup"
            size="small"
            onClick={() => handleChange('powerBackup', !filters.powerBackup)}
            sx={chipSx(filters.powerBackup)}
          />
        </Stack>
      </Box>
    </Box>
  );
}
