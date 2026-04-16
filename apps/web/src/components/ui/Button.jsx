'use client';

/**
 * Button Component
 * MUI-based button with multiple variants
 */
import MuiButton from '@mui/material/Button';

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) {
  // Map our variants to MUI variants and colors
  const getMuiProps = () => {
    switch (variant) {
      case 'primary':
        return { variant: 'contained', color: 'primary' };
      case 'secondary':
        return { variant: 'contained', color: 'inherit' };
      case 'accent':
        return { variant: 'contained', color: 'secondary' };
      case 'outline':
        return { variant: 'outlined', color: 'primary' };
      case 'outline-white':
        return { 
          variant: 'outlined', 
          sx: { 
            borderColor: 'white', 
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'white',
              color: 'primary.dark',
            }
          }
        };
      case 'ghost':
        return { variant: 'text', color: 'inherit' };
      default:
        return { variant: 'contained', color: 'primary' };
    }
  };

  const muiProps = getMuiProps();

  return (
    <MuiButton
      size={size === 'md' ? 'medium' : size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      {...muiProps}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
