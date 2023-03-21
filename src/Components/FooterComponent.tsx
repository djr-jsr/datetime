import { FC } from 'react';
import { Box, IconButton } from '@mui/material';
import { Feedback } from '@mui/icons-material';

const FooterComponent: FC = () => {

    return (
        <Box
            sx={{
                height: '3vh',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1
            }}
        >
            <IconButton size='large' color='inherit' onClick={() => window.open('https://forms.gle/UND2VRswAZjY1BqB8', '_blank')}>
                <Feedback fontSize='large' />
            </IconButton>
        </Box>
    );
};

export default FooterComponent;