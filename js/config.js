// ==========================================================
// CONFIG.JS - Konfigurasi API Laika (VERSI ANTI GAGAL FETCH)
// ==========================================================

// ⚠️ GANTI URL DI BAWAH INI DENGAN URL TERBARU HASIL DEPLOY ANDA
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxG3fphRu1THzwoBNFF7ll5mfa8l-xaNKZ5BbmS-d7jk26-B_BLLFJeUmI5xzTUGPP5/exec";

// FUNGSI YANG LEBIH TANGGUH UNTUK MENGATASI FAILED TO FETCH
async function fetchGasAPI(action, payload = null) {
    try {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            body: JSON.stringify({ 
                action: action, 
                payload: payload 
            }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // Wajib ada agar tidak diblokir CORS
            }
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
