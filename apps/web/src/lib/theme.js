/**
 * Material UI Theme Configuration
 * Brand colors and typography for Rent Lessly
 */

'use client';

import { createTheme } from '@mui/material/styles';

// Brand color palette
const palette = {
    primary: {
        main: '#1A5276',
        light: '#3B82B8',
        dark: '#0D2F4B',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#E8641B',
        light: '#FF9E3D',
        dark: '#C4520F',
        contrastText: '#FFFFFF',
    },
    success: {
        main: '#16A34A',
        light: '#22C55E',
        dark: '#15803D',
    },
    warning: {
        main: '#EAB308',
        light: '#FACC15',
        dark: '#CA8A04',
    },
    error: {
        main: '#DC2626',
        light: '#EF4444',
        dark: '#B91C1C',
    },
    info: {
        main: '#0EA5E9',
        light: '#38BDF8',
        dark: '#0284C7',
    },
    grey: {
        50: '#F8F9FA',
        100: '#F1F3F5',
        200: '#E9ECEF',
        300: '#DEE2E6',
        400: '#CED4DA',
        500: '#ADB5BD',
        600: '#6C757D',
        700: '#495057',
        800: '#343A40',
        900: '#212529',
    },
    background: {
        default: '#F8F9FA',
        paper: '#FFFFFF',
    },
    text: {
        primary: '#212529',
        secondary: '#6C757D',
    },
};

// Typography configuration
const typography = {
    fontFamily: '"Poppins", "DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
    },
    h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.3,
    },
    h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
    },
    h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
    },
    h5: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.5,
    },
    h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    body1: {
        fontFamily: '"DM Sans", "Poppins", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.6,
    },
    body2: {
        fontFamily: '"DM Sans", "Poppins", sans-serif',
        fontSize: '0.875rem',
        lineHeight: 1.6,
    },
    button: {
        fontWeight: 600,
        textTransform: 'none',
    },
};

// Component overrides
const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                padding: '10px 24px',
                fontWeight: 600,
            },
            contained: {
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(26, 82, 118, 0.25)',
                },
            },
            containedSecondary: {
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(232, 100, 27, 0.25)',
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                },
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                fontWeight: 500,
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#FFFFFF',
                color: '#212529',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                borderRadius: 0,
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRadius: 0,
            },
        },
    },
    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 0,
            },
        },
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                borderRadius: 0,
            },
        },
    },
    MuiPopover: {
        styleOverrides: {
            paper: {
                borderRadius: 0,
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
};

// Create theme
export const theme = createTheme({
    palette,
    typography,
    components,
    shape: {
        borderRadius: 0,
    },
});

export default theme;