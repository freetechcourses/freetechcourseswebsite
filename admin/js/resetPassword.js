// Resetting new password request
document
  .getElementById('reset-password-button')
  .addEventListener('click', async () => {
    try {
      const newPassword = document.querySelector('#new-password').value;
      const confirmNewPassword = document.querySelector('#confirm-new-password')
        .value;

      console.log(window.location.href);

      if (newPassword === confirmNewPassword) {
        const response = await fetch(`${url}/user/changepassword`, {
          method: 'POST',
          body: JSON.stringify({
            newpass: newPassword,
            resetToken: 'wsbcdwdbjs',
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        console.log(data);
      }
    } catch (err) {}
  });
