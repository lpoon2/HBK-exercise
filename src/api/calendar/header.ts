/**
* Getting the month and year from url
* @returns "month"-"year" in string
*/
const getMonthYear = () => {
  var hash = window.location.hash.split('/');
  if (hash.length != 4) {
    var today = new Date();
    return today.getMonth() + "/" + today.getFullYear();
  }
  return (parseInt(hash[2]) - 1) + "/" + hash[3]; // [2] - month [3] - year
}

/**
* Getting the first cell of in the month view
* @returns the date object of for the first cell in a month view
*/
const getStartDate = () =>{
  var hash = window.location.hash.split('/');
  var month,year;
  var today = new Date();

  if (hash.length != 4) {
    month = today.getMonth() + 1;
    year = today.getFullYear();
  } else {
    month = parseInt(hash[2]);
    year = parseInt(hash[3]);
  }

  var firstDay = new Date(year, month-1 , 1);

  if (firstDay.getDay() == 0) {
    return 1;
  }

  return new Date(year, month - 1, 0).getDate() - firstDay.getDay() + 1 ;
}

export const HeaderAPI = {
  getMonthYear,
  getStartDate
};
