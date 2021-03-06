// Adding new blog request
document
  .getElementById("add-blog-button")
  .addEventListener("click", async (e) => {
    try {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const blogImage = document.getElementById("img-link").value;
      const body = `<div>${quill.root.innerHTML}</div>`;
      const date = Date.now();

      const response = await (
        await fetch(`${url}/blog/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, body, blogImage, date }),
        })
      ).json();

      if (response.ok) {
        $("#add-blog-form").on("submit", function (e) {
          $("#successModal").modal("show");
          e.preventDefault();
        });
      }
    } catch (err) {
      errorHandler();
      setTimeout(removeErrorHandler(), 5000);
    }
  });
