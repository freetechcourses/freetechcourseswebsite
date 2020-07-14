// Settings request
document
  .getElementById("change-password")
  .addEventListener("click", async () => {
    try {
      const password = document.querySelector("#new-password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;

      if (password === confirmPassword) {
        const response = await fetch(`${url}/user/changepasswordinlogin`, {
          method: "POST",
          headers: {
            token: `${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newpass: password }),
        });

        const data = await response.json();

        console.log(data);
        if (data.ok) {
          document.querySelector(".change-password").style.display = "block";
        } else {
          document.getElementById("error-message").innerHTML = data.error;
        }
      } else {
        document.querySelector("#error-message").style.display = "block";
        document.querySelector(".change-password").style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  });
