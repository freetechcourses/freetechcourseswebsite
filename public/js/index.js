// Sending Message data to backend
document
  .getElementById('submit-message')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const message = document.querySelector('#message').value;

      const response = await fetch(`${url}/contact/newcontact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      response.ok
        ? (document.querySelector(
            '.sent-message-successful-alert'
          ).style.display = 'block')
        : (document.querySelector('.sent-message-error-alert').style.display =
            'block');
    } catch (err) {
      console.log(err);
      document.querySelector('.sent-message-error-alert').style.display =
        'block';
    }
  });
