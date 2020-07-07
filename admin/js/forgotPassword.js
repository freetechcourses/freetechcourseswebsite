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

      if (data.ok) {
        document.querySelector('.email-sent-success-alert').style.display =
          'block';
        document.querySelector(
          '.success-message'
        ).innerHTML = `Email was successfully sent to ${email}`;
      } else {
        document.querySelector('.email-sent-error-message').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
      window.location.href = '/login.html';
    }
  });
