import { format, set, getDate, getYear } from 'date-fns';

export default class DateHelper {
  static timestampToDate(timestamp) {
    const result = format(new Date(timestamp), 'MM-dd-yyyy');
    return result;
  }
  static dateToDateTimeLocalFormat(date) {
    // return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    // const dateCheck = new Date(date);
    return new Date(new Date(date).getTime() + this.getTimezoneOffset())
      .toISOString()
      .slice(0, 19);
  }
  static getTimezoneOffset() {
    return new Date().getTimezoneOffset() * -60 * 1000;
  }
  static getTodayForDateInput() {
    return format(new Date(), 'yyyy-MM-dd');
  }
  static getTomorrowForDateInput() {
    const today = new Date();
    const tomorrow = set(today, { date: getDate(today) + 1 });
    return format(tomorrow, 'yyyy-MM-dd');
  }

  static getFirstDayOfMonth(month) {
    const currentYear = getYear(new Date());

    return new Date(currentYear, month, 1);
  }

  /**
   * @todo isMorning, isAfternoon, isNight methods for determining rental/drop off times
   */
}
