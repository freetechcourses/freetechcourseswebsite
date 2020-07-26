// Get blogs by date timestamp
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/bydate/${localStorage.getItem('blogDate')}`, {
        method: 'GET',
      })
    ).json();

    // Displaying blogs
    displayBlogs(response.data);

    // Updating breadcrumb
    if (localStorage.getItem('blogDate')) {
      document.getElementById('blog-by-date').innerText = `Blogs on ${new Date(
        parseInt(localStorage.getItem('blogDate'))
      ).toDateString()}`;
    } else {
      null;
    }
  } catch (err) {
    console.log(err);
  }
})();

// removing blog dates stored in localstorage
function removeBlogDate() {
  localStorage.removeItem('blogDate');
}
