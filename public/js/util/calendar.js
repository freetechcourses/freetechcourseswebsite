// Calendar made using JS
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById('calendar-body'); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = '';

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + ' ' + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement('tr');

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement('td');
        let link = document.createElement('A');
        cell.classList.add('text-center');
        link.setAttribute('type', 'button');
        link.setAttribute('href', 'blog-by-date.html');
        link.classList.add('card-link', 'text-secondary', 'safari-issue');
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          link.classList.add('h6');
        }
        link.appendChild(cellText);
        cell.appendChild(link);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }

  // Getting blog dates
  (async () => {
    try {
      const response = await (
        await fetch(`${url}/blog/alldates`, { method: 'GET' })
      ).json();

      // Coverting blog dates to concatenated numbers
      const blogDates = response.allDates.map((date) =>
        parseInt(
          new Date(date).getFullYear().toString() +
            new Date(date).getMonth().toString() +
            new Date(date).getDate().toString()
        )
      );

      // Adding different class to dates having blogs
      [...document.getElementsByTagName('a')].filter((link, index) => {
        if (
          blogDates.includes(
            parseInt(
              currentYear.toString() + currentMonth.toString() + link.innerText
            )
          )
        ) {
          link.classList.add(
            'badge',
            'badge-secondary',
            'text-light',
            'text-center'
          );
        }
      });

      // Setting id and other attributes to dates having blogs
      [...document.querySelectorAll('.badge')].map((badge) => {
        const blogDate = new Date(
          new Date(Date.now()).getFullYear(),
          new Date(Date.now()).getMonth(),
          parseInt(badge.innerText) + 1
        ).getTime();
        badge.id = blogDate;
        badge.setAttribute('onclick', `getBlogByDate('${blogDate}')`);
      });
    } catch (err) {
      errorHandler();
      setTimeout(removeErrorHandler(), 5000);
    }
  })();
}

function getBlogByDate(blogDate) {
  localStorage.setItem('blogDate', blogDate);
}
