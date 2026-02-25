document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const dob = document.querySelector("input[name='dob']").value;
    const department = document.querySelector("input[name='department']").value.trim();
    const phone = document.querySelector("input[name='phone']").value.trim();
    const message = document.getElementById("message");

    if (name === "" || email === "" || dob === "" || department === "" || phone === "") {
        message.style.color = "red";
        message.textContent = "All fields are required!";
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, dob, department, phone })
    })
    .then(res => res.text())
    .then(data => {
        message.style.color = "green";
        message.textContent = data;
        document.getElementById("studentForm").reset();
    })
    .catch(() => {
        message.style.color = "red";
        message.textContent = "Server error!";
    });
});