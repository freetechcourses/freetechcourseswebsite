(async () => {
  // Getting keywords
  const keywordResponse = await (
    await fetch(`${url}/course/keywords`, { method: 'GET' })
  ).json();

  const keywords = await keywordResponse.allKeywords.sort();

  $(document).ready(function () {
    $('.sel').chosen({ width: '100%' });
  });

  // Add keywords to multi-select option
  let keywordSelector = document.querySelector('#search-courses');
  for (let i = 0; i < keywords.length; i++) {
    let option = document.createElement('option');
    option.value = keywords[i];
    option.innerHTML = keywords[i];
    keywordSelector.appendChild(option);
    keywordSelector.style = null;
  }
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
        const courses = `<tr>
                        <td scope="row">${i + 1}</td>
                        <td>${response.data[i].name}</td>
                        <td>
                          <a href=${response.data[i].hyperlink} target="_blank">
                            Course Link
                          </a>
                        </td>
                        <td>
                          <div class="dropdown">
                            <a
                              class="btn btn-sm options"
                              type="button"
                              data-toggle="dropdown"
                              href="#"
                            >
                              <i class="fas fa-ellipsis-v"></i>
                            </a>
                            <div class="dropdown-menu">
                              <a
                                href="#"
                                class="dropdown-item"
                                data-toggle="modal"
                                data-target="#update-course-modal"
                              >
                                Update
                              </a>
                              <button
                                href="#"
                                class="dropdown-item"
                                data-toggle="modal"
                                data-target="#delete-course-modal"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>`;
        $('#courses').append(courses);

        deleteModal(
          `${response.data[i]._id}`,
          'Course',
          'course/delete',
          '/edit-courses.html',
          'delete-course-modal'
        );
      }
    } else {
      document.querySelector('#no-courses').style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  }
});
