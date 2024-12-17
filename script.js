let currentFacingMode = "environment"; // Başlangıçta arka kamera
const historyList = [];

// Barkod Okuma Başarısı
function onScanSuccess(decodedText) {
    document.getElementById('result').innerText = decodedText;
    addToHistory(decodedText);
}

// Barkod Geçmişine Ekle
function addToHistory(text) {
    if (!historyList.includes(text)) {
        historyList.push(text);
        const li = document.createElement("li");
        li.innerText = text;
        document.getElementById("history").appendChild(li);
    }
}

// Kamera Değiştirme
document.getElementById("toggle-camera").addEventListener("click", () => {
    currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    restartScanner();
});

// Tema Değiştirme
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// QR Kod Okuyucuyu Başlat
function startScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: currentFacingMode },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess
    ).catch(err => {
        console.error("Kamera başlatılamadı: ", err);
        alert("Kameraya erişim izni verin.");
    });
}

// Kamerayı Yeniden Başlat
function restartScanner() {
    Html5Qrcode.getCameras().then(() => {
        document.getElementById('qr-reader').innerHTML = ""; // Okuyucuyu temizle
        startScanner();
    });
}

// Başlangıçta Çalıştır
startScanner();
