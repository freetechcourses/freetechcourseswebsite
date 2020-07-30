const displayBlogs = (data) => {
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      const blog = `<h2 class="pt-3" id=${data[i]._id}>
          ${data[i].title}
          </h2>
          <hr />
          <p class="text-muted">
            Posted on 
            Date: ${new Date(data[i].date).toDateString()} 
          </p>
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
    }
  } else {
    document.getElementById('no-blogs').style.display = 'block';
    document.getElementById('no-blogs-text').style.display = 'block';
  }
};

function blogInfo(id) {
  localStorage.setItem('id', id);
}
