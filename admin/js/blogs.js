// Getting blogs
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/latest`, { method: "GET" })
    ).json();

    if (response.data.length) {
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
        $("#blogs").append(blog);
      }
    } else {
      document.querySelector("#no-blogs").style.display = "block";
    }
  } catch (err) {
    window.location.href = "/err500.html";
  }
})();

function deleteButton(blogId) {
  sessionStorage.setItem("blogId", blogId);
}
