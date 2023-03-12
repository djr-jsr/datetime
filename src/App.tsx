import { createContext, useMemo } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useMediaQuery, CssBaseline } from '@mui/material';
import ModeSelectorComponent from './Components/ModeSelectorComponent';
import DateTime from './Components/DateTimeComponent';
import useLocalStorage from './Hooks/useLocalStorage';
import '@fontsource/poppins';

export const enum ThemeMode {
    'light' = 'light',
    'dark' = 'dark',
};

export const ColorModeContext = createContext(() => { });

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useLocalStorage('mode', prefersDarkMode ? ThemeMode.dark : ThemeMode.light);

    const toggleColorMode = () => {
        setMode((prevMode: string) => (prevMode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark));
    };

    const theme = useMemo(
        () => {
            var theme = createTheme({
                palette: {
                    mode: mode,
                },
            });
            return responsiveFontSizes(theme);
        },
        [mode],
    );

    return (
        <ColorModeContext.Provider value={toggleColorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ModeSelectorComponent />
                <DateTime />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
