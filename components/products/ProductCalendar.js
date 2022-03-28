import { useEffect, useState } from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
import { Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import ProductHelper from '../../utils/helpers/ProductHelper';

const ProductCalendar = ({ productId, rental, setRental }) => {
  const [disabled, setDisabled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState([]);

  useEffect(async () => {
    const data = await ProductHelper.getCalendar(productId);
    console.log('got calendar', data);
    setBooked(data);
    setLoading(false);
  }, []);

  const handleMonthChange = (date) => {
    setLoading(true);

    console.log('month change', date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
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
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays.indexOf(day.getDate()) > 0;

          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              badgeContent={isSelected ? '🌚' : undefined}
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
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
