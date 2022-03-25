import * as React from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
import { Stack } from '@mui/material';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <Stack>
            <TextField {...startProps} />
            <Box sx={{ my: 2 }}> to </Box>
            <TextField {...endProps} />
          </Stack>
        )}
      />
    </LocalizationProvider>
  );
}
