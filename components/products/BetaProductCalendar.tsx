import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import { Booking } from '../../types/Booking';
import ProductHelper from '../../utils/helpers/ProductHelper';

export default function BetaProductCalendaer({
	range,
	setRange,
	productId,
}: {
	range: Range;
	setRange: Dispatch<SetStateAction<Range>>;
	productId: string;
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
	};

	// console.log(booked[0]?.in, new Date(booked[0]?.in));
	console.log('bookings:', booked);

	return (
		<DateRange
			editableDateInputs={true}
			onChange={(item) => {
				const selection = item.selection;
				console.log(selection);
				setRange(selection);
			}}
			moveRangeOnFirstSelection={false}
			ranges={[range]}
			endDatePlaceholder={'Return'}
			showMonthAndYearPickers={true}
			minDate={new Date()}
			onShownDateChange={handleMonthChange}
			disabledDates={booked}
		/>
	);
}
