export const getTomorrowDate = () => {
  var followingDay = Date.now() + 86400000; // + 1 day in ms = 86400000
  return followingDay;
};

export const getTodaysDate = () => {
  var today = Date.now();
  return today;
};

export const getTimeAfterTenMinutes = () => {
  var timeAfterTenMinutes = Date.now() + 6000;
  return timeAfterTenMinutes;
};
