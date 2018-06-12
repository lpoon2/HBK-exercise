import { DateCell } from '../../model/date';
import { dates } from '../data/mockData';
/*
* Note: use Month - 1 to get the day in a week
* but use Month to get current month len
*/
let today = new Date();
let day = today.getDay();
let date = today.getDate();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let prevMonthLen = new Date(year, month - 1, 0).getDate();
let monthLen = new Date(year, month, 0).getDate();
let nextMonthLen = new Date(year, month + 1, 0).getDate();
let curStartDate = date-day;
let firstDayInMonth = (new Date(year, month - 1, 1)).getDay();
let firstWeek =  (date <= (7 - firstDayInMonth));
let tempData = dates;

/**
* Populate dummy date to UI
* @returns returns date under mockData async.
*/
const fetchDates = (): Promise<DateCell[]> => {
  return Promise.resolve(dates);
};

/**
* Data extracted from mockData be modified by adding/deleting
* @returns modified data structure
*/
const getDates = () => {
  return tempData;
}

/**
* Append new object to current data structure
*/
const modifyData = (newData, datePicked) => {
  newData.date = datePicked.date;
  newData.month = datePicked.month;
  newData.year = datePicked.year;
  tempData = tempData.concat([newData]);
}

/**
* Checking if the query object exist in the database
* @returns true if the returned object has empty array
*/
const isNewItem = (date) => {
  let res = searchByDate(date.date, date.month, date.year);
  return res == 0;
}

/**
* Search by given parameters
* @param date input date
* @param reqMonth in query month
* @param reqYear in query year
* @returns data associated with given params
*/
const searchByDate = (date, reqMonth, reqYear) => {
  let sum = 0;
  tempData.forEach(function (data) {
    if ((data.date == date) && (data.year == reqYear) && (data.month == reqMonth)) {
      sum = data.items.length;
    }
  });
  return sum;
}

/**
* Search for the items assoicated with given date
* @param date input date
* @param reqMonth in query month
* @param reqYear in query year
* @returns items associated with given params
*/
const getItemsByDate = (date, reqMonth, reqYear) => {
  let res = [];
  tempData.forEach(function (data, index) {
    if ((data.date == date) && (data.year == reqYear) && (data.month == reqMonth)) {
      res = data.items;
    }
  });
  return res;
}

/**
* Search for the items assoicated with given date
* @param date input date
* @param reqMonth in query month
* @param reqYear in query year
* @returns items associated with given params
*/
const modifyExistingDate = (date, reqMonth, reqYear, newEvent) => {
  let res = [];
  tempData.forEach(function (data, index) {
    if ((data.date == date) && (data.year == reqYear) && (data.month == reqMonth)) {
      //data.items = data.items.concat([newEvent]);
    }
  });
  return 0;
}

/**
* Initiatize the calendar date values
* @returns array of dates for each week in current month
*/
const init = () => {
  let init = [];
  let start = [];
  if (firstDayInMonth == 0) {
    start.push(1);
  } else {
    start.push(prevMonthLen - firstDayInMonth + 1);
  }
  console.log(start);
  init = buildStartDates(curStartDate, monthLen, start);
  console.log('init');
  console.log(init);

  if (firstDayInMonth != 0) {
  let temp = init.slice(1, init.length);
  let res = updateCalendarUp(init[1], prevMonthLen, temp.reverse(), year, month);
  return res;
  }
  return init;
}

/**
* Helper function for init(), traverse down the weeks in a month
* @returns array of dates for each week in current month
*/
const buildStartDates = (curStartDate, monthLen, dates) => {
  console.log('in build start');
  console.log([curStartDate, monthLen, dates]);
  dates.push(dates[0] != curStartDate ? curStartDate : curStartDate + 7);

  while (curStartDate + 7 <= monthLen) {
    console.log(curStartDate + 7);
    dates.push(curStartDate + 7);
    curStartDate += 7;
  }

  return dates;
}

/**
* Helper function for building starting dates of the calendar page
* @param curStartDate input date
* @param prevMonthLen in query month
* @param dates in query year
* @param curYear
* @param curMonth
* @returns starting dates
*/
const updateCalendarUp = (curStartDate, prevMonthLen, dates, curYear, curMonth) => {
  //case when 1 is in first cell
  if (curStartDate == 1) {
    dates[0] = new Date(curYear, curMonth, 0).getDate() - 6;
    curStartDate = dates[0];
  }
  curStartDate = curStartDate - 7;
  let firstWeek = true; // flag for case when 1 is in the first week and not in first cell
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

/**
* Helper function for building starting dates of the calendar page
* @param curStartDate input date
* @param thisMonthLen in query month
* @param dates in query year
* @returns starting dates
*/
const updateCalendarDown = (curStartDate, thisMonthLen, dates) => {
  let firstWeek = true;
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

/**
* Navigate between pages in the calendar view
* @param startDates current start dates
* @param action previous or next page
* @param curYear
* @param curMonth
* @returns starting dates
*/
const updateCalendar = (startDates, action, curYear, curMonth) => {
  let updatedStartDates = [];

  if (action == 'prev') {
    if ((new Date(curYear, curMonth , 1)).getDay() == 0 ) {
      updatedStartDates.push((new Date(curYear, curMonth , 0)).getDate() - 6);
    }
    else {
    updatedStartDates.push(startDates[0]);
  }
    updatedStartDates = updateCalendarUp(updatedStartDates[0], new Date(curYear, (curMonth-1)>0?(curMonth-1):12, 0).getDate(), updatedStartDates, curYear, curMonth);
  } else {
    updatedStartDates.push(startDates[startDates.length-1]);
    updatedStartDates = updateCalendarDown(updatedStartDates[0], new Date(curYear, curMonth-1, 0).getDate(), updatedStartDates);
  }
  return updatedStartDates;
}

export const calendarAPI = {
  fetchDates,
  init,
  updateCalendar,
  searchByDate,
  getItemsByDate,
  isNewItem,
  getDates,
  modifyData,
  modifyExistingDate
};
