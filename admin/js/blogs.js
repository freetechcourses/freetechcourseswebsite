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

    console.log(response.data);

    // Checking if blogs are actually present
    if (response.data.length) {
      // looping through all blogs
      for (let i = 0; i < response.data.length; i++) {
        const blog = ` <tr id=${i}>
        <td>
          <input 
            type="checkbox"
            value=${response.data[i]._id}
            ${response.data[i].pin && 'checked'}
          />
        </td> 
        <td scope="row">${i + 1}</td>
        <td>${response.data[i].title}</td>
        <td>${new Date(response.data[i].date).toDateString()}</td>
        <td>
          <a 
            type="button" 
            class="btn btn-danger btn-sm safari-issue" 
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

// Sending pinned blogs data to backend
document.querySelector('#pin-blogs').addEventListener('click', async () => {
  try {
    let list = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    console.log(list);

    const response = await (
      await fetch(`${url}/blog/pin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ list }),
      })
    ).json();

    if (response.ok) {
      window.location.href = 'blogs.html';
    }
  } catch (err) {
    errorHandler();
    setTimeout(removeErrorHandler(), 5000);
  }
});
