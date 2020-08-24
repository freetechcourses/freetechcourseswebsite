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
    $('#language-section').empty();

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

    // Getting Courses from DOM
    const courses = [...document.querySelector('#display-courses').childNodes];

    document.getElementById('show').style.display = 'block';
    // Appending Language Card
    if (response.langs.length) {
      const languageSection = `<div class="card mt-4 languages">
                                <div class="card-header">Languages/Technologies</div>
                                <div class="card-body d-flex-column" id="language-faucet"></div>
                              </div>`;

      $('#language-section').prepend(languageSection);

      // Appending Language checkbox
      for (let i = 0; i < response.langs.length; i++) {
        if (response.langs[i]) {
          const checkbox = `<div class="form-check">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            name="language"
                            value=${response.langs[i]} 
                            id=${response.langs[i]}
                          >
                          <label class="form-check-label" for=${response.langs[i]}>
                            ${response.langs[i]}
                          </label>
                        </div>`;
          $('#language-faucet').append(checkbox);
          document
            .getElementById(response.langs[i])
            .addEventListener('click', function () {
              checkBoxAction(courses);
            });
        }
      }
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler, 5000);
  }
});

const intersect = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true;
    }
  }

  return false;
};

const checkBoxAction = (data) => {
  let checked = [...document.querySelectorAll('input[type="checkbox"]')]
    .filter((elem) => elem.checked)
    .map((elem) => elem.value);

  console.log(checked);

  $('#display-courses').empty();

  data.map((course) => {
    if (!checked.length) {
      $('#display-courses').append(course);
    } else {
      if (intersect(checked, course.dataset.languages)) {
        $('#display-courses').append(course);
      }
    }
  });
};

$(document).ready(function () {
  $('#show').click(function () {
    $('.languages').toggle();
  });
});
