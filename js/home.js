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

        const qr = new QRious({
          value: value,
          size: 250,
        });

        qrContainer.appendChild(qr.canvas);
        qrCanvas = qr.canvas;

        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.style.display = "inline-block";
        downloadBtn.href = qrCanvas.toDataURL("image/png");
        downloadBtn.download = `${name}.png`;
      }