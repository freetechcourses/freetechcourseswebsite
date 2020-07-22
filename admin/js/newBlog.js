// Adding new blog request
document
  .getElementById('add-blog-button')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const body = document.getElementById('body').value;

      const response = await (
        await fetch(`${url}/blog/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: `${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ title, body }),
        })
      ).json();

      if (response.ok) {
        $('#add-blog-form').on('submit', function (e) {
          $('#successModal').modal('show');
          e.preventDefault();
        });
      }
    } catch (err) {
      console.log(err);
    }
  });