$(document).ready(function () {
  $('.sel').chosen({ width: '300px' }).trigger("chosen:updated");
});

$('#myForm').on('submit', function (e) {
  $('#successModal').modal('show');
  e.preventDefault();
});

// Request to add a new course to backend
document
  .getElementById('add-course-button')
  .addEventListener('click', async (e) => {
    try {

      e.preventDefault();
      const select = document.querySelector('#technology').value;

      console.log(typeof select);
    } catch (err) {}
  });


