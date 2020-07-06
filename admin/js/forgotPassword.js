// Forgot password request
document
  .getElementById('forgot-password-button')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const email = document.querySelector('#email').value;

      const response = await fetch(`${url}/user/forgotpassword`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
