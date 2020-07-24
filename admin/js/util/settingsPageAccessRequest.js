// Settings form
document
  .getElementById('settings-button')
  .addEventListener('click', async () => {
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await (
        await fetch(`${url}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
      ).json();

      if (response.ok) {
        window.location.href = '/settings.html';
        document.querySelector('#error-message').style.display = 'none';
      } else {
        document.querySelector('#error-message').style.display = 'block';
      }
    } catch (err) {
      window.location.href = '/add-courses.html';
    }

    document.querySelector('#settings-form').reset();
  });
