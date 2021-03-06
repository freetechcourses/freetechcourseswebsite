const displayBlogs = (data) => {
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      const blog = `<h2 class="pt-3" id=${data[i]._id}>
          ${data[i].title}
          </h2>
          <hr />
          <div class="pl-4 pr-4 row justify-content-between align-items-center">
            <p class="text-muted">
              Posted on 
              Date: ${new Date(data[i].date).toDateString()} 
            </p>
            ${
              data[i].pin ? '<p><i class="fas fa-thumbtack fa-sm"></i></p>' : ''
            }
          </div>
          <hr />
          <img
            alt=${data[i].title} 
            src=${data[i].blogImage} 
            class="rounded mx-auto img-fluid"
          />
          <hr />
          <div class="card-text">
            ${data[i].body}
          </div>
          <a 
            class="btn text-info mt-3 safari-issue"
            href="single-blog.html"
            onclick="blogInfo('${data[i]._id}')"
          >
            Read More
          </a>
          <hr />`;
      $('#blogs').append(blog);

      if (data[i].pin) {
        const pinnedBlogs = `<a
                            href="single-blog.html"
                            class="list-group-item list-group-item-action p-1 flex-column align-items-start"
                            onclick="blogInfo('${data[i]._id}')"
                          >
                              <div class="d-flex w-100 justify-content-between">
                                <small style="font-size: 14px;">${
                                  data[i].title
                                }</small>
                                <div class="badge">
                                  <small style="font-size: 10px;">
                                    ${Math.round(
                                      Math.abs(
                                        (new Date() - new Date(data[i].date)) /
                                          (24 * 60 * 60 * 1000)
                                      )
                                    )} days ago
                                  </small>
                                </div>
                              </div>
                          </a>`;
        $('#pinned-blogs').append(pinnedBlogs);
      }
    }
  } else {
    document.getElementById('no-blogs').style.display = 'block';
    document.getElementById('no-blogs-text').style.display = 'block';
  }
};

function blogInfo(id) {
  localStorage.setItem('id', id);
}
