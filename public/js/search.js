(async () => {
  // Getting keywords
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords.sort();

  // Add keywords to multi-select option
  keywords.forEach((keyword) => {
    let option = `<option value="${keyword}" style="font-size: 10px;">${keyword}</option>`;
    $('select').append(option);
  });

  $('select').selectpicker('refresh');
})();

// Search bar request for new/searched courses
document.getElementById('search-button').addEventListener('click', async () => {
  try {
    const oldKeywords = document.querySelector('#search-courses');
    const keywords = [...oldKeywords.selectedOptions].map(
      (option) => option.value
    );

    // Emptying parent div to accomodate new courses
    $('#display-courses').empty();

    // Getting searched courses
    const response = await (
      await fetch(`${url}/course/search`, {
        method: 'POST',
        body: JSON.stringify({ keywords }),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    // Displaying searched courses
    displayCourses(response.data);
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler, 5000);
  }
});
