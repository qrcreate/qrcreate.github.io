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
  
    if (type === "url") {
      value = document.getElementById("urlInput").value;
      name = document.getElementById("urlName").value;
    } else if (type === "document") {
      const fileInput = document.getElementById("docInput");
      if (fileInput.files.length > 0) {
        value = fileInput.files[0].name; // Nama file sebagai QR Code
        name = document.getElementById("docName").value;
      }
    } else if (type === "signature") {
      value = document.getElementById("signatureInput").value;
      name = document.getElementById("signatureName").value;
    }
  
    if (!value || !name) {
      alert("Harap isi data yang diperlukan dan nama QR Code.");
      return;
    }
  
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = `<h3>${name}</h3>`; // Menampilkan nama QR Code di atas QR
  
    const qr = new QRious({
      value: value,
      size: 250,
    });
  
    qrContainer.appendChild(qr.canvas);
  }
  