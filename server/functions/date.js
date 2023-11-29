exports.getCurrentDateTimeInJSON = () => {
  const currentDate = new Date();

  const dateJSON = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1, // Note: Month is 0-based, so add 1 to get the actual month.
    year: currentDate.getFullYear(),
  };

  const timeJSON = {
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    second: currentDate.getSeconds(),
  };

  return {
    date: dateJSON,
    time: timeJSON,
  };
};
