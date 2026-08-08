// ==========================================================
// CONFIG.JS - Konfigurasi API Laika
// ==========================================================

// 1. GANTI URL DI BAWAH INI DENGAN URL WEB APP APPS SCRIPT ANDA
// Pastikan URL berakhiran /exec
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzNX_BmAWA8PNVOaCQA0gawY4XWz5zD401TI2ZrWDaUlWOEqg4EB_e-eT8M8hQEWwMD/exec";

// 2. FUNGSI HELPER UNTUK MENGIRIM DAN MENERIMA DATA
async function fetchGasAPI(action, payload = null) {
    const url = new URL(GAS_API_URL);
    
    if (payload) {
        // Jika ada payload (data form), gunakan POST
        try {
            const response = await fetch(url.toString(), {
                method: 'POST',
                // Kirim sebagai text/plain untuk menghindari error CORS preflight
                body: JSON.stringify({ action: action, payload: payload }),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8', 
                }
            });
            return await response.json();
        } catch (error) {
            console.error("Gagal POST ke GAS API:", error);
            return { status: 'error', message: error.message };
        }
    } else {
        // Jika tidak ada payload, gunakan GET
        url.searchParams.append('action', action);
        try {
            const response = await fetch(url.toString());
            return await response.json();
        } catch (error) {
            console.error("Gagal GET ke GAS API:", error);
            return { status: 'error', message: error.message };
        }
    }
}
