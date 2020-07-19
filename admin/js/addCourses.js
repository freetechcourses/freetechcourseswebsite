// Get all keywords and languages
window.onload = async () => {
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const languageResponse = await (
    await fetch(`${url}/course/languages`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords;
  const languages = await languageResponse.allLanguages;

  $(document).ready(function () {
    $('.sel').chosen({ width: '100%' });
  });

  // Add keywords to multi-select option
  let keywordSelector = document.querySelector('#keywords');
  for (let i = 0; i < keywords.length; i++) {
    let option = document.createElement('option');
    option.value = keywords[i];
    option.innerHTML = keywords[i];
    keywordSelector.appendChild(option);
    keywordSelector.style = null;
  }

  // Add languages to multi-select option
  let languageSelector = document.querySelector('#languages');
  for (let i = 0; i < languages.length; i++) {
    let option = document.createElement('option');
    option.value = languages[i];
    option.innerHTML = languages[i];
    languageSelector.appendChild(option);
    languageSelector.style = null;
  }
};

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

      await (
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
    } catch (err) {
      console.log(err);
    }
  });
