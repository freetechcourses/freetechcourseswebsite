const displaySingleBlog = (response) => {
  if (response.ok) {
    const blog = `<h2 class="pt-3" id="${response.data._id}">
            ${response.data.title}
          </h2>
          <hr />
          <p class="text-muted">
            Posted on Date: ${new Date(response.data.date).toDateString()}
          </p>
          <hr />
          <img
            alt=${response.data.title} 
            src=${response.data.blogImage} 
            class="rounded mx-auto img-fluid"
          />
          <hr />
          <div>
            ${response.data.body}
          </div>
          <hr />`;
    $('#single-blog').append(blog);
  }
};
