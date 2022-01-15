import { format } from 'date-fns';

export default class DateHelper {
  static timestampToDate(timestamp) {
    return format(new Date(timestamp), 'MM-dd-yyyy');
  }
}
