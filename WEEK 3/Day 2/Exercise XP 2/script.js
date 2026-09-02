const div = document.getElementById('container');
console.log(div);

const lists = document.querySelectorAll('.list');

if (lists.length >= 2) {
  const firstList = lists[0].querySelectorAll('li');
  const secondList = lists[1].querySelectorAll('li');

  // Change "Pete" to "Richard"
  if (firstList[1]) {
    firstList[1].textContent = 'Richard';
  }

  // Delete the second <li> of the second <ul>
  if (secondList[1]) {
    secondList[1].remove();
  }

  // Change the first <li> of each <ul> to your name
  lists.forEach((list) => {
    const firstItem = list.querySelector('li');
    if (firstItem) {
      firstItem.textContent = 'Your Name';
    }
  });
}

// Add class to both <ul>
lists.forEach((list) => {
  list.classList.add('student_list');
});

// Add classes to first <ul>
if (lists[0]) {
  lists[0].classList.add('university', 'attendance');
}

// Add background and padding to the div
if (div) {
  div.style.backgroundColor = 'lightblue';
  div.style.padding = '10px';
}

// Hide the li containing Dan
const danItem = Array.from(document.querySelectorAll('li')).find(
  (li) => li.textContent.trim() === 'Dan'
);
if (danItem) {
  danItem.style.display = 'none';
}

// Add border to Richard
const richardItem = Array.from(document.querySelectorAll('li')).find(
  (li) => li.textContent.trim() === 'Richard'
);
if (richardItem) {
  richardItem.style.border = '2px solid black';
}

// Change font size of whole body
document.body.style.fontSize = '20px';

// Bonus: alert if div background color is light blue
const divStyle = div ? getComputedStyle(div).backgroundColor : '';
if (divStyle === 'rgb(173, 216, 230)' || divStyle === 'lightblue') {
  const visibleUsers = Array.from(document.querySelectorAll('li'))
    .map((li) => li.textContent.trim())
    .filter((name) => name && name !== 'Dan');

  if (visibleUsers.length >= 2) {
    alert(`Hello ${visibleUsers[0]} and ${visibleUsers[1]}`);
  }
}
