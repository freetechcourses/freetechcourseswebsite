// Getting all keywords and course details from backend
(async () => {
  try {
    // Getting keywords
    const keywordResponse = await (
      await fetch(`${url}/course/keywords`, { method: 'GET' })
    ).json();

    const keywords = await keywordResponse.allKeywords.sort();

    $(document).ready(function () {
      $('.sel').chosen({ width: '100%', padding: '100px' });
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

    // Getting latest courses
    const courseResponse = await (
      await fetch(`${url}/course/latest`, { method: 'GET' })
    ).json();

    for (let i = 0; i < courseResponse.data.length; i++) {
      const courseCard = `<div class="col-lg-4 col-sm-6 mb-4">
                            <div class="card" id=${courseResponse.data[i]._id} data-target="#details" data-toggle="modal">
                              <img class="card-img-top" src=${courseResponse.data[i].courseImage} alt=${courseResponse.data[i].name} />
                              <div class="card-body">
                                <h5 class="card-title course-name">${courseResponse.data[i].name}</h5>
                                <p class="card-text">
                                  ${courseResponse.data[i].description}
                                </p>
                                <p>
                                  <a href=${courseResponse.data[i].hyperlink} target="_blank" class="card-link">
                                    <strong>Course link</strong><br />
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>`;
      $('#display-courses').append(courseCard);

      // Getting more info about a individual course in a modal
      document
        .getElementById(`${courseResponse.data[i]._id}`)
        .addEventListener('click', async () => {
          try {
            const courseDetailsResponse = await (
              await fetch(
                `${url}/course/single/${courseResponse.data[i]._id}`,
                { method: 'GET' }
              )
            ).json();

            const detailsInfo = `<img 
                                    alt=${courseDetailsResponse.data.name} 
                                    class="img-fluid" 
                                    src=${
                                      courseDetailsResponse.data.courseImage
                                    }
                                  />
                                  <a href=${
                                    courseDetailsResponse.data.hyperlink
                                  } target="_blank" class="card-link">
                                    <h3 class="pt-4">${
                                      courseDetailsResponse.data.name
                                    }</h3>
                                  </a>
                                  <p class="lead">
                                    ${courseDetailsResponse.data.description}
                                  </p>
                                  <p>
                                    <strong>Date:</strong> 
                                    ${new Date(
                                      courseDetailsResponse.data.date
                                    ).toDateString()}
                                  </p>
                                  <p>
                                    <a href=${
                                      courseDetailsResponse.data.hyperlink
                                    } target="_blank" class="card-link">
                                      <strong>Course link</strong> 
                                    </a>
                                  </p>
                                  `;
            $('#details-body').html(detailsInfo);
          } catch (err) {
            console.log(err);
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
})();

document.getElementById('search-button').addEventListener('click', async () => {
  try {
    const oldKeywords = document.querySelector('#search-courses');
    const keywords = [...oldKeywords.selectedOptions].map(
      (option) => option.value
    );

    $('#display-courses').empty();

    const response = await (
      await fetch(`${url}/course/search`, {
        method: 'POST',
        body: JSON.stringify({ keywords }),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    for (let i = 0; i < response.data.length; i++) {
      const courseCard = `<div class="col-lg-4 col-sm-6 mb-4">
                            <div class="card" id=${response.data[i]._id} data-target="#details" data-toggle="modal">
                              <img class="card-img-top" src=${response.data[i].courseImage} alt=${response.data[i].name} />
                              <div class="card-body">
                                <h5 class="card-title course-name">${response.data[i].name}</h5>
                                <p class="card-text">
                                  ${response.data[i].description}
                                </p>
                                <p>
                                  <a href=${response.data[i].hyperlink} target="_blank" class="card-link">
                                    <strong>Course link</strong><br />
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>`;
      $('#display-courses').append(courseCard);

      // Getting more info about a individual course in a modal
      document
        .getElementById(`${response.data[i]._id}`)
        .addEventListener('click', async () => {
          try {
            const courseDetailsResponse = await (
              await fetch(`${url}/course/single/${response.data[i]._id}`, {
                method: 'GET',
              })
            ).json();

            const detailsInfo = `<img 
                                    alt=${courseDetailsResponse.data.name} 
                                    class="img-fluid" 
                                    src=${
                                      courseDetailsResponse.data.courseImage
                                    }
                                  />
                                  <a href=${
                                    courseDetailsResponse.data.hyperlink
                                  } target="_blank" class="card-link">
                                    <h3 class="pt-4">${
                                      courseDetailsResponse.data.name
                                    }</h3>
                                  </a>
                                  <p class="lead">
                                    ${courseDetailsResponse.data.description}
                                  </p>
                                  <p>
                                    <strong>Date:</strong> 
                                    ${new Date(
                                      courseDetailsResponse.data.date
                                    ).toDateString()}
                                  </p>
                                  <p>
                                    <a href=${
                                      courseDetailsResponse.data.hyperlink
                                    } target="_blank" class="card-link">
                                      <strong>Course link</strong> 
                                    </a>
                                  </p>
                                  `;
            $('#details-body').html(detailsInfo);
          } catch (err) {
            console.log(err);
          }
        });
    }
  } catch (err) {}
});
