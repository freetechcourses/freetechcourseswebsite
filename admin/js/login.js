// Login Request
document.getElementById("login-button").addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password-field").value;

    const response = await fetch(`${url}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      sessionStorage.setItem("token", data.token);
      window.location.href = "/add-courses.html";
    } else {
      document.querySelector(".error-message-alert").style.display = "block";
    }
  } catch (err) {
    document.querySelector(".error-message").innerHTML =
      "Some error occured. Refresh browser and try again";
  }
});

$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $("#password-field");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
