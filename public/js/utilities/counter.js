{
  /* <p>
  <strong>Languages:</strong>$
  {courseDetailsResponse.data.languages.map((language) =>
    console.log(language)
  )}
</p>; */
}

function a() {
  let count = 0;
  function increment() {
    count++;
    return count;
  }
  return increment;
}

let b = a();

