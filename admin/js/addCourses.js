$(document).ready(function () {
  $('.sel').chosen({ width: '300px' });
});

$('#myForm').on('submit', function (e) {
  $('#successModal').modal('show');
  e.preventDefault();
});

// Request to add a new course to backend
document
  .getElementById('add-course-button')
  .addEventListener('click', async () => {
    try {
    } catch (err) {}
  });
