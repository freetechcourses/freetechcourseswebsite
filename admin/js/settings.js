// // Settings request
// document
//   .getElementById("change-password")
//   .addEventListener("click", async () => {
//     try {
//       const password = document.querySelector("#new-password").value;
//       const confirmPassword = document.querySelector("#confirm-password").value;

//       if (password === confirmPassword) {
//         const response = await fetch(`${url}/user/changepasswordinlogin`, {
//           method: "POST",
//           headers: {
//             token: sessionStorage.getItem("token"),
//             "Content-Type": "application/json",
//           },
//           body: { newpass: password }
//         });

//         const data = response.json();

//         if (data.ok) {
//           alert('Password changed successfully!');
//         } else {
//           alert('Some server error, reload browser');
//         }
//       } else {
//         document.querySelector("#error-message").style.display = "block";
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   });
