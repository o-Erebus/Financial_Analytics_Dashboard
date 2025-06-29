import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#22C55E', // A vibrant green
        },
        background: {
            default: '#1A1C22', // Main dark background
            paper: '#282C35',   // Card/surface background
        },
        text: {
            primary: '#E5E7EB',
            secondary: '#9CA3AF',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                }
            }
        }
    },
});

export default theme;