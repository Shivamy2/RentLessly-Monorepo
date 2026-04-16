'use client';

/**
 * Input Component
 * MUI TextField wrapper with icon support
 */
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  label,
  error,
  helperText,
  fullWidth = true,
  ...props
}) {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant="outlined"
      size="medium"
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start" sx={{ color: 'grey.500' }}>
            {icon}
          </InputAdornment>
        ) : undefined,
      }}
      {...props}
    />
  );
}
