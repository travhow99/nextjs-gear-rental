import { format } from 'date-fns';

export default class DateHelper {
  static timestampToDate(timestamp) {
    console.log(timestamp);
    const result = format(new Date(timestamp), 'MM-dd-yyyy');
    console.log(result);
    return result;
  }
}
