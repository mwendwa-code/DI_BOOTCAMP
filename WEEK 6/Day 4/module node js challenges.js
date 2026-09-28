// Exercise 1: Time until January 1st
function timeUntilJan1st() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const jan1st = new Date(`January 1, ${nextYear} 00:00:00`);

  const diffMs = jan1st - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const pad = (num) => String(num).padStart(2, '0');

  return `The 1st January is in ${days} days and ${pad(hours)}:${pad(minutes)}:${pad(seconds)} hours.`;
}

// Exercise 2: Minutes lived from birthdate
function minutesLived(birthdateStr = '1995-05-15') {
  const birthdate = new Date(birthdateStr);
  const now = new Date();

  const diffMs = now - birthdate;
  const minutes = Math.floor(diffMs / (1000 * 60));

  return `You have lived ${minutes.toLocaleString()} minutes.`;
}

// Exercise 3: Time until next holiday
function timeUntilNextHoliday(holidayName = "New Year's Day", holidayDateStr = `${new Date().getFullYear() + 1}-01-01`) {
  const now = new Date();
  const holidayDate = new Date(holidayDateStr);

  const diffMs = holidayDate - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const pad = (num) => String(num).padStart(2, '0');
  const todayFormatted = now.toISOString().split('T')[0];

  return `Today is ${todayFormatted}. The next holiday (${holidayName}) is in ${days} days and ${pad(hours)}:${pad(minutes)}:${pad(seconds)} hours.`;
}

module.exports = {
  timeUntilJan1st,
  minutesLived,
  timeUntilNextHoliday
};