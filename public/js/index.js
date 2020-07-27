// Getting latest courses
(async () => {
  try {
    // Getting latest courses
    const response = await (
      await fetch(`${url}/course/latest`, { method: 'GET' })
    ).json();

    // Displaying latest courses
    displayCourses(response.data, 'latest');
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
})();

// View More
document.getElementById('view-more').addEventListener('click', async () => {
  try {
    // Getting next 6 courses
    const response = await (
      await fetch(`${url}/course/latest?page=${b()}`, { method: 'GET' })
    ).json();

    // Displaying courses
    displayCourses(response.data, 'view-more');

    // Removing View More button if no nextPage === false
    if (!response.nextPage) {
      $('#view-more').remove();
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
});
