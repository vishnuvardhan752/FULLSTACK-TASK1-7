const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let valid = true;

  // Clear previous errors
  document.getElementById("emailError").innerText = "";
  document.getElementById("passwordError").innerText = "";
  document.getElementById("serverMessage").innerText = "";

  // Email validation
  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    valid = false;
  }

  // Password validation
  if (password === "") {
    document.getElementById("passwordError").innerText = "Password is required";
    valid = false;
  }

  if (!valid) return;

  // Send request to server
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      const msg = document.getElementById("serverMessage");

      if (data.success) {
        msg.style.color = "green";
        msg.innerText = "✅ " + data.message;
      } else {
        msg.style.color = "red";
        msg.innerText = "❌ " + data.message;
      }
    });
});