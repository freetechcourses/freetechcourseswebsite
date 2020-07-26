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
  } catch (err) {
    console.log(err);
  }
})();
