import { format } from 'date-fns';

export default class DateHelper {
  static timestampToDate(timestamp) {
    const result = format(new Date(timestamp), 'MM-dd-yyyy');
    return result;
  }
  static dateToDateTimeLocalFormat(date) {
    // return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    // const dateCheck = new Date(date);
    return new Date(
      new Date(date).getTime() + new Date().getTimezoneOffset() * -60 * 1000
    )
      .toISOString()
      .slice(0, 19);
  }
}
