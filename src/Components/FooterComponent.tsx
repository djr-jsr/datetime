import { FC } from 'react';
import { Box, IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';

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
            <IconButton size='large' color='inherit' onClick={() => window.open('https://github.com/djr-jsr/datetime', '_blank')}>
                <GitHub fontSize='large' />
            </IconButton>
        </Box>
    );
};

export default FooterComponent;