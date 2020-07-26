// Displaying all blogs
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

// removing blog dates stored in localstorage
function removeBlogDate() {
  localStorage.removeItem('blogDate');
}
