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

  console.log(languages);

  $(document).ready(function () {
    $('.sel').chosen({ width: '300px' });
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

      const title = document.querySelector('#title').value;
      const description = document.querySelector('#description').value;
      const date = document.querySelector('#date').value;
      const keywords = document.querySelector('#keywords');

      console.log(keywords);
    } catch (err) {}
  });
