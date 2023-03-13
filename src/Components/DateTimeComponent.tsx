import { FC, useState, useEffect } from 'react';
import { Box, Typography, Grid, useTheme, FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText, Select, NativeSelect, MenuItem } from '@mui/material';
import { DateTime } from 'luxon';
import { Edit, Save, AccessTime, CalendarMonth } from '@mui/icons-material';
import { MobileTimePicker } from '@mui/x-date-pickers';

const fontStyle = {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    input: { textAlign: 'center' }
};

const labelStyle = {
    width: '100%',
    textAlign: 'center',
    transformOrigin: 'center'
};

const timezones = ((Intl as any).supportedValuesOf('timeZone') as string[]).sort();

const DateTimeComponent: FC = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [dt, setDt] = useState(DateTime.local());
    const theme = useTheme();

    useEffect(() => {
        if (isEdit) return;
        const timer = setInterval(() => {
            setDt(DateTime.local());
        }, 100);
        return () => {
            clearInterval(timer);
        }
    }, [isEdit]);

    return (
        <>
            <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center', paddingBottom: '10vh' }}>
                <Grid container direction='column' alignItems='center' justifyItems='center' spacing={5}>
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
                                    {dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={{ ...labelStyle }}>Date</InputLabel>
                                    <Input
                                        type='text'
                                        sx={{
                                            ...fontStyle,
                                            input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                        }}
                                        defaultValue={dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                                        endAdornment={
                                            <IconButton size='large' color='inherit'>
                                                <CalendarMonth fontSize='large' />
                                            </IconButton>
                                        } />
                                </FormControl>
                        }
                    </Grid>
                    <Grid item container justifyContent='center' alignItems='center' direction='row' spacing={2}>
                        <Grid item>
                            {
                                !isEdit ?
                                    <Typography sx={{ ...fontStyle }} variant='h3'>
                                        {dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                                    </Typography> :
                                    <FormControl variant='standard'>
                                        <InputLabel sx={{ ...labelStyle }}>Time</InputLabel>
                                        <Input
                                            type='text'
                                            sx={{
                                                ...fontStyle,
                                                input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                            }}
                                            defaultValue={dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                                            endAdornment={
                                                <IconButton size='large' color='inherit'>
                                                    <AccessTime fontSize='large' />
                                                </IconButton>
                                            } />
                                    </FormControl>
                            }
                        </Grid>
                        <Grid item>
                            {
                                !isEdit ?
                                    <Typography sx={{ ...fontStyle }} variant='h3'>
                                        {dt.offsetNameShort}
                                    </Typography> :
                                    <FormControl variant='standard' sx={{ width: 100 }}>
                                        <InputLabel sx={{ ...labelStyle, }}>Offset</InputLabel>
                                        <Input
                                            disabled
                                            type='text'
                                            sx={{
                                                ...fontStyle,
                                                input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                            }}
                                            defaultValue={dt.offsetNameShort} />
                                    </FormControl>
                            }
                        </Grid>
                    </Grid>
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
                                    {dt.zoneName}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={{ ...labelStyle }}>Timezone</InputLabel>
                                    <Select
                                        sx={{
                                            ...fontStyle,
                                            fontSize: theme.typography.h3,
                                            option: { textAlign: 'center', fontSize: theme.typography.h3 }
                                        }}
                                        defaultValue={dt.zoneName}>
                                        {
                                            timezones.map((timezone) =>
                                                <MenuItem
                                                    sx={{
                                                        ...fontStyle,
                                                        fontSize: theme.typography.body1,
                                                    }}
                                                    key={timezone}
                                                    value={timezone}>
                                                    {timezone}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                        }
                    </Grid>
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
                                    {dt.toUnixInteger()}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={{ ...labelStyle }}>Epoch</InputLabel>
                                    <Input
                                        type='number'
                                        sx={{
                                            ...fontStyle,
                                            input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                        }}
                                        defaultValue={dt.toUnixInteger()} />
                                </FormControl>
                        }
                    </Grid>
                    <Grid item>
                        <IconButton size='large' color='inherit' onClick={() => setIsEdit((prev) => !prev)}>
                            {isEdit ? <Save fontSize='large' /> : <Edit fontSize='large' />}
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default DateTimeComponent;