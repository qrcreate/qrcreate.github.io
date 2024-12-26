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
    value = document.getElementById("urlInput").value;
    name = document.getElementById("urlName").value;
  } else if (type === "document") {
    value = document.getElementById("documentInput").files[0];
    name = document.getElementById("documentName").value;
    if (!value) {
      alert("Harap unggah dokumen.");
      return;
    }
    value = URL.createObjectURL(value); // Buat URL untuk file dokumen
  } else if (type === "signature") {
    value = document.getElementById("signatureInput").value;
    name = document.getElementById("signatureName").value;
  }

  if (!value || !name) {
    alert("Harap isi data yang diperlukan dan nama QR Code.");
    return;
  }

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
  const qr = new QRious({
    element: canvas,
    value: value,
    size: 250,
  });

  qrContainer.insertBefore(canvas, qrContainer.querySelector(".button-group"));

  // Tampilkan tombol download
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.style.display = "inline-block";
    downloadBtn.href = canvas.toDataURL("image/png");
    downloadBtn.download = `${name}.png`;
  }

  // Sembunyikan form input dan tampilkan hasil QR Code
  document.querySelector(".left-content").style.display = "none";
  qrContainer.style.display = "block";
}

// Fungsi untuk membuat QR Code
function createQRCode(container, value) {
    const qr = new QRious({
        value: value,
        size: 250,
    });

    qrCanvas = qr.canvas;
    container.appendChild(qr.canvas);
}

function resetForm() {
  document.querySelector(".left-content").style.display = "block";
  document.getElementById("qrcode").style.display = "none";
  document.getElementById("urlInput").value = "";
  document.getElementById("urlName").value = "";
  document.getElementById("sessionToggle").checked = false;
}

// Script untuk mengubah header saat di-scroll
document.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icons i");
    const menuLinks = document.querySelector(".menu-links");
  
    menuIcon.addEventListener("click", function () {
      if (menuLinks.style.display === "block") {
        menuLinks.style.display = "none";
      } else {
        menuLinks.style.display = "block";
      }
    });
  
    // Opsional: Sembunyikan menu jika klik di luar area
    document.addEventListener("click", function (event) {
      if (!menuIcon.contains(event.target) && !menuLinks.contains(event.target)) {
        menuLinks.style.display = "none";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const menuLinks = document.getElementById("menuLinks");
  
    // Toggle menu
    menuToggle.addEventListener("click", function () {
      menuLinks.classList.toggle("active");
    });
  
    // Close menu if clicking outside
    document.addEventListener("click", function (event) {
      if (!menuToggle.contains(event.target) && !menuLinks.contains(event.target)) {
        menuLinks.classList.remove("active");
      }
    });
  });
  