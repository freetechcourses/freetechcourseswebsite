// Check if user is logged in or not
(async () => {
  try {
    const response = await (
      await fetch(`${url}/user/verifytoken`, {
        method: 'GET',
        headers: {
          token: `${sessionStorage.getItem('token')}`,
        },
      })
    ).json();

    !response.ok ? (window.location.href = '/login.html') : null;
  } catch (err) {
    console.log(err);
  }
})();
