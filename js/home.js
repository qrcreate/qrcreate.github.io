let qrCanvas;

// Fungsi untuk membuka tab
function openTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");

    tabs.forEach((tab) => tab.classList.remove("active"));
    buttons.forEach((button) => button.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Fungsi Generate QR Code
function generateQRCode(type) {
  let value = "";
  let name = "";
  const isSession = document.getElementById("sessionToggle").checked; // Periksa apakah session toggle aktif

  if (type === "url") {
      value = document.getElementById("urlInput").value;
      name = document.getElementById("urlName").value;
  }

  if (!value || !name) {
      alert("Harap isi data yang diperlukan dan nama QR Code.");
      return;
  }

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = `<h3>${name}</h3>`;

  // Logika QR berdasarkan toggle
  if (isSession) {
      // QR Session
      const sessionValue = `${value}?session=${Date.now()}`; // Tambahkan timestamp sebagai simulasi session
      createQRCode(qrContainer, sessionValue);
  } else {
      // QR Permanent
      createQRCode(qrContainer, value);
  }

  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "inline-block";
  downloadBtn.href = qrCanvas.toDataURL("image/png");
  downloadBtn.download = `${name}.png`;

  // Sembunyikan form input dan tampilkan QR code
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
  