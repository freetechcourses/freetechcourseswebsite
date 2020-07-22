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
    console.log(response);

    if (response.data.length) {
      for (let i = 0; i < response.data.length; i++) {
        const blog = `<h1 class="pt-3" id=${response.data[i]._id}>
          ${response.data[i].title}
          </h1>
          <hr />
          <p class="text-muted">
            Posted on 
            Date: ${new Date(response.data[i].date).toLocaleString()} 
          </p>
          <hr />
          <div class="blog-image mb-3"></div>
          <hr />
          <div>
            ${response.data[i].body}
          </div>
          <hr />`;
        $('#blogs').append(blog);
      }
    } else {
      alert('There are no blogs');
    }
  } catch (err) {
    console.log(err);
  }
})();
