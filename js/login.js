import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js';

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