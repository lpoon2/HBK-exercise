import { DateCell } from '../../model/date';
import { dates } from './mockData';

/*
  Current date
*/
var today = new Date();
var day = today.getDay();
var date = today.getDate();
var year = today.getFullYear();
var month = today.getMonth();
var firstWeek = (date/7) <= 1;
var prevMonthLen = new Date(year, month, 0).getDate();
var monthLen = new Date(year, month+1, 0).getDate();
var nextMonthLen = new Date(year, month+2, 0).getDate();
var curDate = date-day;

const fetchDates = (): Promise<DateCell[]> => {
  return Promise.resolve(dates);
};

const init = () => {
  var init = [];

  if (firstWeek) {
    if (day >= date) {
      init.push(prevMonthLen - (day - date));
    } else {
      init.push(1);
    }
    init = buildStartDates(curDate, monthLen, init);
  } else {
      init.push(curDate);
      init = buildStartDates(curDate, monthLen, init);
  }
  return init;
}

const buildStartDates = (curDate, monthLen, dates) => {
  while (curDate + 7 <= monthLen) {
    dates.push(curDate + 7);
    curDate += 7;
  }
  curDate = date-day-7;
  while (dates.length < 5) {
    if (curDate < 1) {
      dates.push(prevMonthLen - (date-day-7));
    } else {
      dates.push(curDate);
    }
    curDate -= 7;
  }
  return dates;
}

const updateCalendarUp = (curDate, prevMonthLen, dates, curYear, curMonth) => {
  //case when 1 is in first cell
  if (curDate == 1) {
    dates[0] = new Date(curYear, curMonth, 0).getDate() - 6;
    curDate = dates[0];
  }
  curDate = curDate - 7;
  var firstWeek = true; // flag for case when 1 is in the first week and not in first cell
  while (dates.length < 5) {
    if (curDate < 1) {
      dates.push(prevMonthLen + curDate);
    } else {
      dates.push(curDate);
    }
    curDate -= 7;
    if (firstWeek) {
      firstWeek = !firstWeek;
    }
  }
  return dates.reverse();
}

const updateCalendarDown = (curDate, thisMonthLen, dates) => {
  var firstWeek = true;
  while (dates.length < 5) {
    if (firstWeek) {
      curDate = 7 - (thisMonthLen - curDate);
      // case when 1 is in first cell 
      if (curDate == 1) {
        dates = [1];
      } else {
        dates.push(curDate);
      }
      firstWeek = false;
    } else {
      dates.push(curDate);
    }
    console.log(dates);
    curDate += 7;
  }
  return dates;
}

const updateCalendar = (startDates, action, curYear, curMonth) => {
  var updatedStartDates = [];

  if (action == 'prev') {
    updatedStartDates.push(startDates[0]);
    updatedStartDates = updateCalendarUp(updatedStartDates[0], new Date(curYear, (curMonth-1)>0?(curMonth-1):12, 0).getDate(), updatedStartDates, curYear, curMonth);
  } else {
    updatedStartDates.push(startDates[4]);
    updatedStartDates = updateCalendarDown(updatedStartDates[0], new Date(curYear, curMonth-1, 0).getDate(), updatedStartDates);
  }
  return updatedStartDates;
}


export const calendarAPI = {
  fetchDates,init, updateCalendar
};
