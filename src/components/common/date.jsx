export const getTomorrowDate = () => {
  var followingDay = Date.now() + 86400000; // + 1 day in ms = 86400000
  return followingDay;
};

export const getTodaysDate = () => {
  var today = Date.now();
  return today;
};

export const getTimeAfterTenMinutes = () => {
  // var followingDay = Date.now() + 600000;
  var followingDay = Date.now() + 20;

  return followingDay;
};
