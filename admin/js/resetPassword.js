// Resetting new password request
document
  .getElementById('reset-password-button')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const newPassword = document.querySelector('#new-password').value;
      const confirmNewPassword = document.querySelector('#confirm-new-password')
        .value;

      const resetToken = window.location.href.split('?')[1];

      if (newPassword === confirmNewPassword) {
        const response = await fetch(`${url}/user/changepassword`, {
          method: 'POST',
          body: JSON.stringify({
            newpass: newPassword,
            resetToken,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.ok) {
          window.location.href = '/login.html';
        } else {
          document.querySelector('.password-reset-alert').style.display =
            'block';
        }
      } else {
        document.querySelector('.password-not-equal-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
      window.location.href = '/forgot-password.html';
    }
  });
