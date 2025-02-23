import { createTheme } from '@mui/material/styles';
import "@fontsource/outfit"
import colors from './colors';

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            contrastText: '#ffffff'
        },
        secondary: {
            main: colors.secondary,
            contrastText: '#ffffff'
        },
        tertiary: {
            main: colors.tertiary,
            contrastText: '#ffffff'
        },
        contrast: {
            main: colors.contrast,
            contrastText: '#ffffff'
        },
    },
    typography: {
        fontFamily: 'Outfit, sans-serif',
    },
})

export {theme}