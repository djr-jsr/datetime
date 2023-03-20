import { FC, useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext, ThemeMode } from '../App';

const ModeSelectorComponent: FC = () => {

    const theme = useTheme();
    const toggleColorMode = useContext(ColorModeContext);

    return (
        <Box
            sx={{
                height: '10vh',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1
            }}
        >
            <IconButton size='large' onClick={toggleColorMode} color='inherit'>
                {theme.palette.mode === ThemeMode.dark ? <Brightness7 fontSize='large' /> : <Brightness4 fontSize='large' />}
            </IconButton>
        </Box>
    );
};

export default ModeSelectorComponent;