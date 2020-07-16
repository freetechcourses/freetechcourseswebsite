$(document).ready(function () {
  $('.sel').chosen({ width: '300px' });
});

$('#myForm').on('submit', function (e) {
  $('#successModal').modal('show');
  e.preventDefault();
});

// Get all keywords
window.onload = async () => {
  const response = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const keywords = await response.allKeywords;

  console.log(response.allKeywords);

  let keywordsSelector = document.querySelector('#keywords');
  for (let i = 0; i < keywords.length; i++) {
    let option = document.createElement('option');
    option.value = keywords[i];
    option.innerHTML = keywords[i];
    keywordsSelector.appendChild(option);
    // keywordsSelector.add(new Option(keywords[i]));
    keywordsSelector.style = null;
  }

  console.log(keywordsSelector);
};

// Request to add a new course to backend
document
  .getElementById('add-course-button')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const select = document.querySelector('#technology').value;

      console.log(typeof select);
    } catch (err) {}
  });
