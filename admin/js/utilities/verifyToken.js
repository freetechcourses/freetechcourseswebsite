// Check if user is logged in or not
window.onload = async () => {
  try {
    const response = await fetch(`${url}/user/verifytoken`, {
      method: 'GET',
      headers: {
        token: `${sessionStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    !data.ok ? (window.location.href = '/login.html') : null;
  } catch (err) {
    console.log(err);
  }
};
