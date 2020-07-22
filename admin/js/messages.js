// Getting messages
(async () => {
  try {
    const response = await (
      await fetch(`${url}/contact/all`, {
        method: 'GET',
        headers: { token: `${sessionStorage.getItem('token')}` },
      })
    ).json();

    // Displaying all messages
    if (response.feedbacks.length) {
      for (let i = 0; i < response.feedbacks.length; i++) {
        const messageDetails = `<tr id=${i}>
        <td>
          <div class="form-check">
            <input 
              class="form-check-input position-static" 
              type="checkbox"
              value=${response.feedbacks[i]._id} 
            />
          </div>
        </td>
        <th scope="row">${i + 1}</th>
        <td>${response.feedbacks[i].name}</td>
        <td>${response.feedbacks[i].email}</td>
        <td>
          ${response.feedbacks[i].message}
        </td>
      </tr>`;
        $('#messages').append(messageDetails);
      }
    } else {
      document.getElementById('no-messages').style.display = 'block';
      document.querySelector('#delete-messages').style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  }
})();

deleteModal(
  'delete-messages-modal',
  'delete-selected-messages',
  'Message',
  'contact',
  '/messages.html'
);
