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

  // Add keywords to multi-select option
  keywords.forEach((keyword) => {
    if (keyword) {
      let option = `<option value="${keyword}" style="font-size: 13px;">${keyword}</option>`;
      $('#keywords').append(option);
    }
  });

  $('#keywords').selectpicker('refresh');

  // Add languages to multi-select option
  languages.forEach((language) => {
    if (language) {
      let option = `<option value="${language}" style="font-size: 13px;">${language}</option>`;
      $('#languages').append(option);
    }
  });

  $('#languages').selectpicker('refresh');
})();
