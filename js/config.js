// ==========================================================
// CONFIG.JS - Konfigurasi API Laika (VERSI ANTI GAGAL FETCH)
// ==========================================================

// ⚠️ GANTI URL DI BAWAH INI DENGAN URL TERBARU HASIL DEPLOY ANDA
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx3fdms6Be9L6ac10dY5K6A0XcSMmcUGsG3DBHars23Wt5qaAN0kJ_MHRdwH8iiChd4/exec";

// FUNGSI YANG LEBIH TANGGUH UNTUK MENGATASI FAILED TO FETCH
async function fetchGasAPI(action, payload = null) {
    try {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            // ⚠️ PERUBAHAN PENTING: Hapus header 'Content-Type', tapi tetap kirim JSON sebagai String
            body: JSON.stringify({ 
                action: action, 
                payload: payload 
            })
        });

        // Jika server GAS mengembalikan error 404 atau 500
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("Gagal fetch ke GAS:", error);
        
        // ⚠️ Agar alert di login tidak hanya bilang "Failed to fetch", tapi menampilkan penyebabnya
        if (error.message.includes('Failed to fetch')) {
            throw new Error("Tidak bisa terhubung ke server. 1. Pastikan URL Web App benar. 2. Pastikan pengaturan Deploy 'Anyone'. 3. Matikan AdBlock/VPN.");
        }
        throw error;
    }
}
