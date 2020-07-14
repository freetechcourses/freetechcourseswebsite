$(document).ready(function () {
  $('.sel').chosen({ width: '400px' });
})

$('#myForm').on('submit', function (e) {
  $('#deleteModal').modal('show');
  e.preventDefault();
});