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
                height: '10svh',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1
            }}
        >
            <Grid container direction='column' display='flex' alignItems='center' justifyItems='center'>
                <Grid>
                    <IconButton size='large' color='inherit' onClick={() => window.open('https://github.com/djr-jsr/datetime', '_blank')}>
                        <GitHub fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid>
                    <Typography noWrap sx={displayFontStyle}>
                        {LIB_VERSION || '0.0.0'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FooterComponent;