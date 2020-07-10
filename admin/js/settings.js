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
            token: sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: { newpass: password },
        });
        const data = response.json();

        if (data.ok) {
          document.querySelector(".change-password").style.display = "block";
        } else {
          document.getElementById("#error-message").innerHTML = res.error;
        }
      } else {
        document.querySelector("#error-message").style.display = "block";
        document.querySelector(".change-password").style.display = "none";
      }
    } catch (error) {
      console.log(err);
    }
  });
