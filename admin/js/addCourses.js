$(document).ready(function () {
  $('.sel').chosen({ width: '300px' });
})

$('#myForm').on('submit', function (e) {
  $('#successModal').modal('show');
  e.preventDefault();
});
