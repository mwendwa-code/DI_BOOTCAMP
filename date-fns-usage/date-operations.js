const { addDays, format, isValid } = require('date-fns');

function displayDateOperations() {
  const now = new Date();
  const futureDate = addDays(now, 5);
  const formattedDate = format(futureDate, 'yyyy-MM-dd');

  console.log('Current date:', format(now, 'yyyy-MM-dd HH:mm:ss'));
  console.log('Date after 5 days:', formattedDate);
  console.log('Is valid date:', isValid(futureDate));
}

module.exports = { displayDateOperations };
