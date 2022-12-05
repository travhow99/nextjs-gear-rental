import { addDays } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Calendar, DateRange, Range } from 'react-date-range';
import { Booking } from '../../types/Booking';
import ProductHelper from '../../utils/helpers/ProductHelper';

export default function BetaProductCalendar({
	range,
	setRange,
	productId,
	isAdmin = false,
}: {
	range: Range;
	setRange: Dispatch<SetStateAction<Range>>;
	productId: string;
	isAdmin: Boolean;
}): JSX.Element {
	const [disabled, setDisabled] = useState([]);
	const [loading, setLoading] = useState(true);
	const [booked, setBooked] = useState([]);
	const [maxMonth, setMaxMonth] = useState(null);

	useEffect(() => {
		const fetchCalendar = async () => {
			const { bookings, startMonth, endMonth } =
				await ProductHelper.fetchCalendar(productId);

			console.log('got calendar', bookings, endMonth);

			/**
			 * @todo get days between, or serverside function?
			 */
			setBooked(
				bookings.flatMap((booking: Booking) => [
					new Date(booking.in),
					new Date(booking.out),
				])
			);
			setLoading(false);
			setMaxMonth(endMonth);
		};

		fetchCalendar();
	}, []);

	const handleMonthChange = async (date: Date) => {
		console.log('month change,', date);
		// debugger;
	};

	// console.log(booked[0]?.in, new Date(booked[0]?.in));
	console.log('bookings:', booked);
	console.log(maxMonth);

	const customProps = {
		editableDateInputs: !isAdmin,
		onChange: isAdmin
			? null
			: (item) => {
					const selection = item.selection;
					debugger;
					console.log(selection);
					setRange(selection);
			  },
		moveRangeOnFirstSelection: false,
		ranges: [range],
		showDateDisplay: !isAdmin,
		endDatePlaceholder: 'Return',
		showMonthAndYearPickers: true,
		minDate: isAdmin ? addDays(new Date(), -365 * 2) : new Date(),
		onShownDateChange: handleMonthChange,
		disabledDates: isAdmin ? [] : booked,
	};

	return isAdmin ? (
		<Calendar {...customProps} />
	) : (
		<DateRange {...customProps} />
	);
}
