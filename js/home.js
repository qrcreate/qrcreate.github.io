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
        const file = document.getElementById("documentInput").files[0];
        if (!file) {
            alert("Harap unggah dokumen.");
            return;
        }
        const allowedTypes = [
            "application/pdf",
            "application/msword", // DOC
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
            "application/vnd.ms-powerpoint", // PPT
            "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
            "text/csv", // CSV
            "application/vnd.ms-excel", // XLS
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
            "text/plain", // TXT
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Jenis file tidak didukung. Harap unggah file dokumen yang valid (PDF, DOCX, PPTX, CSV, dll).");
            return;
        }
        value = URL.createObjectURL(file); // Buat URL untuk file
        name = document.getElementById("documentName").value;
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

    // Cleanup URL object jika dokumen
    if (type === "document") {
        URL.revokeObjectURL(value);
    }
}

// Fungsi Reset Form
function resetForm() {
    document.querySelector(".left-content").style.display = "block";
    document.getElementById("qrcode").style.display = "none";
    document.getElementById("urlInput").value = "";
    document.getElementById("urlName").value = "";
    document.getElementById("documentInput").value = "";
    document.getElementById("documentName").value = "";
    document.getElementById("signatureInput").value = "";
    document.getElementById("signatureName").value = "";
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
        if (window.innerWidth <= 767) { // Hanya aktif di mobile
            menuLinks.style.display =
                menuLinks.style.display === "block" ? "none" : "block";
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
