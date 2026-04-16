'use client';

/**
 * Select Component
 * MUI Select wrapper
 */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

export function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  label,
  icon,
  fullWidth = true,
  error,
  helperText,
  ...props
}) {
  return (
    <FormControl fullWidth={fullWidth} error={error}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        label={label}
        displayEmpty
        startAdornment={
          icon ? (
            <InputAdornment position="start" sx={{ color: 'grey.500' }}>
              {icon}
            </InputAdornment>
          ) : undefined
        }
        sx={{
          '& .MuiSelect-select': {
            textAlign: 'left',
          },
        }}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled sx={{ justifyContent: 'flex-start' }}>
            <span style={{ color: '#ADB5BD' }}>{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ justifyContent: 'flex-start' }}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
