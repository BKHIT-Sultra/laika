// ==========================================================
// CONFIG.JS - Konfigurasi API Laika
// ==========================================================

// ⚠️ PERBAIKAN PENTING!
// GANTI URL DI BAWAH INI DENGAN URL WEB APP HASIL DEPLOY TERBARU
// JANGAN LUPA AKHIRI DENGAN /exec
// Contoh: https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxx/exec
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx3fdms6Be9L6ac10dY5K6A0XcSMmcUGsG3DBHars23Wt5qaAN0kJ_MHRdwH8iiChd4/exec";

// 2. FUNGSI HELPER UNTUK MENGIRIM DAN MENERIMA DATA
async function fetchGasAPI(action, payload = null) {
    const url = new URL(GAS_API_URL);
    
    if (payload) {
        try {
            const response = await fetch(url.toString(), {
                method: 'POST',
                body: JSON.stringify({ 
                    action: action, 
                    payload: payload
                }),
                headers: {
                    // ✅ PERBAIKAN PENTING DI SINI (Ganti text/plain menjadi application/json)
                    'Content-Type': 'application/json' 
                }
            });
            return await response.json();
        } catch (error) {
            console.error("Gagal POST ke GAS API:", error);
            // Lempar error agar ditangkap oleh try...catch di login.html
            throw new Error("Gagal terhubung ke server. Periksa URL Web App.");
        }
    } else {
        url.searchParams.append('action', action);
        try {
            const response = await fetch(url.toString());
            return await response.json();
        } catch ( error) {
            console.error("Gagal GET ke GAS API:", error);
            throw new Error("Gagal terhubung ke server.");
        }
    }
}
