import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js'; 
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

function register() {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!name || !email || !password) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please fill out all fields.",
        });
        return;
    }

    if (!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
        });
        return;
    }

    if (password.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password must be at least 6 characters long.",
        });
        return;
    }

    const data = { username: name, email, password };
    const target_url = "https://asia-southeast2-qrcreate-447114.cloudfunctions.net/qrcreate/qr/user";

    Swal.fire({
        title: "Registering...",
        text: "Please wait while we process your registration.",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });

    postJSON(
        target_url,
        "Content-Type",
        "application/json",
        data,
        function (response) {
            Swal.close(); // Tutup loading spinner

            if (response.status >= 200 && response.status < 300) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "Welcome! Redirecting to your dashboard...",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Redirect ke home.html
                    window.location.href = "../home.html";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: response.data.message || "Something went wrong! Please try again.",
                });
            }
        },
        function (error) {
            Swal.close(); // Tutup loading spinner
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to connect to the server. Please try again later.",
            });
        }
    );
}

// Fungsi validasi email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Hubungkan fungsi ke tombol Register
document.getElementById("registerButton").addEventListener("click", register);
