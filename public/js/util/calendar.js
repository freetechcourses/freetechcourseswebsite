// class Cal {
//   constructor(divId) {
//     //Store div id
//     this.divId = divId;

//     // Days of week, starting on Sunday
//     this.DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     // Months, stating on January
//     this.Months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];

//     // Set the current month, year
//     let d = new Date();

//     this.currMonth = d.getMonth();
//     this.currYear = d.getFullYear();
//     this.currDay = d.getDate();

//     // Set the url
//     this.Url = `${url}/blog/alldates`;

//     // Set Blog dates list to an empty array
//     this.blogDatesList = [];
//   }

//   // Get blog dates
//   getBlogDates() {
//     fetch(this.Url, { method: 'GET' })
//       .then((response) => response.json())
//       .then((blogDatesList) => {
//         this.blogDatesList = blogDatesList.allDates.map((blogDate) =>
//           new Date(blogDate).getDate()
//         );
//         console.log(this.blogDatesList);
//         this.showMonth(this.currYear, this.currMonth, this.blogDatesList);
//       });
//   }

//   // Goes to next month
//   nextMonth() {
//     if (this.currMonth == 11) {
//       this.currMonth = 0;
//       this.currYear = this.currYear + 1;
//     } else {
//       this.currMonth = this.currMonth + 1;
//     }
//     this.showcurr();
//   }

//   // Goes to previous month
//   previousMonth() {
//     if (this.currMonth == 0) {
//       this.currMonth = 11;
//       this.currYear = this.currYear - 1;
//     } else {
//       this.currMonth = this.currMonth - 1;
//     }
//     this.showcurr();
//   }

//   // Show current month
//   showcurr() {
//     this.getBlogDates();
//   }

//   // Show month (year, month)
//   showMonth(y, m, blogDates) {
//     let d = new Date(),
//       // First day of the week in the selected month
//       firstDayOfMonth = new Date(y, m, 1).getDay(),
//       // Last day of the selected month
//       lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
//       // Last day of the previous month
//       lastDayOfLastMonth =
//         m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

//     let html = '<table>';

//     // Write selected month and year
//     html += '<thead><tr>';
//     html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
//     html += '</tr></thead>';

//     // Write the header of the days of the week
//     html += '<tr class="days">';
//     for (let i = 0; i < this.DaysOfWeek.length; i++) {
//       html += '<td>' + this.DaysOfWeek[i] + '</td>';
//     }
//     html += '</tr>';

//     // Write the days
//     let i = 1;
//     do {
//       let dow = new Date(y, m, i).getDay();

//       // If Sunday, start new row
//       if (dow == 0) {
//         html += '<tr>';
//       }
//       // If not Sunday but first day of the month
//       // it will write the last days from the previous month
//       else if (i == 1) {
//         html += '<tr>';
//         let k = lastDayOfLastMonth - firstDayOfMonth + 1;
//         for (let j = 0; j < firstDayOfMonth; j++) {
//           html += '<td class="not-current">' + k + '</td>';
//           k++;
//         }
//       }

//       console.log(blogDates);

//       // Write the current day in the loop
//       let chk = new Date();
//       let chkY = chk.getFullYear();
//       let chkM = chk.getMonth();

//       if (
//         chkY == this.currYear &&
//         chkM == this.currMonth &&
//         i == this.currDay &&
//         i == blogDates[1]
//       ) {
//         html += `<td
//             class="today"
//             id=${new Date(chkY, chkM, i).getTime()}
//           >
//             <a
//               type="button"
//               class="text-dark card-link"
//               href="#"
//             >
//               ${i}
//             </a>
//           </td>`;
//       } else {
//         html += `<td
//             class="normal"
//             id=${new Date(chkY, chkM, i).getTime()}
//           >
//             <a
//               type="button"
//               class="card-link text-secondary"
//               href="#"
//             >
//               ${i}
//             </a>
//           </td>`;
//       }

//       // If Saturday, closes the row
//       if (dow == 6) {
//         html += '</tr>';
//       }
//       // If not Saturday, but last day of the selected month
//       // it will write the next few days from the next month
//       else if (i == lastDateOfMonth) {
//         let k = 1;
//         for (dow; dow < 6; dow++) {
//           html += '<td class="not-current">' + k + '</td>';
//           k++;
//         }
//       }

//       i++;
//     } while (i <= lastDateOfMonth);

//     blogDates.filter((date) => {
//       if (date) {
//         html += `<td
//             class="normal"
//             id=${new Date(
//               new Date(Date.now()).getFullYear(),
//               new Date(Date.now()).getMonth(),
//               date
//             ).getTime()}
//           >
//             <a
//               type="button"
//               class="card-link text-secondary"
//               href="#"
//             >
//               ${date}
//             </a>
//           </td>`;
//       }
//     });

//     // Closes table
//     html += '</table>';

//     // Write HTML to the div
//     document.getElementById(this.divId).innerHTML = html;
//   }
// }
// // On Load of the window
// (async () => {
//   // Start calendar
//   let c = new Cal('divCal');
//   c.showcurr();

//   // Bind next and previous button clicks
//   getId('btnNext').onclick = function () {
//     c.nextMonth();
//   };
//   getId('btnPrev').onclick = function () {
//     c.previousMonth();
//   };
// })();

// // Get element by id
// function getId(id) {
//   return document.getElementById(id);
// }
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
        link.setAttribute('href', '#');
        link.classList.add('card-link', 'text-secondary');
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          link.classList.add('h4');
        }
        link.appendChild(cellText);
        cell.appendChild(link);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}

// Getting blog dates
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/alldates`, { method: 'GET' })
    ).json();
    const blogDates = response.allDates.map((date) => new Date(date).getDate());
    console.log(blogDates);
    [...document.getElementsByTagName('a')].filter((link, index) => {
      if (blogDates.includes(parseInt(link.innerText))) {
        console.log(link);
        link.classList.add('badge', 'badge-secondary', 'text-light');
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
