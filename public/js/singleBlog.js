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
  } catch (err) {
    alert('Something went wrong:/\nPlease try again in a short while!');
  }
})();
