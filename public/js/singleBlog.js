// Display single blog
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/single/${localStorage.getItem('id')}`, {
        method: 'GET',
      })
    ).json();

    // Displaying single blog
    displaySingleBlog(response);

    // Updating breadcrumb
    if (localStorage.getItem('blogDate')) {
      document.getElementById('blog-by-date').innerText = `Blogs on ${new Date(
        parseInt(localStorage.getItem('blogDate'))
      ).toDateString()}`;
    } else {
      document.getElementById('no-display').style.display = 'none';
    }
  } catch (err) {
    alert('Something went wrong:/\nPlease try again in a short while!');
  }
})();

// removing blog dates stored in localstorage
function removeBlogDate() {
  localStorage.removeItem('blogDate');
}
