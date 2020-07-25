function a() {
  let count = 0;
  function increment() {
    count++;
    return count;
  }
  return increment;
}

let b = a();
