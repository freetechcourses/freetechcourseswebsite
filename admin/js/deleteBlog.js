// Getting single blog details
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/single/${sessionStorage.getItem('blogId')}`, {
        method: 'GET',
      })
    ).json();

    console.log(response);
    if (response.ok) {
      const blog = `<h2>${response.data.title}</h2>
                  <img 
                    alt=${response.data.title} 
                    src=${response.data.blogImage} 
                    class="rounded mx-auto img-fluid"
                  />
                  <p class="lead">${response.data.body}</p>`;
      $('#blog-content').append(blog);
    } else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Deleting blog request
document.getElementById('delete-blog').addEventListener('click', async () => {
  try {
    await (
      await fetch(`${url}/blog/delete/${sessionStorage.getItem('blogId')}`, {
        method: 'DELETE',
        headers: { token: `${sessionStorage.getItem('token')}` },
      })
    ).json();
  } catch (err) {
    console.log(err);
  }
});
