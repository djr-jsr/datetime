import { FC, useState, useEffect, useRef } from 'react';
import { Box, Typography, Unstable_Grid2 as Grid, FormControl, InputLabel, Input, IconButton, Theme, Autocomplete } from '@mui/material';
import { DateTime } from 'luxon';
import { Edit, Save, Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { getTimeZones } from '@vvo/tzdb';
import { useBoolean } from 'ahooks';

const displayFontStyle = (_theme: Theme) => ({
    fontWeight: 'bold',
    input: { textAlign: 'center' }
});

const labelStyle = (_theme: Theme) => ({
    width: '100%',
    textAlign: 'center',
    transformOrigin: 'center'
});

const inputFontStyle = (theme: Theme) => ({
    fontWeight: 'bold',
    input: {
        textAlign: 'center',
        fontSize: '2.2rem',
        [theme.breakpoints.down('lg')]: {
            fontSize: '2.0rem'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.6rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.4rem'
        },
    }
});

const timezones = getTimeZones({ includeUtc: true }).sort((a, b) => a.continentName.localeCompare(b.continentName));

const DateTimeComponent: FC = () => {

    const [isPaused, setIsPaused] = useBoolean(false);
    const [isEdit, setIsEdit] = useBoolean(false);

    const [timezone, setTimezone] = useState(DateTime.local().zoneName);
    const [displayDate, setDisplayDate] = useState(DateTime.local());

    const displayDateRef = useRef(displayDate);
    const timeDiffRef = useRef(0);

    const resetTime = () => {
        timeDiffRef.current = 0;
        setDisplayDate(prevDate => DateTime.local().setZone(prevDate.zoneName!));
    };

    useEffect(() => {
        if (!isPaused) {
            console.log('isPaused: ' + isPaused);
            timeDiffRef.current = DateTime.local().toUnixInteger() - displayDateRef.current.toUnixInteger();
            const timer = setInterval(() => {
                const timeDiffValue = timeDiffRef.current;
                console.log(timeDiffValue);
                setDisplayDate(prevDate => DateTime.local().setZone(prevDate.zoneName!).minus(timeDiffValue * 1000));
            }, 100);
            return () => {
                clearInterval(timer);
            }
        }
    }, [isPaused]);

    useEffect(() => {
        setDisplayDate((prevDate) => prevDate.setZone(timezone!));
    }, [timezone]);

    useEffect(() => {
        displayDateRef.current = displayDate;
    }, [displayDate]);

    return (
        <>
            <Box sx={{ height: '85svh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '2svh' }}>
                <Grid container direction='column' display='flex' alignItems='center' justifyItems='center' spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
                    <Grid>
                        {
                            !isEdit ?
                                <Typography noWrap sx={displayFontStyle} variant='h3'>
                                    {displayDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                                </Typography> :
                                <MobileDatePicker
                                    views={['day', 'month', 'year']}
                                    closeOnSelect={true}
                                    value={displayDate}
                                    slotProps={{
                                        actionBar: {
                                            actions: []
                                        }
                                    }}
                                    slots={{
                                        textField: (props) => {
                                            return <FormControl variant='standard'>
                                                <InputLabel sx={labelStyle} {...props?.InputLabelProps}>Date</InputLabel>
                                                <Input
                                                    {...props?.InputProps}
                                                    type='text'
                                                    sx={inputFontStyle}
                                                    inputRef={props.inputRef}
                                                    inputProps={props.inputProps}
                                                    onClick={props.onClick}
                                                    onChange={props.onChange}
                                                    endAdornment={props.InputProps?.endAdornment}
                                                    value={displayDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)} />
                                            </FormControl>;
                                        },
                                    }}
                                    onViewChange={(value) => { console.log('onViewChange: ' + value); }}
                                    onChange={(value) => { console.log('onChange: ' + value?.toISO()); }}
                                    onMonthChange={(value) => { console.log('onMonthChange: ' + value?.toISO()); }}
                                    onYearChange={(value) => { console.log('onYearChange: ' + value?.toISO()); }}
                                    onSelectedSectionsChange={(value) => { console.log('onSelectedSectionsChange: ' + value); }}
                                    onAccept={(value) => {
                                        console.log('onAccept: ' + value?.toISO());
                                        const newDate = value as DateTime;
                                        const newTime = displayDate.set({ year: newDate.year, month: newDate.month, day: newDate.day });
                                        setDisplayDate(prevDate => newTime.setZone(prevDate.zoneName!));
                                    }}
                                />
                        }
                    </Grid>
                    <Grid container justifyContent='center' alignItems='center' direction='row' spacing={2}>
                        <Grid>
                            {
                                !isEdit ?
                                    <Typography noWrap sx={displayFontStyle} variant='h3'>
                                        {displayDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                                    </Typography> :
                                    <MobileTimePicker
                                        views={['hours', 'minutes', 'seconds']}
                                        ampm={false}
                                        closeOnSelect={true}
                                        value={displayDate}
                                        slotProps={{
                                            actionBar: {
                                                actions: []
                                            }
                                        }}
                                        slots={{
                                            textField: (props) => {
                                                return <FormControl variant='standard'>
                                                    <InputLabel sx={labelStyle} {...props?.InputLabelProps}>Time</InputLabel>
                                                    <Input
                                                        {...props?.InputProps}
                                                        type='text'
                                                        sx={inputFontStyle}
                                                        inputRef={props.inputRef}
                                                        inputProps={props.inputProps}
                                                        onClick={props.onClick}
                                                        onChange={props.onChange}
                                                        endAdornment={props.InputProps?.endAdornment}
                                                        value={displayDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS)} />
                                                </FormControl>;
                                            },
                                        }}
                                        onChange={(value) => { console.log('onChange: ' + value?.toISO()); }}
                                        onViewChange={(value) => { console.log('onViewChange: ' + value); }}
                                        onSelectedSectionsChange={(value) => { console.log('onSelectedSectionsChange: ' + value); }}
                                        onAccept={(value) => {
                                            console.log('onAccept: ' + value?.toISO());
                                            const newDate = value as DateTime;
                                            const newTime = displayDate.set({ hour: newDate.hour, minute: newDate.minute, second: newDate.second });
                                            setDisplayDate(prevDate => newTime.setZone(prevDate.zoneName!));
                                        }}
                                    />
                            }
                        </Grid>
                        <Grid>
                            {
                                !isEdit ?
                                    <Typography noWrap sx={displayFontStyle} variant='h3'>
                                        {displayDate.offsetNameShort}
                                    </Typography> :
                                    <FormControl variant='standard'>
                                        <InputLabel sx={labelStyle}>Offset</InputLabel>
                                        <Input
                                            disabled
                                            type='text'
                                            sx={inputFontStyle}
                                            value={displayDate.offsetNameShort} />
                                    </FormControl>
                            }
                        </Grid>
                    </Grid>
                    <Grid>
                        {
                            !isEdit ?
                                <Typography noWrap sx={displayFontStyle} variant='h3'>
                                    {(() => {
                                        const tz = timezones.find(tz => tz.name === timezone);
                                        return `${tz?.name} (${tz?.abbreviation})`;
                                    })()}
                                </Typography> :
                                <Autocomplete
                                    fullWidth={true}
                                    options={timezones}
                                    getOptionLabel={(option) => `${option.name} (${option.abbreviation})`}
                                    groupBy={(option) => option.continentName}
                                    value={timezones.find(tz => tz.name === timezone)}
                                    componentsProps={{ popper: { style: { width: 'fit-content' } } }}
                                    renderInput={(params) =>
                                        <FormControl variant='standard'>
                                            <InputLabel sx={labelStyle}>Timezone</InputLabel>
                                            <Input
                                                {...params.InputProps}
                                                inputProps={{ ...params.inputProps, style: { ...params.inputProps.style, width: 'fit-content' } }}
                                                sx={inputFontStyle}
                                            />
                                        </FormControl>
                                    }
                                    renderOption={(props, option) =>
                                        <Box component='li' {...props} sx={inputFontStyle}>
                                            {option.name} ({option.abbreviation})
                                        </Box>
                                    }
                                    onChange={(event, newValue) => setTimezone(newValue!.name)}
                                />
                        }
                    </Grid>
                    <Grid>
                        {
                            !isEdit ?
                                <Typography noWrap sx={displayFontStyle} variant='h3'>
                                    {displayDate.toUnixInteger()}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={labelStyle}>Epoch</InputLabel>
                                    <Input
                                        type='number'
                                        sx={inputFontStyle}
                                        value={displayDate.toUnixInteger()}
                                        onChange={(event) => {
                                            console.log('onChange: ' + event?.target?.value);
                                            setDisplayDate(prevDate => DateTime.fromSeconds(parseInt(event.target.value) || 0).setZone(prevDate.zoneName!));
                                        }} />
                                </FormControl>
                        }
                    </Grid>
                    <Grid container justifyContent='center' alignItems='center' direction='row' spacing={2}>
                        <Grid>
                            <IconButton
                                size='large'
                                color='inherit'
                                onClick={
                                    () => {
                                        if (!isEdit) {
                                            setIsPaused.toggle();
                                        }
                                    }
                                }>
                                {isPaused ? <PlayArrow fontSize='large' /> : <Pause fontSize='large' />}
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton
                                size='large'
                                color='inherit'
                                onClick={
                                    () => {
                                        setIsEdit.toggle();
                                        setIsPaused.setTrue();
                                    }
                                }>
                                {isEdit ? <Save fontSize='large' /> : <Edit fontSize='large' />}
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton size='large' color='inherit' onClick={() => resetTime()}>
                                <RestartAlt fontSize='large' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default DateTimeComponent;
