import { useEffect, useState } from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { styled, TextField } from '@material-ui/core';
import { Badge, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import ProductHelper from '../../utils/helpers/ProductHelper';
import { PickersDay } from '@mui/lab';

import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
import { isAfter, isBefore } from 'date-fns';

/* const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  })
); */

const ProductCalendar = ({ productId, rental, setRental }) => {
  const [disabled, setDisabled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState([]);

  useEffect(async () => {
    const data = await ProductHelper.fetchCalendar(productId);
    console.log('got calendar', data);
    setBooked(data);
    setLoading(false);
  }, []);

  const handleMonthChange = (date) => {
    // setLoading(true);

    console.log('month change', date);
  };

  const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
    return <MuiDateRangePickerDay disabled {...dateRangePickerDayProps} />;
  };

  /**
   * @todo turn into ProductHelper method
   */
  const disableBookings = (date) => {
    // return Math.random() > 0.5;
    let disabled = false;

    booked.map((b) => {
      const start = new Date(b.out);
      const end = new Date(b.in);

      if (isAfter(date, start) && isBefore(date, end)) {
        console.log('disable?', date, start, end);

        disabled = true;
      }
    });

    return disabled;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        calendars={1}
        loading={loading}
        disablePast
        startText="Check-in"
        endText="Check-out"
        value={rental}
        onChange={(newValue) => {
          setRental(newValue);
        }}
        onMonthChange={handleMonthChange}
        renderInput={(startProps, endProps) => (
          <Stack>
            <TextField {...startProps} />
            <Box sx={{ my: 2 }}> to </Box>
            <TextField {...endProps} />
          </Stack>
        )}
        // renderDay={renderWeekPickerDay}
        shouldDisableDate={(date) => ProductHelper.getIsBooked(booked, date)}
      />
    </LocalizationProvider>
  );
};

ProductCalendar.propTypes = {
  // dateIn: PropTypes.dat
  productId: PropTypes.string,
  rental: PropTypes.array,
  setRental: PropTypes.func,
};

export default ProductCalendar;
