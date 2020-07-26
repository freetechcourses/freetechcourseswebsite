// Settings request
document
  .getElementById('change-password')
  .addEventListener('click', async () => {
    try {
      const password = document.querySelector('#new-password').value;
      const confirmPassword = document.querySelector('#confirm-password').value;

      if (password === confirmPassword) {
        const response = await (
          await fetch(`${url}/user/changepasswordinlogin`, {
            method: 'POST',
            headers: {
              token: `${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newpass: password }),
          })
        ).json();

        if (response.ok) {
          document.querySelector('.change-password').style.display = 'block';
        } else {
          document.getElementById('error-message').innerHTML = response.error;
        }
      } else {
        document.querySelector('#error-message').style.display = 'block';
        document.querySelector('.change-password').style.display = 'none';
      }
    } catch (err) {
      setTimeout(errorHandler(), 5000);
    }
  });
