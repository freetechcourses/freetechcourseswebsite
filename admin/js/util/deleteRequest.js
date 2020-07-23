// Deleteing selected courses
const deleteRequest = (confirmId, requestUrl, redirectUrl) => {
  document.getElementById(confirmId).addEventListener('click', async () => {
    try {
      let list = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      console.log(list);

      const response = await (
        await fetch(`${url}/${requestUrl}/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: `${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ list }),
        })
      ).json();

      response.ok ? (window.location.href = redirectUrl) : null;
    } catch (err) {
      console.log(err);
    }
  });
};
