import { postJSON } from './js/lib/api.js'; // Mengimpor fungsi postJSON dari library API

// Fungsi Login Manual
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("manualLogin");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah reload halaman saat form dikirimkan

        // Mengambil input email dan password dari pengguna
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        // Validasi apakah email dan password telah diisi
        if (!email || !password) {
            alert("Please fill out both email and password."); // Pesan error jika input kosong
            return;
        }

        // Data yang akan dikirim ke backend
        const data = { email, password };

        // URL endpoint backend untuk login
        const target_url =
            "https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/login";

        // Tampilkan spinner loading (opsional)
        const spinner = document.getElementById("loading-spinner");
        spinner.style.display = "block";

        // Kirim data ke backend menggunakan postJSON
        postJSON(
            target_url,
            "Content-Type",
            "application/json",
            data,
            function (response) {
                // Sembunyikan spinner loading
                spinner.style.display = "none";

                if (response.status >= 200 && response.status < 300) {
                    alert("Login successful! Token: " + response.data.token);
                    console.log("User Data:", response.data);
                    // Reset form setelah berhasil (opsional)
                    document.getElementById("emailInput").value = "";
                    document.getElementById("passwordInput").value = "";
                } else {
                    alert("Error: " + response.data.message); // Pesan error dari server
                }
            }
        );
    });
});


// Callback Google SSO
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Data yang akan dikirim ke backend
    const data = { token: response.credential };

    const target_url =
        

    // Kirim token ke backend
    postJSON(
        target_url,
        "Content-Type",
        "application/json",
        data,
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                alert("Google Login successful!");
            } else {
                alert("Google Login failed: " + response.data.message);
            }
        }
    );
}
