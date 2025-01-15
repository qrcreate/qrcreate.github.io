document.addEventListener("DOMContentLoaded", function () {  
    const historyList = document.getElementById("historyList");  
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");  
  
    // Load history from local storage  
    function loadHistory() {  
        const history = JSON.parse(localStorage.getItem("qrHistory")) || [];  
        historyList.innerHTML = ""; // Clear existing list  
  
        history.forEach((qr) => {  
            const historyItem = document.createElement("div");  
            historyItem.className = "history-item";  
            historyItem.innerHTML = `  
                <div>  
                    <strong>${qr.name}</strong> (${qr.type})<br>  
                    Date: ${qr.date}, Time: ${qr.time}  
                </div>  
                <div>  
                    <button onclick="downloadQRCode('${qr.name}')">Download</button>  
                    <button onclick="deleteQRCode('${qr.name}')">Delete</button>  
                </div>  
            `;  
            historyList.appendChild(historyItem);  
        });  
    }  
  
    // Download QR Code  
    window.downloadQRCode = function (name) {  
        const history = JSON.parse(localStorage.getItem("qrHistory")) || [];  
        const qr = history.find(q => q.name === name);  
        if (qr) {  
            const link = document.createElement("a");  
            link.href = qr.dataUrl; // Assuming you store the data URL in the history  
            link.download = `${name}.png`;  
            link.click();  
        }  
    };  
  
    // Delete QR Code  
    window.deleteQRCode = function (name) {  
        let history = JSON.parse(localStorage.getItem("qrHistory")) || [];  
        history = history.filter(qr => qr.name !== name);  
        localStorage.setItem("qrHistory", JSON.stringify(history));  
        loadHistory(); // Reload history  
    };  
  
    // Clear all history  
    clearHistoryBtn.addEventListener("click", function () {  
        localStorage.removeItem("qrHistory");  
        loadHistory(); // Reload history  
    });  
  
    loadHistory(); // Initial load  
});  
