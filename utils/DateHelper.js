import { format } from 'date-fns';

export default class DateHelper {
  static timestampToDate(timestamp) {
    const result = format(new Date(timestamp), 'MM-dd-yyyy');
    return result;
  }
}
