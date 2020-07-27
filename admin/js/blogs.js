// Getting blogs
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/latest`, { method: 'GET' })
    ).json();

    // Sortings blogs in descending order of time
    response.data.sort((a, b) => {
      return b.date - a.date;
    });

    // Checking if blogs are actually present
    if (response.data.length) {
      // looping through all blogs
      for (let i = 0; i < response.data.length; i++) {
        const blog = ` <tr id=${i}>
        <td scope="row">${i + 1}</td>
        <td>${response.data[i].title}</td>
        <td>${new Date(response.data[i].date).toDateString()}</td>
        <td>
          <a 
            type="button" 
            class="btn btn-danger btn-sm" 
            href="delete-blog.html" 
            onclick="deleteButton('${response.data[i]._id}')"
          >
            Delete
          </a>
        </td>
      </tr>`;
        $('#blogs').append(blog);
      }
    } else {
      document.querySelector('#no-blogs').style.display = 'block';
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
})();

// Setting blogId in session storage
function deleteButton(blogId) {
  sessionStorage.setItem('blogId', blogId);
}
