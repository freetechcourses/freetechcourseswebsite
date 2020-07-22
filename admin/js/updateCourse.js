// Get details for a single course
(async () => {
  try {
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
      $(document).ready(function () {
        $('.sel').chosen({ width: '100%' });
      });
      let keywordSelector = document.querySelector('#keywords');
      for (let i = 0; i < response.data.keywords.length; i++) {
        let option = document.createElement('option');
        option.value = response.data.keywords[i];
        option.innerHTML = response.data.keywords[i];
        option.selected = true;
        keywordSelector.appendChild(option);
        keywordSelector.style = null;
      }
      let languageSelector = document.querySelector('#languages');
      for (let i = 0; i < response.data.languages.length; i++) {
        let option = document.createElement('option');
        option.value = response.data.languages[i];
        option.innerHTML = response.data.languages[i];
        option.selected = true;
        languageSelector.appendChild(option);
        languageSelector.style = null;
      }
      document.getElementById('course-link').value = response.data.hyperlink;
      document.getElementById('img-link').value = response.data.courseImage;
    }
  } catch (err) {
    console.log(err);
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
      console.log(err);
    }
  });

// Removing Id from session storage
document.getElementById('go-back').addEventListener('click', () => {
  sessionStorage.removeItem('id');
});
