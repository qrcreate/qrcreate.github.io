import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js'; // Mengimpor fungsi postJSON dari library API

// Fungsi Login Manual
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("manualLogin");

    if (!loginButton) {
        console.error("Login button not found!");
        return;
    }

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah reload halaman saat form dikirimkan

        // Mengambil input email dan password dari pengguna
        const email = document.getElementById("emailInput")?.value || "";
        const password = document.getElementById("passwordInput")?.value || "";

        // Validasi apakah email dan password telah diisi
        if (!email || !password) {
            alert("Please fill out both email and password."); // Pesan error jika input kosong
            return;
        }

        // Data yang akan dikirim ke backend
        const data = { email, password };

        // URL endpoint backend untuk login
        const target_url = "https://asia-southeast2-qrcreate-447114.cloudfunctions.net/qrcreate/qr/user";
            

        // Tampilkan spinner loading (opsional)
        const spinner = document.getElementById("loading-spinner");
        if (spinner) spinner.style.display = "block";

        // Kirim data ke backend menggunakan postJSON
        postJSON(
            target_url,
            "Content-Type",
            "application/json",
            data,
            function (response) {
                // Sembunyikan spinner loading
                if (spinner) spinner.style.display = "none";

                // Cek status response
                if (response.status >= 200 && response.status < 300) {
                    alert("Login successful! Token: " + response.data.token);
                    console.log("User Data:", response.data);
                    // Reset form setelah berhasil (opsional)
                    document.getElementById("emailInput").value = "";
                    document.getElementById("passwordInput").value = "";
                } else {
                    alert("Error: " + (response.data.message || "Login failed"));
                }
            }
        );
    });
});

// Callback Google SSO
// function handleCredentialResponse(response) {
//     console.log("Encoded JWT ID token: " + response.credential);

//     // Data yang akan dikirim ke backend
//     const data = { token: response.credential };

//     // URL endpoint backend untuk Google Login
//     const target_url =
//         "https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/google-login";

    // Kirim token ke backend
    postJSON(
        target_url,
        "Content-Type",
        "application/json",
        data,
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                alert("Google Login successful!");
                console.log("Google User Data:", response.data);
            } else {
                alert("Google Login failed: " + (response.data.message || "Unknown error"));
            }
        }
    );
}
