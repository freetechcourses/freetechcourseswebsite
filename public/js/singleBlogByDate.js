// Get blog by date timestamp
(async () => {
  try {
    const response = await (
      await fetch(`${url}/blog/bydate/${localStorage.getItem('blogDate')}`, {
        method: 'GET',
      })
    ).json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
})();
