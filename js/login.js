// Fungsi Login Manual
function manualLogin() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    alert(`Logged in with:\nEmail: ${email}\nPassword: ${password}`);
}

// Callback Google SSO
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    alert("Login successful with Google!");
}
