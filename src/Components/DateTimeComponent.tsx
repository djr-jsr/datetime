import { FC, useState, useEffect } from 'react';
import { Box, Typography, Grid, useTheme, FormControl, InputLabel, Input, IconButton, Select, MenuItem } from '@mui/material';
import { DateTime } from 'luxon';
import { Edit, Save, Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';

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
            setDisplayDate(displayDate.setZone(timezone));
        }
    }, [isPaused, timeDiff, timezone]);

    useEffect(() => {
        console.log('savedDate: ' + savedDate?.toISO());
        setDisplayDate(savedDate.setZone(timezone));
    }, [savedDate, timezone]);

    return (
        <>
            <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center', paddingBottom: '10vh' }}>
                <Grid container direction='column' alignItems='center' justifyItems='center' spacing={5}>
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
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
                                                <InputLabel sx={{ ...labelStyle }} {...props?.InputLabelProps}>Date</InputLabel>
                                                <Input
                                                    {...props?.InputProps}
                                                    type='text'
                                                    sx={{
                                                        ...fontStyle,
                                                        input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                                    }}
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
                    <Grid item container justifyContent='center' alignItems='center' direction='row' spacing={2}>
                        <Grid item>
                            {
                                !isEdit ?
                                    <Typography sx={{ ...fontStyle }} variant='h3'>
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
                                                    <InputLabel sx={{ ...labelStyle }} {...props?.InputLabelProps}>Time</InputLabel>
                                                    <Input
                                                        {...props?.InputProps}
                                                        type='text'
                                                        sx={{
                                                            ...fontStyle,
                                                            input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                                        }}
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
                        <Grid item>
                            {
                                !isEdit ?
                                    <Typography sx={{ ...fontStyle }} variant='h3'>
                                        {displayDate.offsetNameShort}
                                    </Typography> :
                                    <FormControl variant='standard'>
                                        <InputLabel sx={{ ...labelStyle, }}>Offset</InputLabel>
                                        <Input
                                            disabled
                                            type='text'
                                            sx={{
                                                ...fontStyle,
                                                input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                            }}
                                            value={displayDate.offsetNameShort} />
                                    </FormControl>
                            }
                        </Grid>
                    </Grid>
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
                                    {timezone}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={{ ...labelStyle }}>Timezone</InputLabel>
                                    <Select
                                        sx={{
                                            ...fontStyle,
                                            fontSize: theme.typography.h3,
                                            nativeInput: { textAlign: 'center', fontSize: theme.typography.h3 },
                                            option: { textAlign: 'center', fontSize: theme.typography.h3 }
                                        }}
                                        value={timezone}
                                        onChange={(event) => setTimezone(event.target.value)} >
                                        {
                                            timezones.map((tz) =>
                                                <MenuItem
                                                    sx={{
                                                        ...fontStyle,
                                                        fontSize: theme.typography.body1,
                                                    }}
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
                    <Grid item>
                        {
                            !isEdit ?
                                <Typography sx={{ ...fontStyle }} variant='h3'>
                                    {displayDate.toUnixInteger()}
                                </Typography> :
                                <FormControl variant='standard'>
                                    <InputLabel sx={{ ...labelStyle }}>Epoch</InputLabel>
                                    <Input
                                        type='number'
                                        sx={{
                                            ...fontStyle,
                                            input: { textAlign: 'center', fontSize: theme.typography.h3 }
                                        }}
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
                    <Grid item container justifyContent='center' alignItems='center' direction='row' spacing={2}>
                        <Grid item>
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
                        <Grid item>
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
                        <Grid item>
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