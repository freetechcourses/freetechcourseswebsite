// Getting single blog details
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/single/${sessionStorage.getItem('blogId')}`, {
        method: 'GET',
      })
    ).json();

    if (response.ok) {
      document.getElementById('blog-title').innerText = response.data.title;
      document.getElementById('blog-body').innerText = response.data.body;
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
