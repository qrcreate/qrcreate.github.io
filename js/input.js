// Ambil parameter dari URL  
const urlParams = new URLSearchParams(window.location.search);  
const type = urlParams.get('type');  
  
// Menampilkan input sesuai tipe  
const inputSection = document.getElementById('inputSection');  
  
if (type === 'url') {  
    inputSection.innerHTML = `  
        <label for="url">URL</label>  
        <input type="url" id="url" placeholder="Masukkan URL" required />  
        <label for="urlName">Nama QR Code</label>  
        <input type="text" id="urlName" placeholder="Masukkan Nama" required />  
        <button onclick="generateQRCode('url')">Buat QR Code</button>  
        <button onclick="goBack()">Kembali</button>  
    `;  
} else if (type === 'document') {  
    inputSection.innerHTML = `  
        <label for="document">Dokumen</label>  
        <input type="file" id="document" accept=".pdf,.doc,.docx" required />  
        <label for="documentName">Nama QR Code</label>  
        <input type="text" id="documentName" placeholder="Masukkan Nama" required />  
        <button onclick="generateQRCode('document')">Buat QR Code</button>  
        <button onclick="goBack()">Kembali</button>  
    `;  
} else if (type === 'signature') {  
    inputSection.innerHTML = `  
        <label for="signatureText">Tanda Tangan (Teks)</label>  
        <input type="text" id="signatureText" placeholder="Masukkan Tanda Tangan" required />  
        <label for="signatureImage">Gambar Tanda Tangan</label>  
        <input type="file" id="signatureImage" accept="image/*" required />  
        <label for="signatureName">Nama QR Code</label>  
        <input type="text" id="signatureName" placeholder="Masukkan Nama" required />  
        <button onclick="generateQRCode('signature')">Buat QR Code</button>  
        <button onclick="goBack()">Kembali</button>  
    `;  
}  
  
// Fungsi untuk kembali ke halaman sebelumnya  
function goBack() {  
    window.history.back();  
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
  
    qrContainer.style.display = "block";  
  
    // Cleanup URL object jika dokumen atau gambar  
    if (type === "document" || type === "signature") {  
        setTimeout(() => URL.revokeObjectURL(value), 3000);  
    }  
}  
  
// Fungsi Reset Form  
function resetForm() {  
    document.getElementById("inputSection").innerHTML = "";  
    document.getElementById("qrcode").style.display = "none";  
}  
