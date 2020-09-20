// Get details for a single course
(async () => {
  try {
    // Getting keywords and languages
    const keywordResponse = await (
      await fetch(`${url}/course/keywords`, { method: 'GET' })
    ).json();

    const languageResponse = await (
      await fetch(`${url}/course/languages`, { method: 'GET' })
    ).json();

    // Getting single course details
    const response = await (
      await fetch(`${url}/course/single/${sessionStorage.getItem('id')}`, {
        method: 'GET',
      })
    ).json();

    if (response.ok) {
      document.getElementById('name').value = response.data.name;

      document.getElementById('description').innerText =
        response.data.description;

      document.getElementById('date').value = new Date(response.data.date)
        .toISOString()
        .split('T')[0];

      // Sorting keywords and languages array
      const keywords = await keywordResponse.allKeywords.sort();
      const languages = await languageResponse.allLanguages.sort();

      // Add keywords to multi-select option
      keywords.forEach((keyword) => {
        if (response.data.keywords.includes(keyword)) {
          if (keyword) {
            let option = `<option value="${keyword}" style="font-size: 13px;" selected>${keyword}</option>`;
            $('#keywords').append(option);
          }
        } else {
          if (keyword) {
            let option = `<option value="${keyword}" style="font-size: 13px;">${keyword}</option>`;
            $('#keywords').append(option);
          }
        }
      });

      $('#keywords').selectpicker('refresh');

      // Add languages to multi-select option
      languages.forEach((language) => {
        if (response.data.languages.includes(language)) {
          if (language) {
            let option = `<option value="${language}" style="font-size: 13px;" selected>${language}</option>`;
            $('#languages').append(option);
          }
        } else {
          if (language) {
            let option = `<option value="${language}" style="font-size: 13px;">${language}</option>`;
            $('#languages').append(option);
          }
        }
      });

      $('#languages').selectpicker('refresh');

      document.getElementById('course-link').value = response.data.hyperlink;

      document.getElementById('img-link').value = response.data.courseImage;
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
})();

// Request to update a new course to backend
document
  .getElementById('update-course-button')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();

      const name = document.querySelector('#name').value;
      const description = document.querySelector('#description').value;
      const date = new Date(document.querySelector('#date').value).getTime();

      const oldKeywords = document.querySelector('#keywords');
      const keywordValues = [...oldKeywords.selectedOptions].map(
        (option) => option.value
      );
      const newKeywords = document.querySelector('#new-keywords').value;
      const newKeywordValues = newKeywords
        .split(',')
        .map((keyword) => keyword.trim());
      const keywords = keywordValues.concat(newKeywordValues);

      const oldLanguages = document.querySelector('#languages');
      const languageValues = [...oldLanguages.selectedOptions].map(
        (option) => option.value
      );
      const newLanguages = document.querySelector('#new-languages').value;
      const newLanguageValues = newLanguages
        .split(',')
        .map((language) => language.trim());
      const languages = languageValues.concat(newLanguageValues);

      const hyperlink = document.querySelector('#course-link').value;
      const courseImage = document.querySelector('#img-link').value;

      await (
        await fetch(`${url}/course/update/${sessionStorage.getItem('id')}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name,
            description,
            date,
            keywords,
            languages,
            hyperlink,
            courseImage,
          }),
          headers: {
            'Content-Type': 'application/json',
            token: `${sessionStorage.getItem('token')}`,
          },
        })
      ).json();
    } catch (err) {
      errorHandler();
      setTimeout(removeErrorHandler(), 5000);
    }
  });

// Removing Id from session storage
document.getElementById('go-back').addEventListener('click', () => {
  sessionStorage.removeItem('id');
});
