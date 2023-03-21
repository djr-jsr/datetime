import { FC, useState, useEffect } from 'react';
import { Box, Typography, Unstable_Grid2 as Grid, useTheme, FormControl, InputLabel, Input, IconButton, Select, MenuItem, Theme } from '@mui/material';
import { DateTime } from 'luxon';
import { Edit, Save, Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';

const displayFontStyle = (theme: Theme) => ({
    fontWeight: 'bold',
    input: { textAlign: 'center' }
});

const labelStyle = (theme: Theme) => ({
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

const selectFontStyle = (theme: Theme) => ({
    fontWeight: 'bold',
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
});

const timezones = ['UTC'].concat((Intl as any).supportedValuesOf('timeZone') as string[]);

const DateTimeComponent: FC = () => {

    const [displayDate, setDisplayDate] = useState(DateTime.local());
    const [savedDate, setSavedDate] = useState(DateTime.local());

    const [isPaused, setIsPaused] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [timeDiff, setTimeDiff] = useState(0);
    const [timezone, setTimezone] = useState(displayDate.zoneName);

    const theme = useTheme();
    console.log(theme);

    useEffect(() => {
        if (isCurrent) {
            console.log('isCurrent: ' + isCurrent);
            setTimeDiff(0);
            setIsCurrent(false);
            setSavedDate(DateTime.local());
            setDisplayDate(DateTime.local().setZone(timezone));
        }
    }, [isCurrent, timezone]);

    useEffect(() => {
        if (!isPaused) {
            setTimeDiff(DateTime.local().toUnixInteger() - savedDate.toUnixInteger());
            const timer = setInterval(() => {
                console.log(timeDiff);
                setDisplayDate(DateTime.local().setZone(timezone).minus(timeDiff * 1000));
            }, 10);
            return () => {
                clearInterval(timer);
            }
        }
        else {
            setSavedDate(displayDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPaused, timeDiff, timezone]);

    useEffect(() => {
        console.log('savedDate: ' + savedDate?.toISO());
        setDisplayDate(savedDate.setZone(timezone));
    }, [savedDate, timezone]);

    return (
        <>
            <Box sx={{ height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '2vh' }}>
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
                                        setSavedDate(() => {
                                            const newDate = value as DateTime;
                                            const newTime = displayDate.set({ year: newDate.year, month: newDate.month, day: newDate.day });
                                            return newTime;
                                        });
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
                                            setSavedDate(() => {
                                                const newDate = value as DateTime;
                                                const newTime = displayDate.set({ hour: newDate.hour, minute: newDate.minute, second: newDate.second });
                                                return newTime;
                                            });
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
                                    {timezone}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={labelStyle}>Timezone</InputLabel>
                                    <Select
                                        sx={selectFontStyle}
                                        value={timezone}
                                        onChange={(event) => setTimezone(event.target.value)} >
                                        {
                                            timezones.map((tz) =>
                                                <MenuItem
                                                    sx={inputFontStyle}
                                                    key={tz}
                                                    value={tz}>
                                                    {tz}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
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
                                            setSavedDate(() => {
                                                return DateTime.fromSeconds(parseInt(event.target.value) || 0);
                                            });
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
                                            setTimeDiff(DateTime.local().toUnixInteger() - displayDate.toUnixInteger());
                                            setIsPaused((prev) => !prev);
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
                                        setIsEdit((prev) => {
                                            if (!prev) {
                                                setIsPaused(true);
                                            }

                                            return !prev;
                                        });
                                    }
                                }>
                                {isEdit ? <Save fontSize='large' /> : <Edit fontSize='large' />}
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton size='large' color='inherit' onClick={() => setIsCurrent(true)}>
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