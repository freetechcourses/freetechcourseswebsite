// Request to add a new course to backend
document
  .getElementById('add-course-button')
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

      const response = await (
        await fetch(`${url}/course/add`, {
          method: 'POST',
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

      if (response.ok) {
        $('#add-courses-form').on('submit', function (e) {
          $('#successModal').modal('show');
          e.preventDefault();
          window.location.href = '/add-courses.html';
        });
      }
    } catch (err) {
      errorHandler();
      setTimeout(removeErrorHandler(), 5000);
    }
  });
