function sanitize(str) {
  return str.replace(/<+.*\/*>+/g, "");
}
// let a = "<h1>this is some html</h1> and now some non html";
// console.log(sanitize(a));