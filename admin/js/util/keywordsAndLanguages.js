// Get all keywords and languages
(async () => {
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const languageResponse = await (
    await fetch(`${url}/course/languages`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords.sort();
  const languages = await languageResponse.allLanguages.sort();

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
})();