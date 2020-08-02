// Get blogs by date timestamp
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/bydate/${localStorage.getItem('blogDate')}`, {
        method: 'GET',
      })
    ).json();

    // Sortings blogs in descending order of time
    response.data.sort((a, b) => {
      return b.date - a.date;
    });

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
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
})();

// removing blog dates stored in localstorage
function removeBlogDate() {
  localStorage.removeItem('blogDate');
}
