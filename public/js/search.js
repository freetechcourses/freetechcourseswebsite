(async () => {
  // Getting keywords
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords.sort();

  // Add keywords to multi-select option
  keywords.forEach((keyword) => {
    if (keyword) {
      let option = `<option value="${keyword}" style="font-size: 12px;">${keyword}</option>`;
      $('#search-courses').append(option);
    }
  });

  $('#search-courses').selectpicker('refresh');
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
    $('#language-faucet').empty();

    // Getting searched courses
    const response = await (
      await fetch(`${url}/course/search`, {
        method: 'POST',
        body: JSON.stringify({ keywords }),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    // Displaying searched courses
    displayCourses(response.data, 'search');

    const languageSection = `<div class="col-2">
          <div class="row justify-content-center mb-4 p-2">
            <p class="lead text-center disappear-on-no-search1"></p>
          </div>
          <div class="row">
            <div class="card mt-4 ml-3 mr-3 languages">
              <div class="card-header">Languages</div>
              <div class="card-body d-flex-column" id="language-faucet"></div>
            </div>
          </div>
        </div>`;

    $('#language-section').prepend(languageSection);

    for (let i = 0; i < response.langs.length; i++) {
      const checkbox = `<div class="form-check">
                          <input class="form-check-input" type="checkbox" value=${response.langs[i]} id=${response.langs[i]}>
                          <label class="form-check-label" for=${response.langs[i]}>
                            ${response.langs[i]}
                          </label>
                        </div>`;
      $('#language-faucet').append(checkbox);
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler, 5000);
  }
});
