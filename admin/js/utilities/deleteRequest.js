const deleteRequest = (id, URL, redirectUrl) => {
  console.log(id);  
  document.getElementById(id).addEventListener('click', async () => {
    try {
      console.log(id);
      // const response = await (
      //   await fetch(`${url}/${URL}/${id}`, {
      //     method: 'DELETE',
      //     headers: { token: `${sessionStorage.getItem('token')}` },
      //   })
      // ).json();

      // response.ok ? (window.location.href = redirectUrl) : null;
    } catch (err) {
      console.log(err);
    }
  });
};
