import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1FCB4F', // Keep the teal accent
        },
        secondary: {
            main: '#FFC01E', // Purple accent from the dashboard
        },
        background: {
            default: '#1A1C22', // Main dark background
            paper: '#282C35',   // Card/surface background
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.6)',
        },
        success: {
            main: '#1FCB4F', // Bright green for positive values
        },
        warning: {
            main: '#FFC01E', // Amber for warnings
        },
        error: {
            main: '#FFC01E', // Red for negative values
        },
        info: {
            main: '#3B82F6', // Blue for info
        },
        divider: 'rgba(255, 255, 255, 0.08)',
        // Custom colors for the dashboard
        action: {
            hover: 'rgba(255, 255, 255, 0.04)',
            selected: 'rgba(255, 255, 255, 0.08)',
            disabled: 'rgba(255, 255, 255, 0.26)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        }
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 500,
        },
        subtitle2: {
            fontWeight: 500,
        },
        body1: {
            fontSize: '0.875rem',
        },
        body2: {
            fontSize: '0.75rem',
        }
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded square
                },
            },
        },

    },
});