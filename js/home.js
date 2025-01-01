let qrCanvas;

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
    // Mendapatkan input URL
    value = document.getElementById("urlInput").value;
    name = document.getElementById("urlName").value;
  } else if (type === "document") {
    // Mendapatkan file dokumen
    const file = document.getElementById("documentInput").files[0];
    if (!file) {
      alert("Harap unggah dokumen.");
      return;
    }
    value = URL.createObjectURL(file);
    name = document.getElementById("documentName").value;
  } else if (type === "signature") {
    // Mendapatkan input teks tanda tangan
    const text = document.getElementById("signatureTextInput").value;

    // Mendapatkan file gambar tanda tangan (jika ada)
    const file = document.getElementById("signatureImageInput").files[0];

    if (!text && !file) {
      alert("Harap masukkan teks atau unggah gambar untuk tanda tangan.");
      return;
    }

    // Jika file gambar tersedia, gunakan gambar sebagai value
    if (file) {
      value = URL.createObjectURL(file);
    } else {
      // Jika hanya teks, gunakan teks sebagai value
      value = text;
    }

    name = document.getElementById("signatureName").value;
  }

  // Validasi input
  if (!value || !name) {
    alert("Harap isi data yang diperlukan dan nama QR Code.");
    return;
  }

  // Menampilkan QR Code
  const qrContainer = document.getElementById("qrcode");
  const nameElement = qrContainer.querySelector("h3");
  nameElement.textContent = name;

  // Hapus QR Code lama (jika ada)
  const existingCanvas = qrContainer.querySelector("canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Buat QR Code baru
  const canvas = document.createElement("canvas");
  new QRious({
    element: canvas,
    value: value,
    size: 250,
  });

  qrContainer.insertBefore(canvas, qrContainer.querySelector(".button-group"));

  // Tampilkan tombol download
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "inline-block";
  downloadBtn.href = canvas.toDataURL("image/png");
  downloadBtn.download = `${name}.png`;

  // Sembunyikan form input dan tampilkan hasil QR Code
  document.querySelector(".left-content").style.display = "none";
  qrContainer.style.display = "block";

  // Cleanup URL object jika dokumen atau gambar
  if (type === "document" || type === "signature") {
    URL.revokeObjectURL(value);
  }
}

// Fungsi Reset Form
function resetForm() {
  // Tampilkan kembali form input
  document.querySelector(".left-content").style.display = "block";

  // Sembunyikan hasil QR Code
  document.getElementById("qrcode").style.display = "none";

  // Reset input URL
  document.getElementById("urlInput").value = "";
  document.getElementById("urlName").value = "";

  // Reset input Dokumen
  document.getElementById("documentInput").value = "";
  document.getElementById("documentName").value = "";

  // Reset input Tanda Tangan (teks dan gambar)
  document.getElementById("signatureTextInput").value = "";
  document.getElementById("signatureImageInput").value = "";
  document.getElementById("signatureName").value = "";

  // Reset toggle session
  document.getElementById("sessionToggle").checked = false;
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

  // Tutup menu jika klik di luar area
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
