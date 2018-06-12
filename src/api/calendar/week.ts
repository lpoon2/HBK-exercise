import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

let dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
* This function first get the day of the week from the date object
* and return the matching string in the array
* @param date input date
* @param month in query month
* @param year in query year
* @returns day of the week in string
*/
const getDayName = (date, month, year) => {
  var target_date = new Date(year, month-2, date);
  return dayNames[target_date.getDay()];
}

/**
* This is the 'remove' functionality. We simply change the style of the Component
* @param e the element the triggered 'remove'
*/
const hideEle = (e) => {
  let elem = document.getElementById(e.target.id).parentElement;
  elem.style.display = "none";
}

export const weekAPI = {
  getDayName,
  hideEle
};
