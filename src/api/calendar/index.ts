import { DateCell } from '../../model/date';
import { dates } from './mockData';

const fetchDates = (): Promise<DateCell[]> => {
  return Promise.resolve(dates);
};

export const calendarAPI = {
  fetchDates,
};
