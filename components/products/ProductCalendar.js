import { useEffect, useState } from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { Button, styled, TextField } from '@material-ui/core';
import { Badge, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import ProductHelper from '../../utils/helpers/ProductHelper';
import {
	DateRangePickerDay,
	PickersDay,
	StaticDateRangePicker,
} from '@mui/lab';

import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
import { isAfter, isBefore, getMonth } from 'date-fns';

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
	const [maxMonth, setMaxMonth] = useState(null);

	useEffect(async () => {
		const { bookings, startMonth, endMonth } =
			await ProductHelper.fetchCalendar(productId);

		console.log('got calendar', bookings, endMonth);
		setBooked(bookings);
		setLoading(false);
		setMaxMonth(endMonth);
	}, []);

	const handleMonthChange = async (date) => {
		// setLoading(true);

		console.log('month change', date, getMonth(date));

		if (getMonth(date) >= maxMonth) {
			setLoading(true);
			const { bookings, startMonth, endMonth } =
				await ProductHelper.fetchCalendar(productId, maxMonth + 4);

			console.log('got calendar', bookings, endMonth);
			setBooked(bookings);
			setLoading(false);
			setMaxMonth(endMonth);
		} else if (getMonth(date) === maxMonth) {
			// Pre-fetch the future data
			const { bookings, startMonth, endMonth } =
				await ProductHelper.fetchCalendar(productId, maxMonth + 3);

			console.log('got calendar', bookings, endMonth);
			setBooked(bookings);
			setLoading(false);
			setMaxMonth(endMonth);
		}
	};

	const hadndleTodayClick = async () => {
		// const currentMonth = new Date();
		// console.log('today click', currentMonth);
		// await handleMonthChange(currentMonth);
		setCurrent(Math.random());
	};

	const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
		return <MuiDateRangePickerDay disabled {...dateRangePickerDayProps} />;
	};

	return (
		<Box>
			{/* 
			@todo switch to use https://hypeserver.github.io/react-date-range/
			Implement today btn
			<Button
				color="primary"
				variant="outlined"
				fullWidth
				onClick={hadndleTodayClick}
			>
				Today
			</Button> */}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<StaticDateRangePicker
					displayStaticWrapperAs="desktop"
					calendars={1}
					// showDaysOutsideCurrentMonth={true}
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
					renderDay={(date, dateRangePickerDayProps) => (
						<DateRangePickerDay
							className={ProductHelper.generateCalendarDayClassName(
								ProductHelper.getBookingType(booked, date)
							)}
							{...dateRangePickerDayProps}
						/>
					)}
					shouldDisableDate={(date) =>
						ProductHelper.getIsBooked(booked, date)
					}
				/>
			</LocalizationProvider>
		</Box>
	);
};

ProductCalendar.propTypes = {
	// dateIn: PropTypes.dat
	productId: PropTypes.string,
	rental: PropTypes.array,
	setRental: PropTypes.func,
};

export default ProductCalendar;
