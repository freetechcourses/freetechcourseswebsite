// Getting latest courses
(async () => {
  try {
    // Getting latest courses
    const response = await (
      await fetch(`${url}/course/latest`, { method: 'GET' })
    ).json();

    // Displaying latest courses
    displayCourses(response.data);
  } catch (err) {
    console.log(err);
  }
})();


