// Get blogs by date timestamp
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/bydate/${localStorage.getItem('blogDate')}`, {
        method: 'GET',
      })
    ).json();
    console.log(response);

    // Displaying blogs
    displayBlogs(response.data);

    // Updating breadcrumb
    document.getElementById('blog-by-date').innerText = `Blogs on ${new Date(
      parseInt(localStorage.getItem('blogDate'))
    ).toDateString()}`;
  } catch (err) {
    console.log(err);
  }
})();
