// Forgot password request
document
  .getElementById('forgot-password-button')
  .addEventListener('click', async (e) => {
    try {
      const email = document.querySelector('#email').value;

      const response = await (
        await fetch(`${url}/user/forgotpassword`, {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json();

      if (response.ok) {
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
      window.location.href = '/login.html';
    }
  });
