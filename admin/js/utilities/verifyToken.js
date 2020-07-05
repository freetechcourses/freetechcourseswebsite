// Check if user is logged in or not
wfetch(`${url}/user/verifytoken`, {
  method: 'GET',
  headers: {
    token: `${sessionStorage.getItem('token')}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (!res.ok) {
      window.location.href = '/login.html';
    }
  })
  .catch((err) => {
    console.log(err);
  });