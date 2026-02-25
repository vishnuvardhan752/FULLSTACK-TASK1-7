const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

function validateName() {
    const error = document.getElementById("nameError");
    if (nameInput.value.trim().length < 3) {
        error.textContent = "Name must be at least 3 characters.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validateEmail() {
    const error = document.getElementById("emailError");
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(pattern)) {
        error.textContent = "Enter a valid email address.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validateMessage() {
    const error = document.getElementById("messageError");
    if (messageInput.value.trim() === "") {
        error.textContent = "Feedback cannot be empty.";
        return false;
    }
    error.textContent = "";
    return true;
}

nameInput.addEventListener("keyup", validateName);
emailInput.addEventListener("keyup", validateEmail);
messageInput.addEventListener("keyup", validateMessage);

submitBtn.addEventListener("dblclick", function () {
    if (validateName() && validateEmail() && validateMessage()) {
        alert("✅ Thank you! Your feedback has been submitted.");
        document.getElementById("feedbackForm").reset();
    } else {
        alert("❌ Please fix the errors before submitting.");
    }
});