let currentFacingMode = "environment";
const historyList = [];

// Barkod Okuma Başarısı
function onScanSuccess(decodedText) {
    document.getElementById('result').innerText = decodedText;
    showPopup("Barkod Okundu: " + decodedText);
    addToHistory(decodedText);
}

// Barkod Geçmişine Ekle
function addToHistory(text) {
    historyList.push(text);
    const historyElement = document.getElementById("history");
    const li = document.createElement("li");
    li.innerText = text;
    historyElement.appendChild(li);
}

// Popup Bildirim
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

// Kamera Değiştirme
document.getElementById("toggle-camera").addEventListener("click", () => {
    currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    html5QrCode.stop().then(() => startQrScanner());
});

// Tema Değiştirme
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// QR Okuyucuyu Başlat
function startQrScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: currentFacingMode },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess
    );
}

startQrScanner();
