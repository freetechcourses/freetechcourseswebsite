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

    response.ok
      ? sessionStorage.setItem('token', response.token)
      : (document.querySelector('.error-message-alert').style.display =
          'block');
  } catch (err) {
    document.querySelector('.error-message').innerHTML =
      'Some error occured. Refresh browser and try again';
  }
});
