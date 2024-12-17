// Fungsi Register Manual
function register() {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Placeholder registrasi manual
    alert(`Account created successfully!\nName: ${name}\nEmail: ${email}`);
}

// Callback Google SSO
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    alert("Registration successful with Google!");
}
