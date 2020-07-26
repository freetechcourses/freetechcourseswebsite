$(document).ready(function () {
  $('.datepicker').datepicker({
    prevText: '<i class="fa fa-fw fa-angle-left"></i>',
    nextText: '<i class="fa fa-fw fa-angle-right"></i>',
  });
});

(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/latest`, { method: 'GET' })
    ).json();

    // Displaying blogs
    displayBlogs(response.data);
  } catch (err) {
    console.log(err);
  }
})();
