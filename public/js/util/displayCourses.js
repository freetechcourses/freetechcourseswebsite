const displayCourses = (data, type) => {
  if (data.length) {
    document.querySelector('#no-results').style.display = 'none';

    for (let i = 0; i < data.length; i++) {
      const languages = data[i].languages.filter((language) => language !== '');

      const courseCard = `<div 
                            class="col-lg-4 col-sm-6 mb-4" 
                            data-languages="${languages}">
                              <div class="card course" id=${data[i]._id} data-target="#details" data-toggle="modal">
                                <img class="card-img-top" src=${data[i].courseImage} alt=${data[i].name} />
                                <div class="card-body">
                                  <h5 class="card-title course-name">${data[i].name}</h5>
                                  <p class="card-text">
                                    ${data[i].description}
                                  </p>
                                  <p>
                                    <a href=${data[i].hyperlink} target="_blank" class="card-link">
                                      <strong>Course link</strong><br />
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>`;
      $('#display-courses').append(courseCard);

      // Getting more info about a individual course in a modal

      document
        .getElementById(`${data[i]._id}`)
        .addEventListener('click', async () => {
          try {
            const response = await (
              await fetch(`${url}/course/single/${data[i]._id}`, {
                method: 'GET',
              })
            ).json();

            const detailsInfo = `<img 
                                      alt=${response.data.name} 
                                      class="img-fluid" 
                                      src=${response.data.courseImage}
                                    />
                                    <a href=${
                                      response.data.hyperlink
                                    } target="_blank" class="card-link">
                                      <h3 class="pt-4">${
                                        response.data.name
                                      }</h3>
                                    </a>
                                    <p class="lead">
                                      ${response.data.description}
                                    </p>
                                    <p>
                                      <strong>Date:</strong> 
                                      ${new Date(
                                        response.data.date
                                      ).toDateString()}
                                    </p>
                                    <p>
                                      <a href=${
                                        response.data.hyperlink
                                      } target="_blank" class="card-link">
                                        <strong>Course link</strong> 
                                      </a>
                                    </p>
                                    `;
            $('#details-body').html(detailsInfo);
          } catch (err) {
            errorHandler();
            setTimeout(removeErrorHandler(), 5000);
          }
        });
    }
  } else {
    if (type === 'latest' || type === 'search') {
      document.querySelector('#no-results').style.display = 'block';
      document.querySelector('.disappear-on-no-search').style.display = 'none';
    }
  }
};
