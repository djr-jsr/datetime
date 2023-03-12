import { FC, useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { DateTime } from 'luxon';

const fontStyle = {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
};

const DateTimeComponent: FC = () => {

    const [dt, setDt] = useState(DateTime.local());

    useEffect(() => {
        const timer = setInterval(() => {
            setDt(DateTime.local());
        }, 500);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <>
            <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center', paddingBottom: '10vh' }}>
                <Grid container direction='column' alignItems='center' justifyItems='center' spacing={5}>
                    <Grid item>
                        <Typography sx={{ ...fontStyle }} variant='h3'>
                            {dt.toLocaleString(DateTime.DATE_HUGE)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...fontStyle }} variant='h3'>
                            {dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...fontStyle }} variant='h3'>
                            {dt.zoneName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ...fontStyle }} variant='h3'>
                            {dt.toUnixInteger()}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default DateTimeComponent;