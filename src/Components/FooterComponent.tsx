import { FC } from 'react';
import { Box, Grid, IconButton, Theme, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { LIB_VERSION } from '../version';

const displayFontStyle = (_theme: Theme) => ({
    fontWeight: 'bold',
    input: { textAlign: 'center' }
});

const FooterComponent: FC = () => {

    return (
        <Box
            sx={{
                height: '3svh',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1
            }}
        >
            <Grid container direction='column' display='flex' alignItems='center' justifyItems='center' spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                <IconButton size='large' color='inherit' onClick={() => window.open('https://github.com/djr-jsr/datetime', '_blank')}>
                    <GitHub fontSize='large' />
                </IconButton>
                <Typography noWrap sx={displayFontStyle}>
                    {LIB_VERSION || '0.0.0'}
                </Typography>
            </Grid>
        </Box>
    );
};

export default FooterComponent;