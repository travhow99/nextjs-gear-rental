import { format, set, getDate, getYear, formatDistance } from 'date-fns';

type timestamp = string | number | Date;

const dateHelper = {
	timestampToDate(timestamp: timestamp) {
		const result = format(new Date(timestamp), 'MM-dd-yyyy');
		return result;
	},

	dateToDateTimeLocalFormat(date: timestamp) {
		// return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
		// const dateCheck = new Date(date);
		return new Date(new Date(date).getTime() + this.getTimezoneOffset())
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

	getNumberOfDaysBetween(date1: number | Date, date2: number | Date): string {
		const days = formatDistance(date2, date1);
		return days === 'less than a minute' ? '1 day' : days;
	},

	/**
	 * @todo isMorning, isAfternoon, isNight methods for determining rental/drop off times
	 */
};

export default dateHelper;
