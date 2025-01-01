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
  
  // Fungsi untuk membuka tab
  function openTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");
  
    // Sembunyikan semua tab dan hapus kelas aktif dari tombol
    tabs.forEach((tab) => tab.classList.remove("active"));
    buttons.forEach((button) => button.classList.remove("active"));
  
    // Tampilkan tab yang dipilih dan tambahkan kelas aktif ke tombolnya
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
  }
  
  // Fungsi Generate QR Code
  function generateQRCode(type) {
    let value = "";
    let name = "";
  
    if (type === "url") {
      value = document.getElementById("urlInput").value;
      name = document.getElementById("urlName").value;
    } else if (type === "document") {
      const file = document.getElementById("documentInput").files[0];
      if (!file) {
        alert("Harap unggah dokumen.");
        return;
      }
      value = URL.createObjectURL(file);
      name = document.getElementById("documentName").value;
    } else if (type === "signature") {
      const text = document.getElementById("signatureTextInput").value;
      const file = document.getElementById("signatureImageInput").files[0];
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
  
    // Cek status checkbox "sessionToggle"
    const sessionToggle = document.getElementById("sessionToggle").checked;
    if (sessionToggle) {
      // Simpan QR Code ke dalam cookie dengan waktu kadaluwarsa 5 menit (300 detik)
      setCookieWithExpireSecond(name, value, 300);
      alert(`QR Code \"${name}\" telah disimpan dan akan kedaluwarsa dalam 5 menit.`);
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
  // Hapus semua cookie QR Code saat tombol reset diklik
  function resetForm() {
    // Hapus semua cookie yang berkaitan dengan QR Code
    const cookies = document.cookie.split('; ');
    cookies.forEach((cookie) => {
      const cookieName = decodeURIComponent(cookie.split('=')[0]);
      deleteCookie(cookieName);
    });
    document.querySelector(".left-content").style.display = "block";
    document.getElementById("qrcode").style.display = "none";
  
    document.getElementById("urlInput").value = "";
    document.getElementById("urlName").value = "";
  
    document.getElementById("documentInput").value = "";
    document.getElementById("documentName").value = "";
  
    document.getElementById("signatureTextInput").value = "";
    document.getElementById("signatureImageInput").value = "";
    document.getElementById("signatureName").value = "";
  
    document.getElementById("sessionToggle").checked = false;
  }
  
  // Fungsi untuk memuat QR Code dari cookie jika tersedia
  function loadQRCodeFromCookie() {
    const qrContainer = document.getElementById("qrcode");
    const cookies = document.cookie.split("; ");
  
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      const decodedName = decodeURIComponent(name);
      const decodedValue = decodeURIComponent(value);
  
      if (decodedName && decodedValue) {
        const canvas = document.createElement("canvas");
        new QRious({
          element: canvas,
          value: decodedValue,
          size: 250,
        });
  
        qrContainer.insertBefore(canvas, qrContainer.querySelector(".button-group"));
        const nameElement = qrContainer.querySelector("h3");
        nameElement.textContent = decodedName;
  
        qrContainer.style.display = "block";
        document.querySelector(".left-content").style.display = "none";
      }
    });
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
  
    // Panggil fungsi ini untuk memuat QR Code dari cookie jika ada
    loadQRCodeFromCookie();
  
    // Tambahkan event listener untuk memeriksa cookie saat checkbox "sessionToggle" diubah
    const sessionToggleCheckbox = document.getElementById("sessionToggle");
    sessionToggleCheckbox.addEventListener("change", function () {
      if (sessionToggleCheckbox.checked) {
        alert("Session QR akan disimpan sementara (5 menit).");
      } else {
        alert("Session QR tidak akan disimpan.");
      }
    });
  });
  