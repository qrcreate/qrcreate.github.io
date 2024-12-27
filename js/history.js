// history.js

document.addEventListener("DOMContentLoaded", () => {
    const historyBody = document.getElementById("historyBody");

    const qrHistory = [
        {
            name: "Example QR",
            url: "https://example.com",
            date: "2024-12-27",
            time: "14:35:00",
            qrImage: "https://via.placeholder.com/100"
        },
        // Add more entries as needed
    ];

    function renderHistory() {
        historyBody.innerHTML = "";
        qrHistory.forEach((entry, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${entry.name}</td>
                <td><a href="${entry.url}" target="_blank">${entry.url}</a></td>
                <td>${entry.date} ${entry.time}</td>
                <td class="qr-image">
                    <img src="${entry.qrImage}" alt="QR Code for ${entry.name}">
                </td>
                <td class="actions">
                    <button class="download" data-index="${index}">Download</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            historyBody.appendChild(row);
        });
    }

    historyBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            qrHistory.splice(index, 1);
            renderHistory();
        } else if (event.target.classList.contains("download")) {
            const index = event.target.getAttribute("data-index");
            const qr = qrHistory[index];
            // Simulate file download
            const link = document.createElement("a");
            link.href = `data:text/plain,QR Code: ${qr.name}, URL: ${qr.url}, Date: ${qr.date}, Time: ${qr.time}`;
            link.download = `${qr.name}.txt`;
            link.click();
        }
    });

    renderHistory();
});
