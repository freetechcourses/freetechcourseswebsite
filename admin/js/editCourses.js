(async () => {
  // Getting keywords
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords.sort();

  // Removing delete button from DOM
  document.querySelector('#delete-courses').style.display = 'none';

  // Add keywords to multi-select option
  keywords.forEach((keyword) => {
    if (keyword) {
      let option = `<option value="${keyword}" style="font-size: 13px;">${keyword}</option>`;
      $('select').append(option);
    }
  });

  $('select').selectpicker('refresh');
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

    // Appending delete button to DOM
    document.querySelector('#delete-courses').style.display = 'inline';

    // Getting searched courses
    const response = await (
      await fetch(`${url}/course/search`, {
        method: 'POST',
        body: JSON.stringify({ keywords }),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    $('#search-for-courses').remove();

    if (response.data.length) {
      for (let i = 0; i < response.data.length; i++) {
        const courses = ` <tr id=${i}>
        <td>
          <div class="form-check">
            <input 
              class="form-check-input position-static" 
              type="checkbox" 
              value=${response.data[i]._id}
            />
          </div>
        </td>
        <td scope="row">${i + 1}</td>
        <td>${response.data[i].name}</td>
        <td>
          <a href=${response.data[i].hyperlink} target="_blank">
            Course Link
          </a>
        </td>
        <td>
          <a 
            type="button" 
            class="btn btn-success btn-sm safari-issue" 
            href="update-course.html" 
            onclick="update('${response.data[i]._id}')"
          >
            Update
          </a>
        </td>
      </tr>`;
        $('#courses').append(courses);
      }
    } else {
      document.querySelector('#no-courses').style.display = 'block';
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
});

deleteModal(
  'delete-courses-modal',
  'delete-selected-courses',
  'Course',
  'course',
  '/edit-courses.html'
);

// Setting course id in session storage
function update(id) {
  sessionStorage.setItem('id', id);
}
