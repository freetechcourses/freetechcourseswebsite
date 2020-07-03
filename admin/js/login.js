// Login Request
document.getElementById('login-button').addEventListener('click', async () => {
  try {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const response = await fetch(`${url}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    data.ok
      ? sessionStorage.setItem('token', data.token)
      : (document.querySelector('.error-message-alert').style.display =
          'block');
  } catch (err) {
    document.querySelector('.error-message').innerHTML =
      'Some error occured. Refresh browser and try again';
  }
});
