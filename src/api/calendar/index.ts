import { DateCell } from '../../model/date';
import { dates } from './mockData';
/*
* Note: use Month - 1 to get the day in a week
*       but use Month to get current month len
*/
var today = new Date();
var day = today.getDay();
var date = today.getDate();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var prevMonthLen = new Date(year, month - 1, 0).getDate();
var monthLen = new Date(year, month, 0).getDate();
var nextMonthLen = new Date(year, month + 1, 0).getDate();
var curStartDate = date-day;
var firstDayInMonth = (new Date(year, month - 1, 1)).getDay();
var firstWeek =  (date <= (7 - firstDayInMonth));

/**
* Populate dummy date to UI
* @returns returns date under mockData async.
*/
const fetchDates = (): Promise<DateCell[]> => {
  return Promise.resolve(dates);
};

/**
* Search by given parameters
* @param date input date
* @param reqMonth in query month
* @param reqYear in query year
* @returns data associated with given params
*/
const searchByDate = (date, reqMonth, reqYear) => {
  var sum = 0;
  dates.forEach(function (data) {
    if ((data.date == date) && (data.year == reqYear) && (data.month == reqMonth)) {
      sum = data.items.length;
    }
  });
  return sum;
}

/**
* Initiatize the calendar date values
* @returns array of dates for each week in current month
*/
const init = () => {
  var init = [];
  if (firstDayInMonth == 0) {
    init.push(1);
  } else {
    init.push(prevMonthLen - firstDayInMonth + 1);
  }
  init = buildStartDates(curStartDate, monthLen, init);
  return init;
}

/**
* Helper function for init(), traverse down the weeks in a month
* @returns array of dates for each week in current month
*/
const buildStartDates = (curStartDate, monthLen, dates) => {
  dates.push(dates[0] != curStartDate ? curStartDate : curStartDate + 7);

  while (curStartDate + 7 <= monthLen) {
    dates.push(curStartDate + 7);
    curStartDate += 7;
  }

  return dates;
}

const updateCalendarUp = (curStartDate, prevMonthLen, dates, curYear, curMonth) => {
  //case when 1 is in first cell
  if (curStartDate == 1) {
    dates[0] = new Date(curYear, curMonth, 0).getDate() - 6;
    curStartDate = dates[0];
  }
  curStartDate = curStartDate - 7;
  var firstWeek = true; // flag for case when 1 is in the first week and not in first cell
  while (dates.length < 5) {
    if (curStartDate < 1) {
      dates.push(prevMonthLen + curStartDate);
    } else {
      dates.push(curStartDate);
    }
    curStartDate -= 7;
    if (firstWeek) {
      firstWeek = !firstWeek;
    }
  }
  return dates.reverse();
}

const updateCalendarDown = (curStartDate, thisMonthLen, dates) => {
  var firstWeek = true;
  while (dates.length < 5) {
    if (firstWeek) {
      curStartDate = 7 - (thisMonthLen - curStartDate);
      // case when 1 is in first cell
      if (curStartDate == 1) {
        dates = [1];
      } else {
        dates.push(curStartDate);
      }
      firstWeek = false;
    } else {
      dates.push(curStartDate);
    }
    curStartDate += 7;
  }
  return dates;
}

const updateCalendar = (startDates, action, curYear, curMonth) => {
  var updatedStartDates = [];

  if (action == 'prev') {
    if ((new Date(curYear, curMonth , 1)).getDay() == 0 ) {
      updatedStartDates.push(1);
    }
    else {
      updatedStartDates.push(startDates[0]);
    }
    updatedStartDates = updateCalendarUp(updatedStartDates[0], new Date(curYear, (curMonth-1)>0?(curMonth-1):12, 0).getDate(), updatedStartDates, curYear, curMonth);
  } else {
    updatedStartDates.push(startDates[4]);
    updatedStartDates = updateCalendarDown(updatedStartDates[0], new Date(curYear, curMonth-1, 0).getDate(), updatedStartDates);
  }
  return updatedStartDates;
}

export const calendarAPI = {
  fetchDates, init, updateCalendar, searchByDate
};
