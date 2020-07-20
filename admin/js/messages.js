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
      for (let i = 0; i <= response.feedbacks.length; i++) {
        const messageDetails = ` <tr id=${i}>
                                <th scope="row">${i + 1}</th>
                                <td>${response.feedbacks[i].name}</td>
                                <td>${response.feedbacks[i].email}</td>
                                <td>
                                  ${response.feedbacks[i].message}
                                </td>
                                <td>
                                  <button
                                    class="btn btn-danger delete"
                                    data-target="#delete-message-modal"
                                    data-toggle="modal"
                                    id=${response.feedbacks[i]._id}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>`;
        $('#messages').append(messageDetails);
      }
    } else {
      document.getElementById('no-messages').style.display = 'block';
    }
  } catch (err) {}
})();

document
  .getElementById('delete-message-button')
  .addEventListener('click', async () => {
    const id = document.getElementsByClassName('delete')[0].id;
    const response = await (
      await fetch(`${url}/contact/${id}`, {
        method: 'DELETE',
        headers: { token: `${sessionStorage.getItem('token')}` },
      })
    ).json();

    if (response.ok) {
      window.location.href = '/messages.html';
    }
  });
