// ==========================================================
// CONFIG.JS - Konfigurasi API Laika
// ==========================================================

// 1. GANTI URL DI BAWAH INI DENGAN URL WEB APP APPS SCRIPT ANDA
// Pastikan URL berakhiran /exec
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzt_UpeyrNdSAFWpXADNZH6cWQYf_nqKh9gf3SudxVLb-EOo5w7VnhnenbZQXBxznmV/exec";

// 2. FUNGSI HELPER UNTUK MENGIRIM DAN MENERIMA DATA
async function fetchGasAPI(action, payload = null) {
    const url = new URL(GAS_API_URL);
    
    if (payload) {
        try {
            const response = await fetch(url.toString(), {
                method: 'POST',
                body: JSON.stringify({ 
                    action: action, 
                    payload: payload // Struktur ini HARUS persis begini agar bisa dibaca Code.gs
                }),
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
