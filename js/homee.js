// Fungsi untuk menyimpan cookie dengan hari kadaluwarsa  
function setCookieWithExpireDay(cname, cvalue, exdays) {  
    const d = new Date();  
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));  
    let expires = "expires=" + d.toUTCString();  
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";  
}  
  
// Fungsi untuk menyimpan cookie dengan jam kadaluwarsa  
function setCookieWithExpireHour(cname, cvalue, exhour) {  
    const d = new Date();  
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));  
    let expires = "expires=" + d.toUTCString();  
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";  
}  
  
// Fungsi untuk menyimpan cookie dengan detik kadaluwarsa  
function setCookieWithExpireSecond(cname, cvalue, exsecs) {  
    const d = new Date();  
    d.setTime(d.getTime() + (exsecs * 1000));  
    let expires = "expires=" + d.toUTCString();  
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";  
}  
  
// Fungsi untuk menghapus cookie dengan cara mengatur waktu kadaluwarsa ke masa lalu  
function deleteCookie(cname) {  
    document.cookie = encodeURIComponent(cname) + "= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
}  
  
// Fungsi untuk mendapatkan nilai cookie berdasarkan nama  
function getCookie(cname) {  
    let name = encodeURIComponent(cname) + "=";  
    let decodedCookie = decodeURIComponent(document.cookie);  
    let ca = decodedCookie.split(';');  
    for(let i = 0; i < ca.length; i++) {  
        let c = ca[i];  
        while (c.charAt(0) === ' ') {  
            c = c.substring(1);  
        }  
        if (c.indexOf(name) === 0) {  
            return decodeURIComponent(c.substring(name.length, c.length));  
        }  
    }  
    return "";  
}  
  
// Fungsi Generate QR Code  
function generateQRCode(type) {  
    let value = "";  
    let name = "";  
  
    if (type === "url") {  
        value = document.getElementById("url").value;  
        name = document.getElementById("urlName").value;  
    } else if (type === "document") {  
        const file = document.getElementById("document").files[0];  
        if (!file) {  
            alert("Harap unggah dokumen.");  
            return;  
        }  
        value = URL.createObjectURL(file);  
        name = document.getElementById("documentName").value;  
    } else if (type === "signature") {  
        const text = document.getElementById("signatureText").value;  
        const file = document.getElementById("signatureImage").files[0];  
        if (!text && !file) {  
            alert("Harap masukkan teks atau unggah gambar untuk tanda tangan.");  
            return;  
        }  
        value = file ? URL.createObjectURL(file) : text;  
        name = document.getElementById("signatureName").value;  
    }  
  
    if (!value || !name) {  
        alert("Harap isi data yang diperlukan dan nama QR Code.");  
        return;  
    }  
  
    // Tampilkan QR Code di layar  
    const qrContainer = document.getElementById("qrcode");  
    const nameElement = qrContainer.querySelector("h3");  
    nameElement.textContent = name;  
  
    const existingCanvas = qrContainer.querySelector("canvas");  
    if (existingCanvas) {  
        existingCanvas.remove();  
    }  
  
    const canvas = document.createElement("canvas");  
    new QRious({  
        element: canvas,  
        value: value,  
        size: 250,  
    });  
  
    qrContainer.insertBefore(canvas, qrContainer.querySelector(".button-group"));  
  
    const downloadBtn = document.getElementById("downloadBtn");  
    downloadBtn.style.display = "inline-block";  
    downloadBtn.href = canvas.toDataURL("image/png");  
    downloadBtn.download = `${name}.png`;  
  
    document.querySelector(".left-content").style.display = "none";  
    qrContainer.style.display = "block";  
  
    // Cleanup URL object jika dokumen atau gambar  
    if (type === "document" || type === "signature") {  
        setTimeout(() => URL.revokeObjectURL(value), 3000);  
    }  
}  
  
// Fungsi Reset Form  
function resetForm() {  
    document.querySelector(".left-content").style.display = "block";  
    document.getElementById("qrcode").style.display = "none";  
  
    document.getElementById("url").value = "";  
    document.getElementById("urlName").value = "";  
  
    document.getElementById("document").value = "";  
    document.getElementById("documentName").value = "";  
  
    document.getElementById("signatureText").value = "";  
    document.getElementById("signatureImage").value = "";  
    document.getElementById("signatureName").value = "";  
}  
  
// Script untuk mengubah header saat di-scroll  
document.addEventListener("scroll", function () {  
    const header = document.getElementById("header");  
    const scrollTop = window.scrollY || document.documentElement.scrollTop;  
    if (scrollTop > 50) {  
        header.classList.add("scrolled");  
    } else {  
        header.classList.remove("scrolled");  
    }  
});  
  
// Script untuk toggle menu  
document.addEventListener("DOMContentLoaded", function () {  
    const menuIcon = document.querySelector(".menu-icons i");  
    const menuLinks = document.querySelector(".menu-links");  
  
    menuIcon.addEventListener("click", function () {  
        if (window.innerWidth <= 767) {  
            menuLinks.style.display = menuLinks.style.display === "block" ? "none" : "block";  
        }  
    });  
  
    document.addEventListener("click", function (event) {  
        if (  
            !menuIcon.contains(event.target) &&  
            !menuLinks.contains(event.target) &&  
            window.innerWidth <= 767  
        ) {  
            menuLinks.style.display = "none";  
        }  
    });  
});  
  
// Event listener untuk tombol logout  
document.getElementById("logoutBtn").addEventListener("click", function (event) {  
    event.preventDefault();  
  
    // Hapus semua cookie  
    const cookies = document.cookie.split("; ");  
    cookies.forEach((cookie) => {  
        const cookieName = decodeURIComponent(cookie.split("=")[0]);  
        deleteCookie(cookieName);  
    });  
  
    // Tampilkan pesan logout  
    alert("Anda telah logout. Mengarahkan ke halaman login...");  
  
    // Arahkan pengguna ke halaman login  
    window.location.href = "index.html";  
});  
  
// Event listener untuk pemilihan tipe QR Code  
document.getElementById('documentCard').addEventListener('click', function() {  
    window.location.href = 'input.html?type=document';  
});  
  
document.getElementById('signatureCard').addEventListener('click', function() {  
    window.location.href = 'input.html?type=signature';  
});  
  
document.getElementById('urlCard').addEventListener('click', function() {  
    window.location.href = 'input.html?type=url';  
});  

  
function showInputSection(type) {  
    document.getElementById('overlay').style.display = 'block';  
    document.getElementById('inputContainer').style.display = 'block';  
    document.querySelectorAll('.input-section').forEach(section => {  
        section.style.display = 'none'; // Sembunyikan semua input  
    });  
  
    if (type === 'url') {  
        document.getElementById('urlInput').style.display = 'block';  
    } else if (type === 'document') {  
        document.getElementById('documentInput').style.display = 'block';  
    } else if (type === 'signature') {  
        document.getElementById('signatureInput').style.display = 'block';  
    }  
}  
  
// Fungsi untuk menutup input  
function closeInput() {  
    document.getElementById('overlay').style.display = 'none';  
    document.getElementById('inputContainer').style.display = 'none';  
}  
