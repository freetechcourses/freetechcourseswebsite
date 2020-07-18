// Getting all keywords and course details from backend
window.onload = async () => {
  try {
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

    // Getting latest courses
    const courseResponse = await (
      await fetch(`${url}/course/latest`, { method: 'GET' })
    ).json();

    for (let i = 0; i < courseResponse.data.length; i++) {
      const courseCard = `<div class="col-lg-4 col-sm-6 mb-4" data-id=${courseResponse.data[i]._id}>
                            <div class="card" id=${courseResponse.data[i]._id}>
                              <img class="card-img-top" src=${courseResponse.data[i].courseImage} alt=${courseResponse.data[i].name} />
                              <div class="card-body">
                                <h5 class="card-title">${courseResponse.data[i].name}</h5>
                                <p class="card-text">
                                  ${courseResponse.data[i].description}
                                </p>
                                <p>
                                  <a href=${courseResponse.data[i].hyperlink} target="_blank">
                                    <strong>Course link:</strong><br />
                                  </a>
                                </p>
                                <button 
                                  class="btn btn-info" 
                                  data-toggle="modal" 
                                  data-target="#details" 
                                  id=${courseResponse.data[i]._id}
                                >
                                  More Info
                                </button>
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
                                  <h3 class="pt-4">${
                                    courseDetailsResponse.data.name
                                  }</h3>
                                  <p class="lead">
                                    ${courseDetailsResponse.data.description}
                                  </p>
                                  <p>
                                    <strong>Date:</strong> 
                                    ${new Date(
                                      courseDetailsResponse.data.date
                                    ).toDateString()}<br/>
                                    <a href=${
                                      courseDetailsResponse.data.hyperlink
                                    } target="_blank">
                                      <strong>Course link:</strong> 
                                    </a>
                                  </p>`;
            $('#details-body').html(detailsInfo);
          } catch (err) {
            console.log(err);
          }
        });
    }

    // // Generator function for view more implementation
    // async function* viewMore() {
    //   for (let i = 1; i <= courseResponse.total / 6; i++) {
    //     const response = await (
    //       await fetch(`${url}/course/latest?page=${i}`, { method: 'GET' })
    //     ).json();

    //     yield response.data;
    //   }
    // }

    // let viewMoreCourses = viewMore();

    // // Adding 6 more courses on "View More" click and disabling after data = []
    // document.getElementById('view-more').addEventListener('click', async () => {
    //   for (let i = 0; i < (await viewMoreCourses.value) || 0; i++) {
    //     console.log(await viewMoreCourses.value[i]);
    //     const courseCard = `<div class="col-lg-4 col-sm-6 mb-4" id=${courseResponse.data[i]._id}>
    //                         <div class="card">
    //                           <img class="card-img-top" src=${courseResponse.data[i].courseImage} alt=${courseResponse.data[i].name} />
    //                           <div class="card-body">
    //                             <h5 class="card-title">${courseResponse.data[i].name}</h5>
    //                             <p class="card-text">
    //                               ${courseResponse.data[i].description}
    //                             </p>
    //                             <p class="card-text">
    //                               <strong>Course link:</strong><br />
    //                               <a href=${courseResponse.data[i].hyperlink}>${courseResponse.data[i].hyperlink}</a>
    //                             </p>
    //                           </div>
    //                         </div>
    //                       </div>`;
    //     $('#display-courses').append(courseCard);
    //   }
    //   !(await viewMoreCourses.value)
    //     ? (document.querySelector('#view-more').style.display = 'none')
    //     : null;
    // });
  } catch (err) {
    console.log(err);
  }
};
