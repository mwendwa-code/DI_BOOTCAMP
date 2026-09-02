// Exercise 1: Random Number
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random number: ${randomNumber}`);
console.log('Even numbers from 0 to the random number:');

for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Exercise 2: Capitalized letters
function capitalizeLetters(str) {
  const normalized = str.toLowerCase();

  const evenCapitalized = [...normalized]
    .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char))
    .join('');

  const oddCapitalized = [...normalized]
    .map((char, index) => (index % 2 !== 0 ? char.toUpperCase() : char))
    .join('');

  return [evenCapitalized, oddCapitalized];
}

console.log(capitalizeLetters('abcdef'));

// Exercise 3: Is palindrome?
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindrome('madam'));
console.log(isPalindrome('hello'));

// Exercise 4: Biggest Number
function biggestNumberInArray(arrayNumber) {
  if (!Array.isArray(arrayNumber) || arrayNumber.length === 0) {
    return 0;
  }

  const validNumbers = arrayNumber.filter(
    (value) => typeof value === 'number' && Number.isFinite(value)
  );

  if (validNumbers.length === 0) {
    return 0;
  }

  return Math.max(...validNumbers);
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99]));
console.log(biggestNumberInArray(['a', 3, 4, 2]));
console.log(biggestNumberInArray([]));

// Exercise 5: Unique Elements
function uniqueElements(array) {
  return [...new Set(array)];
}

console.log(uniqueElements([1, 2, 3, 3, 3, 3, 4, 5]));

// Exercise 6: Calendar
function createCalendar(year, month) {
  const calendarTable = document.createElement('table');
  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const headerRow = document.createElement('tr');
  weekdayNames.forEach((dayName) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = dayName;
    headerRow.appendChild(headerCell);
  });
  calendarTable.appendChild(headerRow);

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const startDayOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const totalDays = lastDayOfMonth.getDate();

  let currentRow = document.createElement('tr');

  for (let i = 0; i < startDayOffset; i++) {
    const emptyCell = document.createElement('td');
    currentRow.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day++) {
    if (currentRow.children.length === 7) {
      calendarTable.appendChild(currentRow);
      currentRow = document.createElement('tr');
    }

    const dayCell = document.createElement('td');
    dayCell.textContent = day;
    currentRow.appendChild(dayCell);
  }

  while (currentRow.children.length < 7) {
    const emptyCell = document.createElement('td');
    currentRow.appendChild(emptyCell);
  }

  calendarTable.appendChild(currentRow);
  document.body.appendChild(calendarTable);

  return calendarTable;
}

if (typeof document !== 'undefined') {
  createCalendar(2012, 9);
}
