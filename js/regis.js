import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js'; // Sesuaikan path ke file Anda

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

    // Data yang akan dikirim ke backend
    const data = {
        name: name,
        email: email,
        password: password
    };

    // URL endpoint backend
    const target_url =
       

    // Tampilkan spinner loading (opsional)
    document.getElementById("loading-spinner").style.display = "block";

    // Kirim data ke backend menggunakan postJSON
    postJSON(
        target_url,
        "Content-Type",
        "application/json",
        data,
        function (response) {
            // Sembunyikan spinner loading
            document.getElementById("loading-spinner").style.display = "none";

            if (response.status >= 200 && response.status < 300) {
                alert("Registration successful! Token: " + response.data.token);
                // Reset form setelah berhasil
                document.getElementById("nameInput").value = "";
                document.getElementById("emailInput").value = "";
                document.getElementById("passwordInput").value = "";
                document.getElementById("confirmPasswordInput").value = "";
            } else {
                alert("Error: " + response.data.message);
            }
        }
    );
}

// Callback Google SSO
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Data yang akan dikirim ke backend
    const data = {
        token: response.credential
    };

    const target_url =
       

    // Kirim token ke backend
    postJSON(
        target_url,
        "Content-Type",
        "application/json",
        data,
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                alert("Google Registration successful!");
            } else {
                alert("Google Registration failed: " + response.data.message);
            }
        }
    );
}
