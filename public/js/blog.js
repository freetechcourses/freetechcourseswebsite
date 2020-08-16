// Displaying all blogs
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/latest`, { method: 'GET' })
    ).json();

    // Sortings blogs in descending order of time
    response.data.sort((a, b) => {
      return b.date - a.date;
    });

    // Displaying blogs and pinned blogs list
    displayBlogs(response.data);
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
})();

// removing blog dates stored in localstorage
function removeBlogDate() {
  localStorage.removeItem('blogDate');
}
