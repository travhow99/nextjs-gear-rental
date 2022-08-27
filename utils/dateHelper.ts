import {
	format,
	set,
	getDate,
	getYear,
	formatDistance,
	isSameYear,
	isSameMonth,
	isSameDay,
	isAfter,
	isBefore,
	subDays,
} from 'date-fns';
import { RentalDate } from '../types/RentalDate';

type timestamp = string | number | Date;

const dateHelper = {
	timestampToDate(timestamp: timestamp) {
		const result = format(new Date(timestamp), 'MM-dd-yyyy');
		return result;
	},

	dateToDateTimeLocalFormat(date: timestamp) {
		// return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
		// const dateCheck = new Date(date);
		return new Date(
			new Date(date).getTime() + dateHelper.getTimezoneOffset()
		)
			.toISOString()
			.slice(0, 19);
	},

	getTimezoneOffset() {
		return new Date().getTimezoneOffset() * -60 * 1000;
	},

	getTodayForDateInput() {
		return format(new Date(), 'yyyy-MM-dd');
	},

	getTomorrowForDateInput() {
		const today = new Date();
		const tomorrow = set(today, { date: getDate(today) + 1 });

		return format(tomorrow, 'yyyy-MM-dd');
	},

	getFirstDayOfMonth(month: number) {
		const currentYear = getYear(new Date());

		return new Date(currentYear, month, 1);
	},

	getReadableNumberOfDaysBetween(
		date1: number | Date,
		date2: number | Date
	): string {
		const days = formatDistance(date2, date1);
		console.log('d:', days, parseInt(days, 10));

		return days === 'less than a minute' ? '1 day' : days;
	},

	getNumberOfDaysBetween(date1: number | Date, date2: number | Date): number {
		const days = formatDistance(date2, date1);
		console.log('d:', days, parseInt(days, 10));

		return days === 'less than a minute' ? 1 : parseInt(days, 10);
	},

	getHumanReadableDateRangeText(date1: Date, date2: Date) {
		let text: string;

		// const sameYear = isSameYear(date1, date2);
		// const sameMonth = isSameMonth(date1, date2);

		text = date1.toDateString();

		if (!isSameDay(date1, date2)) text += ' - ' + date2.toDateString();

		return text;
	},

	dateRangesOverlap(rentalDate1: RentalDate, rentalDate2: RentalDate) {
		const startDate1 = new Date(rentalDate1.startDate);
		const endDate1 = new Date(rentalDate1.endDate);
		const startDate2 = new Date(rentalDate2.startDate);
		const endDate2 = new Date(rentalDate2.endDate);

		// (StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)

		console.log(
			startDate1,
			startDate2,
			endDate1,
			endDate2,
			isSameDay(startDate1, endDate2),
			isAfter(startDate1, endDate2),
			isSameDay(startDate2, endDate1),
			isBefore(startDate2, endDate1)
		);
		if (
			isSameDay(startDate1, endDate2) ||
			isSameDay(startDate1, startDate2) ||
			isAfter(startDate1, endDate2) ||
			// isSameDay(startDate1, endDate1) ||
			isSameDay(startDate2, endDate1) ||
			isBefore(startDate2, endDate1)
		) {
			return true;
		}

		return false;
	},

	/**
	 * @todo isMorning, isAfternoon, isNight methods for determining rental/drop off times
	 */
};

export default dateHelper;
